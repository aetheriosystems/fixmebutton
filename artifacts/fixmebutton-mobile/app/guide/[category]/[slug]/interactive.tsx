import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { getGuideBySlug } from "@/lib/guides-data";
import { useAuth } from "@/lib/auth-context";

type Step = { title: string; content: string };

function parseSteps(content: string): Step[] {
  const steps: Step[] = [];
  const lines = content.split("\n");
  let current: Step | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      if (current) steps.push(current);
      current = { title: line.slice(3), content: "" };
    } else if (current && line && !line.startsWith("#") && !line.startsWith("---") && !line.startsWith(">")) {
      current.content += (current.content ? " " : "") + line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^\d+\. /, "").replace(/^- /, "");
    }
  }
  if (current) steps.push(current);

  return steps.length > 0
    ? steps
    : [{ title: "Get Started", content: "Follow the guide steps to resolve this issue." }];
}

function PremiumGate({ onUnlock }: { onUnlock: () => void }) {
  const colors = useColors();
  return (
    <View style={[styles.gateCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={styles.gateEmoji}>⭐</Text>
      <Text style={[styles.gateTitle, { color: colors.foreground }]}>
        Interactive Mode is Premium
      </Text>
      <Text style={[styles.gateBody, { color: colors.mutedForeground }]}>
        Get one step at a time with progress tracking, an "I'm stuck" button, and voice guidance.
      </Text>
      <Pressable
        style={[styles.gateBtn, { backgroundColor: colors.primary }]}
        onPress={() => router.push("/pricing")}
      >
        <Text style={[styles.gateBtnText, { color: colors.primaryForeground }]}>
          Go Premium — $4.99/mo
        </Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={[styles.gateLinkText, { color: colors.primary }]}>
          Back to written guide
        </Text>
      </Pressable>
    </View>
  );
}

export default function InteractiveGuideScreen() {
  const { category, slug } = useLocalSearchParams<{ category: string; slug: string }>();
  const colors = useColors();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const isPremium = user?.isPremium ?? false;

  const guide = getGuideBySlug(category, slug);
  const cat = CATEGORIES.find((c) => c.slug === category);
  const steps = guide ? parseSteps(guide.content) : [];

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  useEffect(() => {
    navigation.setOptions({ title: "Interactive Mode" });
  }, [navigation]);

  if (!guide || !cat) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Ionicons name="construct-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.notFoundTitle, { color: colors.foreground }]}>Guide Not Found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (!isPremium) {
    return (
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.gateContainer, { paddingBottom: insets.bottom + 32 }]}
      >
        <PremiumGate onUnlock={() => router.push("/pricing")} />
      </ScrollView>
    );
  }

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const progress = steps.length > 0 ? (completed.size / steps.length) * 100 : 0;
  const allDone = completed.size === steps.length;

  const markDone = () => {
    const next = new Set(completed);
    next.add(currentStep);
    setCompleted(next);
    if (!isLast) setCurrentStep((s) => s + 1);
  };

  const handleStuck = () => {
    router.push(`/guide/${category}/${slug}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Progress bar */}
      <View style={[styles.progressBar, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: colors.primary, width: `${progress}%` as any },
          ]}
        />
      </View>

      {/* Step counter */}
      <View style={[styles.counterRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.counterText, { color: colors.mutedForeground }]}>
          Step {currentStep + 1} of {steps.length}
        </Text>
        <View style={[styles.modeBadge, { backgroundColor: "#EFF6FF" }]}>
          <Text style={[styles.modeBadgeText, { color: colors.primary }]}>Interactive Mode</Text>
        </View>
      </View>

      {allDone ? (
        /* Done screen */
        <ScrollView
          contentContainerStyle={[styles.doneContainer, { paddingBottom: insets.bottom + 32 }]}
        >
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={[styles.doneTitle, { color: colors.foreground }]}>All Done!</Text>
          <Text style={[styles.doneBody, { color: colors.mutedForeground }]}>
            You've completed all {steps.length} steps of "{guide.meta.title}".
          </Text>
          <Pressable
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/(tabs)/guides")}
          >
            <Text style={[styles.doneBtnText, { color: colors.primaryForeground }]}>
              Browse More Guides
            </Text>
          </Pressable>
          <Pressable
            style={[styles.doneSecondaryBtn, { borderColor: colors.primary }]}
            onPress={() => { setCurrentStep(0); setCompleted(new Set()); }}
          >
            <Text style={[styles.doneSecondaryBtnText, { color: colors.primary }]}>
              Start Over
            </Text>
          </Pressable>
        </ScrollView>
      ) : (
        /* Step card */
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.stepContainer, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.stepCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.stepNumCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumText}>{currentStep + 1}</Text>
            </View>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>{step.title}</Text>
            {step.content ? (
              <Text style={[styles.stepContent, { color: colors.mutedForeground }]}>
                {step.content}
              </Text>
            ) : null}
          </View>

          {/* Step dots */}
          <View style={styles.dotsRow}>
            {steps.map((_, i) => (
              <Pressable key={i} onPress={() => setCurrentStep(i)}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: completed.has(i)
                        ? colors.primary
                        : i === currentStep
                        ? colors.primary
                        : colors.muted,
                      opacity: i === currentStep ? 1 : completed.has(i) ? 0.7 : 0.4,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>

          {/* Actions */}
          <Pressable
            style={[styles.doneStepBtn, { backgroundColor: colors.primary }]}
            onPress={markDone}
          >
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            <Text style={styles.doneStepBtnText}>
              {isLast ? "Finish!" : "Done — Next Step"}
            </Text>
          </Pressable>

          <View style={styles.navRow}>
            <Pressable
              style={[
                styles.navBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
                isFirst && { opacity: 0.4 },
              ]}
              onPress={() => !isFirst && setCurrentStep((s) => s - 1)}
              disabled={isFirst}
            >
              <Feather name="arrow-left" size={16} color={colors.foreground} />
              <Text style={[styles.navBtnText, { color: colors.foreground }]}>Previous</Text>
            </Pressable>

            <Pressable
              style={[styles.stuckBtn, { backgroundColor: "#FEF3C7", borderColor: "#FDE68A" }]}
              onPress={handleStuck}
            >
              <Text style={[styles.stuckBtnText, { color: "#92400E" }]}>I'm Stuck</Text>
            </Pressable>

            <Pressable
              style={[
                styles.navBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
                isLast && { opacity: 0.4 },
              ]}
              onPress={() => !isLast && setCurrentStep((s) => s + 1)}
              disabled={isLast}
            >
              <Text style={[styles.navBtnText, { color: colors.foreground }]}>Next</Text>
              <Feather name="arrow-right" size={16} color={colors.foreground} />
            </Pressable>
          </View>

          {/* Back to written */}
          <Pressable
            style={styles.backLink}
            onPress={() => router.push(`/guide/${category}/${slug}`)}
          >
            <Text style={[styles.backLinkText, { color: colors.mutedForeground }]}>
              View written guide instead
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20,
  },
  gateContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  notFoundTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  linkText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  progressBar: {
    height: 4,
    width: "100%",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  counterText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  modeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  modeBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  stepContainer: {
    padding: 20,
  },
  stepCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  stepNumCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stepNumText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 28,
  },
  stepContent: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 23,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  doneStepBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
    marginBottom: 12,
  },
  doneStepBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  navRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  navBtnText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  stuckBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  stuckBtnText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  backLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  backLinkText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  doneContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  doneEmoji: {
    fontSize: 64,
  },
  doneTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  doneBody: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  doneBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  doneBtnText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  doneSecondaryBtn: {
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1.5,
    width: "100%",
    alignItems: "center",
  },
  doneSecondaryBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  gateCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 28,
    alignItems: "center",
    gap: 12,
  },
  gateEmoji: {
    fontSize: 48,
  },
  gateTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  gateBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 21,
  },
  gateBtn: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 4,
    width: "100%",
    alignItems: "center",
  },
  gateBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  gateLinkText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginTop: 4,
  },
});
