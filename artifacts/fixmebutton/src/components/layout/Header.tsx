import { Link } from "wouter";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import { LoginButton } from "@/components/auth/LoginButton";
import { SearchBar } from "@/components/layout/SearchBar";

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 shrink-0">
          <span className="text-2xl">🔧</span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
        </Link>

        <div className="flex-1 max-w-sm hidden sm:block">
          <SearchBar />
        </div>

        <nav className="hidden lg:flex items-center gap-4">
          <Link href="/guides" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            All Guides
          </Link>
          {CATEGORIES.slice(0, 3).map((cat) => (
            <Link
              key={cat.slug}
              href={`/guides/${cat.slug}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <LoginButton />
          <Link
            href="/pricing"
            className="hidden sm:inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Premium
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Guides</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/guides/${cat.slug}`} className="text-sm text-gray-500 hover:text-gray-900">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Site</h4>
            <ul className="space-y-2">
              <li><Link href="/guides" className="text-sm text-gray-500 hover:text-gray-900">All Guides</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">{SITE_NAME}</h4>
            <p className="text-sm text-gray-500">Step-by-step tech troubleshooting for everyone. No jargon, just fixes.</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
