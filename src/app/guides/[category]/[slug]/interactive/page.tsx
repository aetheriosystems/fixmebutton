import { InteractiveGuide } from "@/components/interactive/InteractiveGuide";
import { PremiumGate } from "@/components/guides/PremiumGate";
import { getGuideBySlug, getCategoryBySlug } from "@/lib/guides";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";
import type { Step } from "@/components/interactive/StepCard";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = getGuideBySlug(category, slug);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.meta.title} (Interactive) — ${SITE_NAME}`,
  };
}

// Parse simple markdown into steps
function parseSteps(content: string): Step[] {
  const steps: Step[] = [];
  const lines = content.split("\n");
  let currentStep: Step | null = null;

  for (const line of lines) {
    if (line.startsWith("## Step")) {
      if (currentStep) steps.push(currentStep);
      currentStep = {
        title: line.replace(/^## /, "").trim(),
        content: "",
      };
    } else if (currentStep && line.trim()) {
      if (
        !line.startsWith("#") &&
        !line.startsWith("---") &&
        !line.startsWith(">")
      ) {
        currentStep.content += line + "\n";
      }
    }
  }
  if (currentStep) steps.push(currentStep);

  return steps.length > 0 ? steps : [{ title: "Get Started", content: "Follow the instructions on screen." }];
}

export default async function InteractiveGuidePage({ params }: Props) {
  const { category, slug } = await params;
  const guide = getGuideBySlug(category, slug);
  const cat = getCategoryBySlug(category);

  if (!guide || !cat) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900">Guide not found</h1>
        <Link href="/guides" className="text-blue-600 mt-4 inline-block">
          ← Browse guides
        </Link>
      </div>
    );
  }

  const steps = parseSteps(guide.content);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/guides" className="hover:text-gray-600">Guides</Link>
        <span className="mx-2">›</span>
        <Link href={`/guides/${category}`} className="hover:text-gray-600">{cat.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800">{guide.meta.title} (Interactive)</span>
      </nav>

      <header className="mb-8">
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
          ⚡ Interactive Mode
        </span>
        <h1 className="text-3xl font-bold text-gray-900">{guide.meta.title}</h1>
      </header>

      <PremiumGate>
        <InteractiveGuide slug={`${category}/${slug}`} steps={steps} />
      </PremiumGate>
    </main>
  );
}
