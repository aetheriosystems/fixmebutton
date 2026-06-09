import { Link } from "wouter";
import { getGuidesByCategory, getCategoryBySlug } from "@/lib/guides-data";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryPage({ category }: { category: string }) {
  const cat = getCategoryBySlug(category);
  if (!cat) return <div className="max-w-5xl mx-auto px-4 py-12"><p className="text-gray-500">Category not found.</p></div>;

  const guides = getGuidesByCategory(category);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <Link href="/guides" className="text-sm text-blue-600 hover:underline mb-2 inline-block">← All Guides</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          <span className="text-4xl mr-3">{cat.icon}</span>{cat.name} Guides
        </h1>
        <p className="mt-2 text-lg text-gray-500">{cat.description}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link href="/guides" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">All</Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/guides/${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${c.slug === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {c.icon} {c.name}
          </Link>
        ))}
      </div>

      {guides.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-6xl mb-4">{cat.icon}</p>
          <p className="text-xl">No {cat.name.toLowerCase()} guides yet</p>
          <p className="mt-2"><Link href="/guides" className="text-blue-600 underline">Browse all guides</Link></p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${category}/${guide.slug}`}
              className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 leading-snug mb-2">{guide.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {guide.difficulty && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{guide.difficulty}</span>}
                {guide.time_estimate && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">⏱ {guide.time_estimate}</span>}
                {guide.steps && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{guide.steps} steps</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
