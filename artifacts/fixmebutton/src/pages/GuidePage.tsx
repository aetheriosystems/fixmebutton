import { Link } from "wouter";
import { getGuideBySlug, getCategoryBySlug } from "@/lib/guides-data";
import { SITE_NAME } from "@/lib/constants";

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^> \*\*(.+?)\*\*(.*)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 my-4 bg-blue-50 py-3 pr-4 rounded-r-lg"><p class="text-sm text-blue-800"><strong>$1</strong>$2</p></blockquote>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 my-4 bg-blue-50 py-3 pr-4 rounded-r-lg"><p class="text-sm text-blue-800">$1</p></blockquote>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1 list-disc">$1</li>')
    .replace(/^(\*\*[^*]+\*\*:)$/gm, '<p class="font-semibold text-gray-900 mt-4 mb-1">$1</p>')
    .replace(/\n\n/g, '</p><p class="text-gray-600 mb-4">')
    .replace(/^(?!<[hbpl])(.+)$/gm, '<p class="text-gray-600 mb-4">$1</p>');
}

export default function GuidePage({ category, slug }: { category: string; slug: string }) {
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

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/guides" className="hover:text-gray-600">Guides</Link>
        <span className="mx-2">›</span>
        <Link href={`/guides/${category}`} className="hover:text-gray-600">{cat.name}</Link>
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{guide.meta.title}</h1>
        {guide.meta.devices && (
          <p className="mt-2 text-gray-500">Works with: {guide.meta.devices.join(", ")}</p>
        )}
        {guide.meta.last_verified && (
          <p className="mt-1 text-sm text-gray-400">Last verified: {guide.meta.last_verified}</p>
        )}
      </header>

      {/* Guide Content */}
      <div
        className="prose prose-lg prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(guide.content) }}
      />

      {/* Premium CTA */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Want the Interactive Version?</h2>
        <p className="text-blue-100 mb-6">
          Premium members get step-by-step progress tracking, voice-guided mode, and
          an &ldquo;I&rsquo;m stuck&rdquo; button that helps when things go wrong.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Go Premium — $4.99/month
        </Link>
      </div>
    </article>
  );
}
