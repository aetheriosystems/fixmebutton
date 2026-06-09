import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const HIGHLIGHTS = [
  {
    icon: "book-outline",
    title: "Built for non-technical users",
    body: "Every guide is written at a 6th-grade reading level — no jargon.",
  },
  {
    icon: "checkmark-circle-outline",
    title: "Every guide is verified",
    body: "Our team follows every step on real devices before publishing.",
  },
  {
    icon: "play-circle-outline",
    title: "Interactive premium mode",
    body: "One step at a time with progress tracking and voice guidance.",
  },
  {
    icon: "refresh-outline",
    title: "Always growing",
    body: "New guides published every week across all device categories.",
  },
] as const;

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <Text style={styles.heroEmoji}>🔧</Text>
        <Text style={styles.heroTitle}>About FixMeButton</Text>
        <Text style={styles.heroSub}>
          We believe fixing your tech shouldn't require a computer science degree.
        </Text>
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Our Mission</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>
          Every day, millions of people struggle with technology problems that have simple
          solutions. A Roku remote that won't pair. An iPhone that won't connect to WiFi. A
          printer that just won't print. These problems are frustrating — but they shouldn't be.
        </Text>
        <Text style={[styles.body, { color: colors.mutedForeground, marginTop: 10 }]}>
          FixMeButton makes tech troubleshooting accessible to everyone. No jargon. No
          confusing menus. Just clear, step-by-step instructions that show you exactly what to do.
        </Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* How we're different */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          How We're Different
        </Text>
        {HIGHLIGHTS.map((h) => (
          <View
            key={h.icon}
            style={[styles.highlightRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: colors.secondary }]}>
              <Ionicons name={h.icon as any} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.highlightTitle, { color: colors.foreground }]}>{h.title}</Text>
              <Text style={[styles.highlightBody, { color: colors.mutedForeground }]}>{h.body}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* For everyone */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>For Everyone</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>
          Whether you're setting up your first smartphone or helping your parents troubleshoot
          their smart TV, FixMeButton has you covered.
        </Text>
      </View>

      {/* Premium CTA */}
      <View style={[styles.ctaCard, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.ctaTitle, { color: colors.foreground }]}>Can't find what you need?</Text>
        <Text style={[styles.ctaBody, { color: colors.mutedForeground }]}>
          Premium members can request guides for their specific problems.
        </Text>
        <Pressable
          style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/pricing")}
        >
          <Text style={[styles.ctaBtnText, { color: colors.primaryForeground }]}>
            Go Premium — $4.99/mo
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  hero: {
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSub: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#BFDBFE",
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 23,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  highlightRow: {
    flexDirection: "row",
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  highlightTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  highlightBody: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  ctaCard: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 18,
  },
  ctaBtn: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
