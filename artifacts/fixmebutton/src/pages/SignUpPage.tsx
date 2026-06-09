import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SITE_NAME } from "@/lib/constants";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function SignUpPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create account");
      } else {
        navigate("/auth/signin");
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500">Join {SITE_NAME} to save your progress</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" type="password" required autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-blue-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
