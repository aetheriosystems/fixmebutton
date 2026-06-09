import { Link } from "wouter";

export function LoginButton() {
  return (
    <Link
      href="/auth/signin"
      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Sign In
    </Link>
  );
}
