import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "fmb_token";

interface User {
  id: string;
  email: string;
  name: string | null;
  isPremium: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function getApiBase(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}`;
  return "";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const applyToken = useCallback(async (t: string, u: User) => {
    await AsyncStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    setUser(u);
  }, []);

  useEffect(() => {
    const init = async () => {
      const saved = await AsyncStorage.getItem(TOKEN_KEY);
      if (!saved) {
        setLoading(false);
        return;
      }
      try {
        const r = await fetch(`${getApiBase()}/api/auth/me`, {
          headers: { Authorization: `Bearer ${saved}` },
        });
        if (r.ok) {
          const u = await r.json() as User;
          setToken(saved);
          setUser(u);
        } else {
          await clearSession();
        }
      } catch {
        await clearSession();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [clearSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${getApiBase()}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Sign in failed" };
    await applyToken(data.token, data.user);
    return {};
  }, [applyToken]);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const res = await fetch(`${getApiBase()}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create account" };
    await applyToken(data.token, data.user);
    return {};
  }, [applyToken]);

  const signOut = useCallback(() => { clearSession(); }, [clearSession]);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
