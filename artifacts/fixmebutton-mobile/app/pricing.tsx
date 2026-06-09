import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";

const FREE_FEATURES = [
  "All written guides",
  "Search by device",
  "Category browsing",
  "Email newsletter",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "Interactive step-by-step guides",
  "Progress tracking across devices",
  "Voice-guided mode",
  '"I\'m stuck" troubleshooting help',
  "Ad-free experience",
  "Priority guide requests",
];

export default function PricingScreen() {
  const colors = useColors();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>Fix Smarter, Not Harder</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Free guides are great. Premium gives you interactive guidance, voice control, and an "I'm
        stuck" button.
      </Text>

      {/* Free Plan */}
      <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.planName, { color: colors.foreground }]}>Free</Text>
        <Text style={[styles.planTagline, { color: colors.mutedForeground }]}>For casual fixers</Text>
        <View style={styles.priceRow}>
          <Text style={[styles.priceAmount, { color: colors.foreground }]}>$0</Text>
          <Text style={[styles.pricePeriod, { color: colors.mutedForeground }]}>/month</Text>
        </View>
        {FREE_FEATURES.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Ionicons name="checkmark" size={16} color={colors.success} />
            <Text style={[styles.featureText, { color: colors.foreground }]}>{f}</Text>
          </View>
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.freeBtn,
            { borderColor: colors.primary },
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => { router.push("/(tabs)/guides"); }}
        >
          <Text style={[styles.freeBtnText, { color: colors.primary }]}>Browse Free Guides</Text>
        </Pressable>
      </View>

      {/* Premium Plan */}
      <LinearGradient colors={["#2563EB", "#1D4ED8"]} style={styles.premiumCard}>
        <View style={styles.premiumBadgeRow}>
          <Text style={styles.premiumPlanName}>Premium</Text>
          <View style={styles.bestValueBadge}>
            <Text style={styles.bestValueText}>BEST VALUE</Text>
          </View>
        </View>
        <Text style={styles.premiumTagline}>For people who want it fixed now</Text>
        <View style={styles.priceRow}>
          <Text style={styles.premiumPriceAmount}>$4.99</Text>
          <Text style={styles.premiumPricePeriod}>/month</Text>
        </View>
        {PREMIUM_FEATURES.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Ionicons name="checkmark" size={16} color="#86EFAC" />
            <Text style={styles.premiumFeatureText}>{f}</Text>
          </View>
        ))}
        <Pressable
          style={({ pressed }) => [styles.premiumBtn, pressed && { opacity: 0.85 }]}
          onPress={() => {
            if (!Platform.OS || Platform.OS !== "web") {
              router.push("/signin");
            }
          }}
        >
          <Text style={styles.premiumBtnText}>Go Premium — $4.99/mo</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.yearlyBtn, pressed && { opacity: 0.85 }]}
          onPress={() => {
            if (!Platform.OS || Platform.OS !== "web") {
              router.push("/signin");
            }
          }}
        >
          <Text style={styles.yearlyBtnText}>Save 33% — $39.99/year</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.footnote}>
        <Feather name="info" size={13} color={colors.mutedForeground} />
        <Text style={[styles.footnoteText, { color: colors.mutedForeground }]}>
          Cancel anytime. Payment processed securely.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  planCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 20,
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  planTagline: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
    gap: 2,
  },
  priceAmount: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
  },
  pricePeriod: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    marginBottom: 6,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  freeBtn: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  freeBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  premiumCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  premiumBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  premiumPlanName: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  bestValueBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bestValueText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  premiumTagline: {
    color: "#BFDBFE",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  premiumPriceAmount: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  premiumPricePeriod: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#BFDBFE",
    marginBottom: 6,
  },
  premiumFeatureText: {
    color: "#EFF6FF",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  premiumBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  premiumBtnText: {
    color: "#2563EB",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  yearlyBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 10,
  },
  yearlyBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  footnote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  footnoteText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
