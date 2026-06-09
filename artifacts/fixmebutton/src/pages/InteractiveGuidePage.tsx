import { Link } from "wouter";
import { getGuideBySlug, getCategoryBySlug } from "@/lib/guides-data";
import { InteractiveGuide } from "@/components/interactive/InteractiveGuide";
import { PremiumGate } from "@/components/guides/PremiumGate";
import { useAuth } from "@/lib/auth-context";
import type { Step } from "@/components/interactive/StepCard";

function parseSteps(content: string): Step[] {
  const steps: Step[] = [];
  const lines = content.split("\n");
  let currentStep: Step | null = null;

  for (const line of lines) {
    if (line.startsWith("## Step")) {
      if (currentStep) steps.push(currentStep);
      currentStep = { title: line.replace(/^## /, "").trim(), content: "" };
    } else if (line.startsWith("## ") && currentStep) {
      if (currentStep) steps.push(currentStep);
      currentStep = { title: line.replace(/^## /, "").trim(), content: "" };
    } else if (currentStep && line.trim()) {
      if (!line.startsWith("#") && !line.startsWith("---") && !line.startsWith(">")) {
        currentStep.content += line + " ";
      }
    }
  }
  if (currentStep) steps.push(currentStep);

  return steps.length > 0
    ? steps
    : [{ title: "Get Started", content: "Follow the written guide to resolve this issue step by step." }];
}

export default function InteractiveGuidePage({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const guide = getGuideBySlug(category, slug);
  const cat = getCategoryBySlug(category);

  if (!guide || !cat) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-6xl mb-4">🔧</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Guide Not Found</h1>
        <Link href="/guides" className="text-blue-600 hover:underline">Browse all guides</Link>
      </main>
    );
  }

  const { user } = useAuth();
  const isPremium = user?.isPremium ?? false;
  const steps = parseSteps(guide.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href={`/guides/${category}/${slug}`} className="hover:text-gray-800 transition-colors">
              ← Back to guide
            </Link>
            <span>·</span>
            <span className="font-medium text-gray-900 truncate max-w-xs">{guide.meta.title}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
            Interactive Mode
          </span>
        </div>
      </div>

      {/* Interactive Guide */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{guide.meta.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {steps.length} step{steps.length !== 1 ? "s" : ""} ·{" "}
            {cat.icon} {cat.name}
            {guide.meta.time_estimate && ` · ⏱ ${guide.meta.time_estimate}`}
          </p>
        </div>

        {isPremium ? (
          <InteractiveGuide slug={slug} steps={steps} />
        ) : (
          <PremiumGate>
            <InteractiveGuide slug={slug} steps={steps} />
          </PremiumGate>
        )}

        <div className="mt-12 p-6 bg-white border border-gray-200 rounded-xl text-center">
          <p className="text-sm text-gray-500 mb-3">Want to re-read the full guide?</p>
          <Link
            href={`/guides/${category}/${slug}`}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            View written guide →
          </Link>
        </div>
      </main>
    </div>
  );
}
