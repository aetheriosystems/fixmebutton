import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { CATEGORIES } from "@/lib/constants";
import { searchGuides, type GuideMeta } from "@/lib/guides-data";

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: "phone-portrait-outline",
  computers: "laptop-outline",
  "tvs-streaming": "tv-outline",
  "internet-wifi": "wifi-outline",
  "email-accounts": "mail-outline",
};

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
        <Ionicons name={CATEGORY_ICONS[guide.category] as any} size={16} color={colors.primary} />
        <Text style={[styles.guideCategory, { color: colors.mutedForeground }]}>{cat?.name}</Text>
      </View>
      <Text style={[styles.guideTitle, { color: colors.foreground }]}>{guide.title}</Text>
      {guide.time_estimate && (
        <View style={styles.tagRow}>
          <Feather name="clock" size={11} color={colors.mutedForeground} />
          <Text style={[styles.tagText, { color: colors.mutedForeground }]}>
            {" "}{guide.time_estimate}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0 ? searchGuides(query) : [];
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 50 : 90;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: colors.background, paddingTop: topPad + 12 }]}
      >
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Search</Text>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="search" size={18} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search guides, devices..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      {query.trim().length === 0 ? (
        /* Empty state — show categories */
        <FlatList
          data={CATEGORIES as readonly typeof CATEGORIES[number][]}
          keyExtractor={(c) => c.slug}
          contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={[styles.listLabel, { color: colors.mutedForeground }]}>
              Browse by category
            </Text>
          }
          renderItem={({ item: cat }) => (
            <Pressable
              style={({ pressed }) => [
                styles.catRow,
                { backgroundColor: colors.card, borderColor: colors.border },
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => router.push(`/category/${cat.slug}` as any)}
            >
              <View
                style={[styles.catIconBg, { backgroundColor: colors.secondary }]}
              >
                <Ionicons
                  name={CATEGORY_ICONS[cat.slug] as any}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.catName, { color: colors.foreground }]}>{cat.name}</Text>
                <Text style={[styles.catDesc, { color: colors.mutedForeground }]}>{cat.description}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </Pressable>
          )}
        />
      ) : results.length === 0 ? (
        <View style={styles.noResults}>
          <Ionicons name="search-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.noResultsTitle, { color: colors.foreground }]}>No results</Text>
          <Text style={[styles.noResultsSub, { color: colors.mutedForeground }]}>
            Try searching for a device like "iPhone" or "Windows"
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(g) => `${g.category}/${g.slug}`}
          renderItem={({ item }) => <GuideRow guide={item} colors={colors} />}
          contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={[styles.listLabel, { color: colors.mutedForeground }]}>
              {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </Text>
          }
        />
      )}
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
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    marginBottom: 10,
  },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  catIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  catName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  catDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  noResults: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  noResultsSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
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
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
});
