import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, FileText } from "lucide-react";
import { AnimatedLogo } from "~/components/ui/animated-logo";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 dark:bg-[#0c0e12] dark:text-zinc-100">
      {/* Top Navbar */}
      <header className="border-b border-black/[0.06] bg-white/80 px-6 py-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0c0e12]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <AnimatedLogo size={22} />
            </div>
            <span className="text-sm font-bold tracking-tight">SingleClick</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-xs dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            <Shield size={12} />
            <span>Legal & Privacy</span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Last Updated: August 17, 2026 · Effective Immediately
          </p>
        </div>

        <div className="mt-12 space-y-10 text-xs leading-6 text-zinc-600 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              1. Overview & Commitment
            </h2>
            <p>
              At SingleClick (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the SingleClick carousel generator and studio platform (singleclick.app).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              2. Information We Collect
            </h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Account Information:</strong> When you register an account, we may collect your email address, name, and profile picture.
              </li>
              <li>
                <strong>User Content:</strong> The text prompts, slide drafts, uploaded assets, and carousel configurations you create inside the editor.
              </li>
              <li>
                <strong>Connected Social Accounts:</strong> If you choose to connect third-party platforms (LinkedIn, X, Threads, Instagram), we securely store OAuth access tokens solely to publish your carousels per your request. We never read or store your personal feeds.
              </li>
              <li>
                <strong>Usage Metrics:</strong> Basic analytics such as feature interactions and export counts to help us maintain system reliability.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              3. How We Use Your Information
            </h2>
            <p>
              We use the collected information exclusively to provide, maintain, and enhance the SingleClick platform, specifically:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Generating AI-powered carousels based on your instructions.</li>
              <li>Allowing you to save and resume drafts across sessions.</li>
              <li>Executing one-click publishing to your authenticated social channels.</li>
              <li>Providing customer support and updates regarding service reliability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              4. AI Models & Data Ownership
            </h2>
            <p>
              You retain 100% intellectual property rights and full commercial ownership of all slides, images, copy, and carousel bundles created with SingleClick. We do not sell your personal data or use your private carousel prompts to train public foundational AI models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              5. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS 1.3 in transit and AES-256 at rest) to protect your authentication tokens and assets. All payment processing is handled through certified PCI-DSS compliant providers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              6. Your Rights & Contact
            </h2>
            <p>
              You have the right to access, export, or permanently delete your account data at any time. If you have any questions or wish to exercise your data rights, contact us at:
            </p>
            <p className="font-semibold text-zinc-900 dark:text-white">
              <a href="mailto:privacy@singleclick.app" className="text-blue-600 hover:underline dark:text-blue-400">
                privacy@singleclick.app
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
