import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
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
import { getAllGuides, getGuidesByCategory, type GuideMeta } from "@/lib/guides-data";

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: "phone-portrait-outline",
  computers: "laptop-outline",
  "tvs-streaming": "tv-outline",
  "internet-wifi": "wifi-outline",
  "email-accounts": "mail-outline",
};

const ALL_FILTER = "__all__";

function GuideRow({ guide, colors }: { guide: GuideMeta; colors: ReturnType<typeof useColors> }) {
  const cat = CATEGORIES.find((c) => c.slug === guide.category);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.guideCard,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
      onPress={() => router.push(`/guide/${guide.category}/${guide.slug}` as any)}
    >
      <View style={styles.guideMeta}>
        <Ionicons
          name={CATEGORY_ICONS[guide.category] as any}
          size={16}
          color={colors.primary}
        />
        <Text style={[styles.guideCategory, { color: colors.mutedForeground }]}>
          {cat?.name}
        </Text>
      </View>
      <Text style={[styles.guideTitle, { color: colors.foreground }]}>{guide.title}</Text>
      <View style={styles.guideTags}>
        {guide.difficulty && (
          <View style={[styles.tag, { backgroundColor: colors.accent }]}>
            <Text style={[styles.tagText, { color: colors.accentForeground }]}>
              {guide.difficulty}
            </Text>
          </View>
        )}
        {guide.time_estimate && (
          <View style={[styles.tag, { backgroundColor: colors.muted }]}>
            <Feather name="clock" size={10} color={colors.mutedForeground} />
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
}

export default function GuidesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const allGuides = getAllGuides();
  const filtered =
    activeFilter === ALL_FILTER ? allGuides : getGuidesByCategory(activeFilter);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 50 : 90;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.background, paddingTop: topPad + 12 },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>All Guides</Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          {filtered.length} guides available
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={[styles.filterScroll, { borderBottomColor: colors.border }]}
      >
        <Pressable
          onPress={() => setActiveFilter(ALL_FILTER)}
          style={[
            styles.filterChip,
            activeFilter === ALL_FILTER
              ? { backgroundColor: colors.primary }
              : { backgroundColor: colors.muted },
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              { color: activeFilter === ALL_FILTER ? colors.primaryForeground : colors.mutedForeground },
            ]}
          >
            All
          </Text>
        </Pressable>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.slug}
            onPress={() => setActiveFilter(cat.slug)}
            style={[
              styles.filterChip,
              activeFilter === cat.slug
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.muted },
            ]}
          >
            <Ionicons
              name={CATEGORY_ICONS[cat.slug] as any}
              size={13}
              color={activeFilter === cat.slug ? colors.primaryForeground : colors.mutedForeground}
            />
            <Text
              style={[
                styles.filterChipText,
                { color: activeFilter === cat.slug ? colors.primaryForeground : colors.mutedForeground },
              ]}
            >
              {" "}{cat.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Guide List */}
      <FlatList
        data={filtered}
        keyExtractor={(g) => `${g.category}/${g.slug}`}
        renderItem={({ item }) => <GuideRow guide={item} colors={colors} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="construct-outline" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No guides yet — check back soon!
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  headerSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  filterScroll: {
    borderBottomWidth: 1,
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    flexDirection: "row",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
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
    gap: 5,
    marginBottom: 5,
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
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
});
