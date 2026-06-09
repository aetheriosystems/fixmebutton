import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { CATEGORIES } from "@/lib/constants";
import { getGuideBySlug } from "@/lib/guides-data";

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: "phone-portrait-outline",
  computers: "laptop-outline",
  "tvs-streaming": "tv-outline",
  "internet-wifi": "wifi-outline",
  "email-accounts": "mail-outline",
};

function renderSteps(content: string): Array<{ type: "heading" | "step" | "text" | "bold"; text: string; num?: number }> {
  const lines = content.split("\n");
  const result: Array<{ type: "heading" | "step" | "text" | "bold"; text: string; num?: number }> = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      result.push({ type: "heading", text: line.slice(3) });
    } else if (/^\d+\. /.test(line)) {
      const match = line.match(/^(\d+)\. (.+)$/);
      if (match) result.push({ type: "step", text: match[2], num: parseInt(match[1]) });
    } else if (line.startsWith("**") && line.endsWith("**") || line.startsWith("- ")) {
      result.push({ type: "bold", text: line.replace(/^\*\*|\*\*$/g, "").replace(/^- /, "") });
    } else {
      result.push({ type: "text", text: line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^> /, "") });
    }
  }
  return result;
}

export default function GuideScreen() {
  const { category, slug } = useLocalSearchParams<{ category: string; slug: string }>();
  const colors = useColors();
  const navigation = useNavigation();
  const guide = getGuideBySlug(category, slug);
  const cat = CATEGORIES.find((c) => c.slug === category);

  useEffect(() => {
    if (guide) {
      navigation.setOptions({ title: cat?.name || "" });
    }
  }, [guide, cat, navigation]);

  if (!guide) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Ionicons name="construct-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.notFoundTitle, { color: colors.foreground }]}>Guide Not Found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const steps = renderSteps(guide.content);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Guide header */}
      <View style={styles.guideHeader}>
        <View style={styles.metaRow}>
          <View style={[styles.difficultyBadge, { backgroundColor: colors.accent }]}>
            <Text style={[styles.difficultyText, { color: colors.accentForeground }]}>
              {guide.meta.difficulty || "beginner"}
            </Text>
          </View>
          {guide.meta.time_estimate && (
            <View style={[styles.metaBadge, { backgroundColor: colors.muted }]}>
              <Feather name="clock" size={11} color={colors.mutedForeground} />
              <Text style={[styles.metaBadgeText, { color: colors.mutedForeground }]}>
                {" "}{guide.meta.time_estimate}
              </Text>
            </View>
          )}
          {guide.meta.steps && (
            <View style={[styles.metaBadge, { backgroundColor: colors.muted }]}>
              <Text style={[styles.metaBadgeText, { color: colors.mutedForeground }]}>
                {guide.meta.steps} steps
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.guideTitle, { color: colors.foreground }]}>{guide.meta.title}</Text>
        {guide.meta.devices && guide.meta.devices.length > 0 && (
          <Text style={[styles.devices, { color: colors.mutedForeground }]}>
            Works with: {guide.meta.devices.join(", ")}
          </Text>
        )}
        {guide.meta.last_verified && (
          <Text style={[styles.verified, { color: colors.mutedForeground }]}>
            Last verified: {guide.meta.last_verified}
          </Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.stepsContainer}>
        {steps.map((item, i) => {
          if (item.type === "heading") {
            return (
              <Text key={i} style={[styles.sectionHeading, { color: colors.foreground }]}>
                {item.text}
              </Text>
            );
          }
          if (item.type === "step") {
            return (
              <View key={i} style={[styles.stepRow, { borderColor: colors.border }]}>
                <View style={[styles.stepNum, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumText}>{item.num}</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.foreground }]}>{item.text}</Text>
              </View>
            );
          }
          if (item.type === "bold") {
            return (
              <Text key={i} style={[styles.boldText, { color: colors.foreground }]}>
                {item.text}
              </Text>
            );
          }
          return (
            <Text key={i} style={[styles.bodyText, { color: colors.mutedForeground }]}>
              {item.text}
            </Text>
          );
        })}
      </View>

      {/* Interactive Mode button */}
      <Pressable
        style={[styles.interactiveBtn, { borderColor: "#2563EB" }]}
        onPress={() => router.push(`/guide/${category}/${slug}/interactive`)}
      >
        <Ionicons name="play-circle-outline" size={20} color="#2563EB" />
        <Text style={styles.interactiveBtnText}>Try Interactive Mode</Text>
        <Ionicons name="arrow-forward" size={16} color="#2563EB" />
      </Pressable>

      {/* Premium CTA */}
      <LinearGradient colors={["#2563EB", "#1D4ED8"]} style={styles.premiumCta}>
        <Text style={styles.premiumCtaTitle}>Want the Interactive Version?</Text>
        <Text style={styles.premiumCtaBody}>
          Premium members get step-by-step progress tracking, voice-guided mode, and an
          "I'm stuck" button.
        </Text>
        <Pressable
          style={styles.premiumCtaBtn}
          onPress={() => router.push("/pricing")}
        >
          <Text style={styles.premiumCtaBtnText}>Go Premium — $4.99/month</Text>
        </Pressable>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  notFoundTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  backLink: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  guideHeader: {
    padding: 20,
    paddingBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaBadgeText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  guideTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 32,
    marginBottom: 8,
  },
  devices: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 4,
  },
  verified: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  stepsContainer: {
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginTop: 28,
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    flexShrink: 0,
  },
  stepNumText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  boldText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginBottom: 8,
  },
  interactiveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  interactiveBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#2563EB",
  },
  premiumCta: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 32,
  },
  premiumCtaTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  premiumCtaBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#BFDBFE",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  premiumCtaBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
  },
  premiumCtaBtnText: {
    color: "#2563EB",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
