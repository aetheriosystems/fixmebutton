import { Link } from "wouter";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PremiumGate({ children }: Props) {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl text-center border border-blue-200">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock the Full Guide</h3>
      <p className="text-gray-500 mb-4">
        Get interactive step-by-step guidance, voice control, and progress tracking.
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
        <Link href="/auth/signin" className="text-blue-600 underline">Sign in</Link>
      </p>
    </div>
  );
}
