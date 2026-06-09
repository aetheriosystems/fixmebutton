import Link from "next/link";
import { auth, signOut } from "@/auth";

export async function LoginButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm text-gray-700 hidden sm:inline">
          {session.user.name}
        </span>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          Dashboard
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Sign In
    </Link>
  );
}
