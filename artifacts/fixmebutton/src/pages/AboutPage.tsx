import { Link } from "wouter";
import { SITE_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About {SITE_NAME}</h1>
      <div className="prose prose-lg text-gray-600 max-w-none">
        <p className="text-xl text-gray-500 mb-8">
          We believe fixing your tech shouldn&apos;t require a computer science degree.
        </p>
        <h2>Our Mission</h2>
        <p>
          Every day, millions of people struggle with technology problems that have simple solutions.
          A Roku remote that won&apos;t pair. An iPhone that won&apos;t connect to WiFi. A printer that just
          won&apos;t print. These problems are frustrating, but they shouldn&apos;t be.
        </p>
        <p>
          FixMeButton makes tech troubleshooting accessible to everyone. No jargon. No confusing menus.
          Just clear, step-by-step instructions with pictures that show you exactly what to do.
        </p>
        <h2>How We&apos;re Different</h2>
        <ul>
          <li><strong>Built for non-technical users.</strong> Every guide is written at a 6th-grade reading level.</li>
          <li><strong>Every guide is verified.</strong> Our team follows every step on real devices.</li>
          <li><strong>Interactive premium mode.</strong> Get one step at a time with progress tracking and voice guidance.</li>
          <li><strong>Always growing.</strong> We publish new guides every week.</li>
        </ul>
        <h2>For Everyone</h2>
        <p>
          Whether you&apos;re setting up your first smartphone or helping your parents troubleshoot their
          smart TV, FixMeButton has you covered.
        </p>
        <div className="mt-10 p-6 bg-blue-50 rounded-2xl text-center">
          <p className="font-semibold text-gray-900 mb-2">Can&apos;t find what you need?</p>
          <p className="text-sm text-gray-500 mb-4">Premium members can request guides for their specific problems.</p>
          <Link href="/pricing" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Go Premium — $4.99/mo
          </Link>
        </div>
      </div>
    </main>
  );
}
