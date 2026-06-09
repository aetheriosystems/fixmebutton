import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/lib/auth-context";

export default function SignUpScreen() {
  const colors = useColors();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = await signUp(email, password, name || undefined);
      if (result.error) {
        setError(result.error);
      } else {
        router.replace("/(tabs)/profile");
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconRow}>
          <View style={[styles.iconBg, { backgroundColor: colors.secondary }]}>
            <Feather name="tool" size={32} color={colors.primary} />
          </View>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Join FixMeButton to track your progress and unlock premium features
        </Text>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }]}>
            <Feather name="alert-circle" size={15} color={colors.destructive} />
            <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.foreground }]}>Name (optional)</Text>
            <View
              style={[
                styles.inputWrap,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Feather name="user" size={16} color={colors.mutedForeground} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
                autoCapitalize="words"
                textContentType="name"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
            <View
              style={[
                styles.inputWrap,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Feather name="mail" size={16} color={colors.mutedForeground} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
            <View
              style={[
                styles.inputWrap,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Feather name="lock" size={16} color={colors.mutedForeground} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Min. 6 characters"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
                secureTextEntry={!showPassword}
                textContentType="newPassword"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={16}
                  color={colors.mutedForeground}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.submitBtn,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.85 },
              loading && { opacity: 0.6 },
            ]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.submitBtnText, { color: colors.primaryForeground }]}>
                Create Account
              </Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.replace("/signin")}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  iconRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  form: { gap: 16 },
  field: { gap: 6 },
  label: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  submitBtn: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  submitBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  footerLink: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
