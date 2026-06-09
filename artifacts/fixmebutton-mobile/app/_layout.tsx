import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/lib/auth-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="guide/[category]/[slug]/index"
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "Back",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="guide/[category]/[slug]/interactive"
        options={{
          headerShown: true,
          title: "Interactive Mode",
          headerBackTitle: "Back",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="category/[slug]"
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerShown: true,
          title: "Sign In",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "Create Account",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="pricing"
        options={{
          headerShown: true,
          title: "Go Premium",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerShown: true,
          title: "About",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: true,
          title: "Dashboard",
          headerTintColor: "#2563EB",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardProvider>
              <AuthProvider>
                <RootLayoutNav />
              </AuthProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
