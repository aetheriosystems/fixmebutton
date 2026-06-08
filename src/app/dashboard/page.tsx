import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard — ${SITE_NAME}`,
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="w-14 h-14 rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name || "Fixer"}!
          </h1>
          <p className="text-gray-500">{session.user.email}</p>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="mb-10 p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">
              Subscription
            </h2>
            <p className="text-sm text-gray-500">
              You&apos;re on the <span className="font-medium text-gray-700">Free</span> plan
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>

      {/* Guides in Progress */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Guides In Progress
        </h2>
        <div className="p-10 bg-white border border-gray-200 rounded-xl text-center">
          <p className="text-gray-400 mb-2">No guides in progress yet</p>
          <Link
            href="/guides"
            className="text-blue-600 text-sm hover:underline"
          >
            Browse guides to get started →
          </Link>
        </div>
      </section>

      {/* Saved Guides */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          ⭐ Saved Guides
        </h2>
        <div className="p-10 bg-white border border-gray-200 rounded-xl text-center">
          <p className="text-gray-400 mb-2">No saved guides yet</p>
          <p className="text-sm text-gray-400">
            As you browse guides, bookmark them to find them quickly here.
          </p>
        </div>
      </section>

      {/* Request a Guide */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Request a Guide
        </h2>
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
          <p className="text-sm text-gray-500 mb-4">
            Can&apos;t find what you need? Tell us what you want help with
            and we&apos;ll create a guide for it.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="e.g., How to connect AirPods to Samsung TV"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Describe your problem in more detail (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">
            Premium users get priority. Free users: one request at a time.
          </p>
        </div>
      </section>
    </main>
  );
}
