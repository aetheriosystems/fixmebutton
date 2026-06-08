"use client";

import { useState, useEffect, useRef } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  devices: string[];
  difficulty: string;
  time_estimate: string;
}

const fuseOptions: IFuseOptions<SearchResult> = {
  keys: [
    { name: "title", weight: 0.6 },
    { name: "devices", weight: 0.3 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
};

const CATEGORY_NAMES: Record<string, string> = {
  smartphones: "📱 Smartphones",
  computers: "💻 Computers",
  "tvs-streaming": "📺 TVs & Streaming",
  "internet-wifi": "🌐 Internet & WiFi",
  "email-accounts": "📧 Email & Accounts",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load search index on mount
  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchResult[]) => {
        setIndex(data);
        setFuse(new Fuse(data, fuseOptions));
      })
      .catch(() => {});
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search as user types
  useEffect(() => {
    if (!fuse || query.length < 2) {
      setResults([]);
      return;
    }
    const found = fuse.search(query).slice(0, 8).map((r) => r.item);
    setResults(found);
    setOpen(found.length > 0);
  }, [query, fuse]);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search guides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/guides/${r.slug}`}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                  {CATEGORY_NAMES[r.category] || r.category}
                </span>
                {r.difficulty && (
                  <span className="text-xs text-gray-400">{r.difficulty}</span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-900">{r.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
