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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { CATEGORIES } from "@/lib/constants";
import { getAllGuides } from "@/lib/guides-data";

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: "phone-portrait-outline",
  computers: "laptop-outline",
  "tvs-streaming": "tv-outline",
  "internet-wifi": "wifi-outline",
  "email-accounts": "mail-outline",
};

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const guides = getAllGuides();
  const featured = guides.slice(0, 3);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 50 : 90;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <LinearGradient
        colors={["#2563EB", "#1D4ED8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: topPad + 24 }]}
      >
        <View style={styles.heroIconRow}>
          <View style={styles.heroIconBg}>
            <Ionicons name="construct-outline" size={32} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.heroTitle}>Tech Problems?</Text>
        <Text style={styles.heroSubtitle}>Press the Fix Button.</Text>
        <Text style={styles.heroBody}>
          Step-by-step guides for every device in your life. No jargon. Just fixes that work.
        </Text>
        <View style={styles.heroButtons}>
          <Pressable
            style={styles.heroBtnPrimary}
            onPress={() => router.push("/(tabs)/guides")}
          >
            <Text style={styles.heroBtnPrimaryText}>Browse Guides</Text>
          </Pressable>
          <Pressable
            style={styles.heroBtnSecondary}
            onPress={() => router.push("/pricing")}
          >
            <Text style={styles.heroBtnSecondaryText}>Go Premium</Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          What Do You Need to Fix?
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>
          Choose your device to get started
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.slug}
              style={({ pressed }) => [
                styles.categoryCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                pressed && { opacity: 0.8, borderColor: colors.primary },
              ]}
              onPress={() => router.push(`/category/${cat.slug}` as any)}
            >
              <Ionicons
                name={CATEGORY_ICONS[cat.slug] as any}
                size={28}
                color={colors.primary}
              />
              <Text style={[styles.categoryName, { color: colors.foreground }]}>
                {cat.name}
              </Text>
              <Text style={[styles.categoryDesc, { color: colors.mutedForeground }]}>
                {cat.description}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Featured Guides */}
      {featured.length > 0 && (
        <View style={[styles.section, { borderTopWidth: 1, borderTopColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Popular Fixes
          </Text>
          {featured.map((guide) => {
            const cat = CATEGORIES.find((c) => c.slug === guide.category);
            return (
              <Pressable
                key={`${guide.category}/${guide.slug}`}
                style={({ pressed }) => [
                  styles.guideCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  pressed && { opacity: 0.85 },
                ]}
                onPress={() =>
                  router.push(`/guide/${guide.category}/${guide.slug}` as any)
                }
              >
                <View style={styles.guideMeta}>
                  <Ionicons
                    name={CATEGORY_ICONS[guide.category] as any}
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={[styles.guideCategory, { color: colors.mutedForeground }]}>
                    {cat?.name}
                  </Text>
                </View>
                <Text style={[styles.guideTitle, { color: colors.foreground }]}>
                  {guide.title}
                </Text>
                <View style={styles.guideTags}>
                  {guide.time_estimate && (
                    <View style={[styles.tag, { backgroundColor: colors.muted }]}>
                      <Feather name="clock" size={11} color={colors.mutedForeground} />
                      <Text style={[styles.tagText, { color: colors.mutedForeground }]}>
                        {" "}{guide.time_estimate}
                      </Text>
                    </View>
                  )}
                  {guide.steps && (
                    <View style={[styles.tag, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.tagText, { color: colors.mutedForeground }]}>
                        {guide.steps} steps
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => router.push("/(tabs)/guides")}
            style={styles.viewAll}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View all {guides.length} guides
            </Text>
            <Feather name="arrow-right" size={14} color={colors.primary} />
          </Pressable>
        </View>
      )}

      {/* Premium CTA */}
      <LinearGradient
        colors={["#2563EB", "#1D4ED8"]}
        style={styles.premiumSection}
      >
        <Text style={styles.premiumTitle}>Want the Full Experience?</Text>
        <Text style={styles.premiumBody}>
          Premium gives you interactive step-by-step guides, voice-guided mode, and an
          "I'm stuck" button. All ad-free.
        </Text>
        <View style={styles.premiumPriceRow}>
          <Text style={styles.premiumPrice}>$4.99</Text>
          <Text style={styles.premiumPriceSub}>/month</Text>
        </View>
        <Pressable
          style={styles.premiumBtn}
          onPress={() => router.push("/pricing")}
        >
          <Text style={styles.premiumBtnText}>Go Premium</Text>
        </Pressable>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  heroIconRow: {
    alignItems: "center",
    marginBottom: 16,
  },
  heroIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#BFDBFE",
    textAlign: "center",
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#DBEAFE",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  heroBtnPrimary: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  heroBtnPrimaryText: {
    color: "#2563EB",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  heroBtnSecondary: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  heroBtnSecondaryText: {
    color: "#FFFFFF",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  categoryCard: {
    width: "46%",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 6,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  categoryDesc: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 15,
  },
  guideCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  guideMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  guideCategory: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  guideTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 21,
    marginBottom: 8,
  },
  guideTags: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  premiumSection: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  premiumTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  premiumBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#BFDBFE",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  premiumPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  premiumPrice: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
  },
  premiumPriceSub: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#BFDBFE",
    marginBottom: 6,
    marginLeft: 2,
  },
  premiumBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  premiumBtnText: {
    color: "#2563EB",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
});
