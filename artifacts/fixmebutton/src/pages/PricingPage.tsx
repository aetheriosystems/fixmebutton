import { useState } from "react";
import { Link } from "wouter";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        window.location.href = "/auth/signin";
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Fix Smarter, Not Harder</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Free guides are great. Premium gives you interactive step-by-step guidance, voice control,
          and an &ldquo;I&rsquo;m stuck&rdquo; button that actually helps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
          <p className="text-gray-500 mb-6">For casual fixers</p>
          <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-normal text-gray-400">/month</span></div>
          <ul className="space-y-3 mb-8">
            {["All written guides", "Search by device", "Category browsing", "Email newsletter"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> {item}
              </li>
            ))}
          </ul>
          <Link href="/guides" className="block w-full py-3 text-center font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Browse Free Guides
          </Link>
        </div>

        {/* Premium Tier */}
        <div className="p-8 bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-2xl ring-4 ring-blue-200">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-xl font-bold">Premium</h2>
            <span className="px-2.5 py-1 bg-white/20 text-xs font-semibold rounded-full">BEST VALUE</span>
          </div>
          <p className="text-blue-100 mb-6">For people who want it fixed now</p>
          <div className="text-4xl font-bold mb-6">$4.99<span className="text-lg font-normal text-blue-200">/month</span></div>
          <ul className="space-y-3 mb-8">
            {[
              "Everything in Free",
              "Interactive step-by-step guides",
              "Progress tracking across devices",
              'Voice-guided mode ("next", "back")',
              '"I\'m stuck" troubleshooting help',
              "Ad-free experience",
              "Priority guide requests",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-blue-50">
                <span>✓</span> {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout("monthly")}
            disabled={loading === "monthly"}
            className="block w-full py-3 text-center font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            {loading === "monthly" ? "Redirecting..." : "Go Premium — $4.99/mo"}
          </button>
          <button
            onClick={() => handleCheckout("yearly")}
            disabled={loading === "yearly"}
            className="block w-full py-3 text-center font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors mt-3 disabled:opacity-50"
          >
            {loading === "yearly" ? "Redirecting..." : "Save 33% — $39.99/year"}
          </button>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-400">
          Cancel anytime. Questions?{" "}
          <a href="mailto:hello@fixmebutton.com" className="text-blue-600 underline">Contact us</a>
        </p>
      </div>
    </main>
  );
}
