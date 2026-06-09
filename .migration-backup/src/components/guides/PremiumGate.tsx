import Link from "next/link";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export async function PremiumGate({ children }: Props) {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl text-center border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Sign In to Continue
        </h3>
        <p className="text-gray-500 mb-4">
          Create a free account to access the full interactive guide.
        </p>
        <Link
          href="/auth/signin"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Check subscription — use the actual user ID from the session
  const db = getDb();
  let isPremium = false;

  if (db) {
    try {
      const [sub] = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, session.user.id),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);
      isPremium = !!sub;
    } catch {
      // DB not available — show upgrade CTA
    }
  }

  if (!isPremium) {
    return (
      <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl text-center border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Unlock the Full Guide
        </h3>
        <p className="text-gray-500 mb-4">
          Get interactive step-by-step guidance, voice control, and
          progress tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Premium — $4.99/mo
          </Link>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Already premium?{" "}
          <Link href="/auth/signin" className="text-blue-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
