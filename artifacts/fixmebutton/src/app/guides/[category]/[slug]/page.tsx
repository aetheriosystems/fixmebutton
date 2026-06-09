import { notFound } from "next/navigation";
import { getGuideBySlug, getCategoryBySlug } from "@/lib/guides";
import { getAllGuides } from "@/lib/guides";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ category: g.category, slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = getGuideBySlug(category, slug);
  if (!guide) return { title: "Not Found" };

  const cat = getCategoryBySlug(category);
  return {
    title: `${guide.meta.title} — ${SITE_NAME}`,
    description: `Step-by-step guide: ${guide.meta.title}. Covers ${guide.meta.devices?.join(", ") || "all devices"}. ${guide.meta.time_estimate ? `Estimated time: ${guide.meta.time_estimate}.` : ""}`,
    openGraph: {
      title: guide.meta.title,
      description: `Learn how to ${guide.meta.title.toLowerCase()} with this easy step-by-step guide.`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { category, slug } = await params;
  const guide = getGuideBySlug(category, slug);
  const cat = getCategoryBySlug(category);

  if (!guide || !cat) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-gray-600">
          Home
        </a>
        <span className="mx-2">›</span>
        <a href="/guides" className="hover:text-gray-600">
          Guides
        </a>
        <span className="mx-2">›</span>
        <a href={`/guides/${category}`} className="hover:text-gray-600">
          {cat.name}
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-800">{guide.meta.title}</span>
      </nav>

      {/* Guide Meta */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-3xl">{cat.icon}</span>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {guide.meta.difficulty || "beginner"}
          </span>
          {guide.meta.time_estimate && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              ⏱ {guide.meta.time_estimate}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {guide.meta.title}
        </h1>
        {guide.meta.devices && (
          <p className="mt-2 text-gray-500">
            Works with: {guide.meta.devices.join(", ")}
          </p>
        )}
        {guide.meta.last_verified && (
          <p className="mt-1 text-sm text-gray-400">
            Last verified: {guide.meta.last_verified}
          </p>
        )}
      </header>

      {/* Guide Content */}
      <div className="prose prose-lg prose-blue max-w-none">
        <MDXRemote source={guide.content} />
      </div>

      {/* Premium CTA */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Want the Interactive Version?</h2>
        <p className="text-blue-100 mb-6">
          Premium members get step-by-step progress tracking, voice-guided mode, and
          an &ldquo;I&rsquo;m stuck&rdquo; button that helps when things go wrong.
        </p>
        <a
          href="/pricing"
          className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Go Premium — $4.99/month
        </a>
      </div>
    </article>
  );
}
