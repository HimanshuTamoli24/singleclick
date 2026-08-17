import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle2 } from "lucide-react";
import { AnimatedLogo } from "~/components/ui/animated-logo";

export default function TermsPage() {
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
            <Scale size={12} />
            <span>Terms & Conditions</span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Last Updated: August 17, 2026 · Effective Immediately
          </p>
        </div>

        <div className="mt-12 space-y-10 text-xs leading-6 text-zinc-600 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using SingleClick (&quot;the Service&quot;), provided through singleclick.app, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              2. Description of Service
            </h2>
            <p>
              SingleClick is an AI-powered visual carousel creation, design, and multi-platform social publishing tool. We grant you a revocable, non-exclusive, non-transferable license to use the Service in compliance with applicable laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              3. Content & Ownership
            </h2>
            <p>
              <strong>Your Content:</strong> You own all carousel slides, graphics, copy, and exported assets that you create on SingleClick. You are solely responsible for ensuring that your content does not violate third-party trademarks, copyrights, or privacy rights.
            </p>
            <p>
              <strong>AI Outputs:</strong> To the extent permissible by law, all rights in generated content are assigned to you for unrestricted commercial and personal usage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              4. Subscriptions & Billing
            </h2>
            <p>
              SingleClick offers free tiers and paid Pro subscription plans. Paid subscriptions automatically renew each billing cycle unless cancelled prior to the renewal date. You can cancel your subscription at any time directly through your account settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              5. Acceptable Use
            </h2>
            <p>
              You agree not to use SingleClick to generate unlawful, harassing, defamatory, or deceptive content, or attempt to reverse-engineer, disrupt, or exploit the platform or connected AI APIs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              6. Limitation of Liability
            </h2>
            <p>
              SingleClick is provided &quot;as is&quot; without warranties of any kind. Under no circumstances shall SingleClick be liable for indirect, incidental, or consequential damages resulting from the use or inability to use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              7. Inquiries
            </h2>
            <p>
              For legal inquiries or questions regarding these terms, please contact:
            </p>
            <p className="font-semibold text-zinc-900 dark:text-white">
              <a href="mailto:legal@singleclick.app" className="text-blue-600 hover:underline dark:text-blue-400">
                legal@singleclick.app
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
