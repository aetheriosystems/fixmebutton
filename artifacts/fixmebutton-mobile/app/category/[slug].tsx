import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { CATEGORIES } from "@/lib/constants";
import { getGuidesByCategory, type GuideMeta } from "@/lib/guides-data";

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: "phone-portrait-outline",
  computers: "laptop-outline",
  "tvs-streaming": "tv-outline",
  "internet-wifi": "wifi-outline",
  "email-accounts": "mail-outline",
};

function GuideRow({ guide, colors }: { guide: GuideMeta; colors: ReturnType<typeof useColors> }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.guideCard,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
      onPress={() => router.push(`/guide/${guide.category}/${guide.slug}` as any)}
    >
      <Text style={[styles.guideTitle, { color: colors.foreground }]}>{guide.title}</Text>
      <View style={styles.tags}>
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

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const navigation = useNavigation();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const guides = getGuidesByCategory(slug);

  useEffect(() => {
    if (cat) {
      navigation.setOptions({ title: cat.name });
    }
  }, [cat, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Category header */}
      <View
        style={[styles.catHeader, { backgroundColor: colors.secondary, borderBottomColor: colors.border }]}
      >
        <Ionicons
          name={CATEGORY_ICONS[slug] as any}
          size={32}
          color={colors.primary}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.catName, { color: colors.foreground }]}>{cat?.name}</Text>
          <Text style={[styles.catDesc, { color: colors.mutedForeground }]}>
            {guides.length} guide{guides.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      <FlatList
        data={guides}
        keyExtractor={(g) => g.slug}
        renderItem={({ item }) => <GuideRow guide={item} colors={colors} />}
        contentContainerStyle={[styles.list, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="construct-outline" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No guides in this category yet
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  catName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  catDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
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
  guideTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 21,
    marginBottom: 8,
  },
  tags: {
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
  },
});
