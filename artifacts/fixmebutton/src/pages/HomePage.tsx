import { Link } from "wouter";
import { getAllGuides, getCategoryBySlug } from "@/lib/guides-data";
import { CATEGORIES, SITE_NAME } from "@/lib/constants";

export default function HomePage() {
  const guides = getAllGuides();
  const featured = guides.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Tech Problems?
            <br />
            <span className="text-blue-200">Press the Fix Button.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Step-by-step guides for every device in your life.
            No jargon. No confusion. Just fixes that work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/guides"
              className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Browse All Guides
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-lg border border-blue-500"
            >
              Go Premium — $4.99/mo
            </Link>
          </div>
          <p className="mt-4 text-blue-200 text-sm">
            🔧 Free guides available • Premium unlocks interactive mode + voice
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">What Do You Need to Fix?</h2>
        <p className="text-gray-500 text-center mb-10">Choose your device to get started</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/guides/${cat.slug}`}
              className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <span className="text-4xl mb-3">{cat.icon}</span>
              <span className="font-semibold text-gray-900">{cat.name}</span>
              <span className="text-xs text-gray-400 mt-1">{cat.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Guides */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Popular Fixes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((guide) => {
              const cat = getCategoryBySlug(guide.category);
              return (
                <Link
                  key={`${guide.category}/${guide.slug}`}
                  href={`/guides/${guide.category}/${guide.slug}`}
                  className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{cat?.icon}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{cat?.name}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <div className="flex gap-2">
                    {guide.time_estimate && <span className="text-xs text-gray-400">⏱ {guide.time_estimate}</span>}
                    {guide.steps && <span className="text-xs text-gray-400">{guide.steps} steps</span>}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/guides" className="text-blue-600 font-medium hover:underline">
              View all {guides.length} guides →
            </Link>
          </div>
        </section>
      )}

      {/* Premium CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Want the Full Experience?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Premium members get interactive step-by-step guides with progress tracking,
            voice-guided mode, and an &ldquo;I&rsquo;m stuck&rdquo; button for when things go wrong.
            All ad-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 rounded-xl p-4 text-left">
              <div className="text-3xl font-bold">$4.99<span className="text-lg font-normal text-blue-200">/month</span></div>
              <div className="text-sm text-blue-200 mt-1">or $39.99/year (save 33%)</div>
            </div>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Go Premium
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Find Your Problem", desc: "Browse by device or search for your specific tech issue.", icon: "🔍" },
            { step: "2", title: "Follow the Steps", desc: "Clear, numbered instructions with pictures for every step.", icon: "📋" },
            { step: "3", title: "Problem Solved", desc: "Get back to what matters. No tech degree required.", icon: "✅" },
          ].map((item) => (
            <div key={item.step} className="text-center p-6">
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
