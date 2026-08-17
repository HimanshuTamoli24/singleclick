"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { AnimatedLogo } from "~/components/ui/animated-logo";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      toast.success("Message sent! We'll reply within 24 hours.");
    }, 800);
  };

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

      {/* Hero Header */}
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-xs dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            <Sparkles size={12} />
            <span>We&apos;re here to help</span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Get in touch with us
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm text-zinc-500 dark:text-zinc-400">
            Have questions about SingleClick, custom enterprise templates, partnerships, or feature requests? Send us a message!
          </p>
        </div>

        {/* Contact Container */}
        <div className="mt-14 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          {/* Form */}
          <div className="rounded-3xl border border-black/[0.08] bg-white p-7 shadow-sm dark:border-white/[0.08] dark:bg-zinc-900/60 sm:p-9">
            {sent ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="mt-4 text-lg font-bold">Message Received</h2>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Thank you for reaching out, {name}. Our team will get back to your email at <span className="font-semibold text-zinc-800 dark:text-zinc-200">{email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-black focus:bg-white focus:outline-none dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-black focus:bg-white focus:outline-none dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-black focus:bg-white focus:outline-none dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:focus:border-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing & Plans">Billing & Plans</option>
                    <option value="Enterprise / API Access">Enterprise / API Access</option>
                    <option value="Bug Report">Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-black focus:bg-white focus:outline-none dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-semibold text-white transition-all hover:bg-black/85 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  <Send size={13} />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-zinc-900/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Mail size={16} />
                </div>
                <h2 className="mt-3 text-xs font-bold text-zinc-900 dark:text-white">
                  Email Support
                </h2>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Direct support for creators and pro plan subscribers.
                </p>
                <a
                  href="mailto:support@singleclick.app"
                  className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  support@singleclick.app
                </a>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-zinc-900/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <MessageSquare size={16} />
                </div>
                <h2 className="mt-3 text-xs font-bold text-zinc-900 dark:text-white">
                  Community & Feature Requests
                </h2>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Check our live public roadmap and vote for upcoming tools.
                </p>
                <Link
                  href="/updates?tab=roadmap"
                  className="mt-2 inline-block text-xs font-medium text-purple-600 hover:underline dark:text-purple-400"
                >
                  View Public Roadmap &rarr;
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-zinc-100/70 p-4 text-[11px] text-zinc-500 dark:border-white/[0.06] dark:bg-zinc-900/40 dark:text-zinc-400">
              ⚡ Typical response time is under 12 hours on business days.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
