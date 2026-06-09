import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/lib/auth-context";

function MenuItem({
  icon,
  label,
  sublabel,
  onPress,
  colors,
  tint,
}: {
  icon: string;
  label: string;
  sublabel?: string;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
  tint?: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
      onPress={onPress}
    >
      <View style={[styles.menuIconBg, { backgroundColor: colors.secondary }]}>
        <Ionicons name={icon as any} size={20} color={tint || colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.menuLabel, { color: tint || colors.foreground }]}>{label}</Text>
        {sublabel && (
          <Text style={[styles.menuSublabel, { color: colors.mutedForeground }]}>{sublabel}</Text>
        )}
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, loading, signOut } = useAuth();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 50 : 90;

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: colors.background, paddingTop: topPad + 12 }]}
      >
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Profile</Text>
      </View>

      {user ? (
        <>
          {/* User card */}
          <View style={[styles.userCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.userName, { color: colors.foreground }]}>
                {user.name || "Welcome back!"}
              </Text>
              <Text style={[styles.userEmail, { color: colors.mutedForeground }]}>{user.email}</Text>
            </View>
            {user.isPremium && (
              <View style={[styles.premiumBadge, { backgroundColor: "#EFF6FF" }]}>
                <Text style={[styles.premiumBadgeText, { color: colors.primary }]}>PREMIUM</Text>
              </View>
            )}
          </View>

          {/* Subscription */}
          {!user.isPremium && (
            <View style={[styles.upsellCard, { backgroundColor: "#2563EB" }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.upsellTitle}>Go Premium</Text>
                <Text style={styles.upsellSub}>Interactive guides, voice mode, ad-free</Text>
              </View>
              <Pressable
                style={styles.upsellBtn}
                onPress={() => router.push("/pricing")}
              >
                <Text style={styles.upsellBtnText}>$4.99/mo</Text>
              </Pressable>
            </View>
          )}

          {/* Menu */}
          <View style={styles.menuSection}>
            <Text style={[styles.menuSectionLabel, { color: colors.mutedForeground }]}>
              GUIDES
            </Text>
            <MenuItem
              icon="list-outline"
              label="In Progress"
              sublabel="Continue where you left off"
              onPress={() => {}}
              colors={colors}
            />
            <MenuItem
              icon="bookmark-outline"
              label="Saved Guides"
              sublabel="Bookmark guides to find them quickly"
              onPress={() => {}}
              colors={colors}
            />
          </View>

          <View style={styles.menuSection}>
            <Text style={[styles.menuSectionLabel, { color: colors.mutedForeground }]}>
              ACCOUNT
            </Text>
            <MenuItem
              icon="grid-outline"
              label="Dashboard"
              sublabel="Your progress, saved guides & requests"
              onPress={() => router.push("/dashboard")}
              colors={colors}
            />
            <MenuItem
              icon="card-outline"
              label="Subscription"
              sublabel={user.isPremium ? "Premium — manage plan" : "Free plan"}
              onPress={() => router.push("/pricing")}
              colors={colors}
            />
            <MenuItem
              icon="log-out-outline"
              label="Sign Out"
              onPress={handleSignOut}
              colors={colors}
              tint={colors.destructive}
            />
          </View>

          <View style={styles.menuSection}>
            <Text style={[styles.menuSectionLabel, { color: colors.mutedForeground }]}>
              MORE
            </Text>
            <MenuItem
              icon="information-circle-outline"
              label="About FixMeButton"
              sublabel="Our mission and how we're different"
              onPress={() => router.push("/about")}
              colors={colors}
            />
          </View>
        </>
      ) : (
        <>
          {/* Not signed in */}
          <View style={[styles.guestCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="person-circle-outline" size={64} color={colors.mutedForeground} />
            <Text style={[styles.guestTitle, { color: colors.foreground }]}>Sign in to track progress</Text>
            <Text style={[styles.guestSub, { color: colors.mutedForeground }]}>
              Save guides, track your progress across devices, and unlock premium features.
            </Text>
            <Pressable
              style={[styles.signInBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/signin")}
            >
              <Text style={[styles.signInBtnText, { color: colors.primaryForeground }]}>
                Sign In
              </Text>
            </Pressable>
            <Pressable
              style={[styles.signUpBtn, { borderColor: colors.primary }]}
              onPress={() => router.push("/signup")}
            >
              <Text style={[styles.signUpBtnText, { color: colors.primary }]}>
                Create Account
              </Text>
            </Pressable>
          </View>

          <View style={styles.menuSection}>
            <Text style={[styles.menuSectionLabel, { color: colors.mutedForeground }]}>
              EXPLORE
            </Text>
            <MenuItem
              icon="list-outline"
              label="All Guides"
              sublabel="Browse our full library"
              onPress={() => router.push("/(tabs)/guides")}
              colors={colors}
            />
            <MenuItem
              icon="diamond-outline"
              label="Go Premium"
              sublabel="Unlock interactive mode + voice"
              onPress={() => router.push("/pricing")}
              colors={colors}
            />
            <MenuItem
              icon="information-circle-outline"
              label="About FixMeButton"
              sublabel="Our mission and how we're different"
              onPress={() => router.push("/about")}
              colors={colors}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  userName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  userEmail: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  premiumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  upsellCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
  },
  upsellTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  upsellSub: {
    color: "#BFDBFE",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  upsellBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  upsellBtnText: {
    color: "#2563EB",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuSectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  menuSublabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  guestCard: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    marginBottom: 24,
    gap: 10,
  },
  guestTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  guestSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 6,
  },
  signInBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  signInBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  signUpBtn: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
  },
  signUpBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
