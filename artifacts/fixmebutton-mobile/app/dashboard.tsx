import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/lib/auth-context";

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [requestText, setRequestText] = useState("");
  const [requestDetail, setRequestDetail] = useState("");

  const handleSubmitRequest = () => {
    if (!requestText.trim()) return;
    Alert.alert("Request Submitted", "We'll get to work on your guide soon!", [
      { text: "OK", onPress: () => { setRequestText(""); setRequestDetail(""); } },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.avatarEmoji]}>👤</Text>
          </View>
          <View>
            <Text style={[styles.welcomeTitle, { color: colors.foreground }]}>
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
            </Text>
            <Text style={[styles.welcomeSub, { color: colors.mutedForeground }]}>
              Manage your guides and subscription
            </Text>
          </View>
        </View>

        {/* Subscription card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.subscriptionRow}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>Subscription</Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>
                You're on the{" "}
                <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.foreground }}>
                  {user?.isPremium ? "Premium" : "Free"}
                </Text>{" "}
                plan
              </Text>
            </View>
            {!user?.isPremium && (
              <Pressable
                style={[styles.upgradeBtn, { backgroundColor: colors.primary }]}
                onPress={() => router.push("/pricing")}
              >
                <Text style={[styles.upgradeBtnText, { color: colors.primaryForeground }]}>
                  Upgrade
                </Text>
              </Pressable>
            )}
            {user?.isPremium && (
              <View style={[styles.premiumBadge, { backgroundColor: "#EFF6FF" }]}>
                <Text style={{ fontSize: 11, fontFamily: "Inter_600SemiBold", color: colors.primary }}>
                  PREMIUM
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Guides In Progress */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>
            📋 Guides In Progress
          </Text>
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="document-text-outline" size={36} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No guides in progress yet
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/guides")}>
              <Text style={[styles.emptyLink, { color: colors.primary }]}>
                Browse guides to get started →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Saved Guides */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>
            ⭐ Saved Guides
          </Text>
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="bookmark-outline" size={36} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No saved guides yet
            </Text>
            <Text style={[styles.emptyHint, { color: colors.mutedForeground }]}>
              As you browse guides, bookmark them to find them quickly here.
            </Text>
          </View>
        </View>

        {/* Request a Guide */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>
            💡 Request a Guide
          </Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.requestHint, { color: colors.mutedForeground }]}>
              Can't find what you need? Tell us what you want help with.
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground },
              ]}
              placeholder="e.g., How to connect AirPods to Samsung TV"
              placeholderTextColor={colors.mutedForeground}
              value={requestText}
              onChangeText={setRequestText}
              returnKeyType="next"
            />
            <TextInput
              style={[
                styles.textarea,
                { backgroundColor: colors.background, borderColor: colors.border, color: colors.foreground },
              ]}
              placeholder="Describe your problem in more detail (optional)"
              placeholderTextColor={colors.mutedForeground}
              value={requestDetail}
              onChangeText={setRequestDetail}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                { backgroundColor: requestText.trim() ? colors.primary : colors.muted },
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleSubmitRequest}
              disabled={!requestText.trim()}
            >
              <Text
                style={[
                  styles.submitBtnText,
                  { color: requestText.trim() ? colors.primaryForeground : colors.mutedForeground },
                ]}
              >
                Submit Request
              </Text>
            </Pressable>
            <Text style={[styles.requestFootnote, { color: colors.mutedForeground }]}>
              Premium users get priority. Free users: one request at a time.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: {
    fontSize: 28,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  welcomeSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  card: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  subscriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  cardSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  upgradeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  upgradeBtnText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  premiumBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  sectionBlock: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 10,
  },
  emptyCard: {
    padding: 28,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 19,
  },
  emptyLink: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  requestHint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
    lineHeight: 19,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    minHeight: 84,
    marginBottom: 12,
  },
  submitBtn: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  submitBtnText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  requestFootnote: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 17,
  },
});
