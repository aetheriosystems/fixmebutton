import { Link } from "wouter";
import { getAllGuides, getCategoryBySlug } from "@/lib/guides-data";
import { CATEGORIES } from "@/lib/constants";

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Guides</h1>
        <p className="mt-2 text-lg text-gray-500">Step-by-step troubleshooting for every device in your life</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link href="/guides" className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">All</Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/guides/${cat.slug}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {guides.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-6xl mb-4">🔧</p>
          <p className="text-xl">Guides coming soon!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const cat = getCategoryBySlug(guide.category);
            return (
              <Link
                key={`${guide.category}/${guide.slug}`}
                href={`/guides/${guide.category}/${guide.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{cat?.icon}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{cat?.name}</span>
                </div>
                <h3 className="font-semibold text-gray-900 leading-snug mb-2">{guide.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {guide.difficulty && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{guide.difficulty}</span>
                  )}
                  {guide.time_estimate && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">⏱ {guide.time_estimate}</span>
                  )}
                  {guide.steps && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{guide.steps} steps</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
