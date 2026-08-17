"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Layers3,
  Link2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { AnimatedLogo } from "@/components/ui/animated-logo";

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const faqs = [
  {
    q: "What does SingleClick do?",
    a: "SingleClick helps you create, customize, and publish social media carousels. AI generates the initial carousel, you can edit every slide in the visual editor, connect your social accounts, and publish your finished post to multiple platforms.",
  },
  {
    q: "Do I need design skills?",
    a: "No. AI handles the initial content structure and visual layout. You can then customize typography, colors, images, backgrounds, shapes, and other elements in the visual editor.",
  },
  {
    q: "Which platforms can I publish to?",
    a: "SingleClick is designed around multi-platform publishing, including LinkedIn, Instagram, X, Threads, and other supported social platforms.",
  },
  {
    q: "Can I edit AI-generated carousels?",
    a: "Yes. AI generation is only the starting point. Every generated slide can be edited inside the visual canvas.",
  },
  {
    q: "What can I export?",
    a: "You can export your carousel as high-resolution PNG images, PDF, or a ZIP containing your complete set of slides.",
  },
  {
    q: "Can I connect my social accounts?",
    a: "Yes. Connect your supported social accounts once and use SingleClick as the place where you create and publish your content.",
  },
];

const features = [
  {
    icon: Wand2,
    title: "Create with AI",
    description:
      "Give SingleClick a topic, idea, thread, or rough content. AI turns it into a structured multi-slide carousel.",
  },
  {
    icon: Layers3,
    title: "Edit visually",
    description:
      "Customize every slide with typography, images, shapes, backgrounds, gradients, patterns, spacing, and layout controls.",
  },
  {
    icon: Link2,
    title: "Connect your accounts",
    description:
      "Connect your social accounts once and keep your publishing workflow inside SingleClick.",
  },
  {
    icon: Download,
    title: "Export everything",
    description:
      "Export individual slides or your complete carousel as PNG, PDF, or ZIP with one action.",
  },
];

const marqueePlatforms = [
  {
    name: "LinkedIn",
    ratio: "4:5",
    hoverStyle:
      "hover:border-[#0A66C2]/40 hover:text-[#0A66C2] hover:bg-[#0A66C2]/[0.06] hover:shadow-[0_0_20px_rgba(10,102,194,0.12)]",
    dotColor: "bg-[#0A66C2]",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    ratio: "1:1",
    hoverStyle:
      "hover:border-pink-500/40 hover:text-pink-600 hover:bg-pink-500/[0.06] hover:shadow-[0_0_20px_rgba(236,72,153,0.12)]",
    dotColor: "bg-pink-500",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    ratio: "16:9",
    hoverStyle:
      "hover:border-black/40 hover:text-black hover:bg-black/[0.05] dark:hover:border-white/40 dark:hover:text-white dark:hover:bg-white/[0.05]",
    dotColor: "bg-black dark:bg-white",
    icon: (
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    ratio: "4:5",
    hoverStyle:
      "hover:border-black/40 hover:text-black hover:bg-black/[0.05] dark:hover:border-white/40 dark:hover:text-white",
    dotColor: "bg-zinc-800 dark:bg-zinc-200",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12.01 2.25c-5.38 0-9.75 4.37-9.75 9.75s4.37 9.75 9.75 9.75a9.7 9.7 0 0 0 6.89-2.85l-1.52-1.52a7.58 7.58 0 0 1-5.37 2.22c-4.19 0-7.6-3.41-7.6-7.6s3.41-7.6 7.6-7.6c3.96 0 7.21 3.03 7.56 6.91.07.76-.05 1.76-.66 2.37-.41.41-1 .62-1.69.62-.97 0-1.74-.46-2.1-1.25.75-.41 1.25-1.21 1.25-2.13 0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5c.57 0 1.09-.19 1.5-.52.41.97 1.37 1.67 2.5 1.67 1.25 0 2.23-.46 2.94-1.17.95-.95 1.16-2.29 1.07-3.32-.47-5.07-4.69-9.03-9.85-9.03zm-.45 8.1c.47 0 .85.38.85.85s-.38.85-.85.85-.85-.38-.85-.85.38-.85.85-.85z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    ratio: "1:1",
    hoverStyle:
      "hover:border-[#1877F2]/40 hover:text-[#1877F2] hover:bg-[#1877F2]/[0.06] hover:shadow-[0_0_20px_rgba(24,119,242,0.12)]",
    dotColor: "bg-[#1877F2]",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-black/10 bg-white/90 px-4 shadow-sm backdrop-blur-xl sm:px-5">
        <Link
          href="/"
          aria-label="SingleClick Home"
          className="flex items-center gap-2.5"
        >
          <AnimatedLogo size={30} />

          <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
            SingleClick
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-black/50 md:flex">
          <a href="#features" className="transition-colors hover:text-black">
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition-colors hover:text-black"
          >
            How it works
          </a>

          <a href="#pricing" className="transition-colors hover:text-black">
            Pricing
          </a>

          <Link
            href="/updates?tab=roadmap"
            className="transition-colors hover:text-black"
          >
            Roadmap
          </Link>

          <Link
            href="/updates?tab=changelog"
            className="transition-colors hover:text-black"
          >
            Changelog
          </Link>

          <a href="#faq" className="transition-colors hover:text-black">
            FAQ
          </a>
        </nav>

        <Link
          href="/builder"
          className="group flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Get started
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-36 pb-20 sm:pt-40">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft center glow */}
      <div className="pointer-events-none absolute top-40 left-1/2 h-[500px] w-[900px] rounded-full bg-black/[0.025] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-5xl leading-[0.94] font-bold tracking-[-0.055em] text-balance text-black sm:text-6xl md:text-7xl lg:text-[88px]">
            Create once.
            <br />
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
              Publish everywhere.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-pretty text-black/50 sm:text-lg">
            Create a carousel with AI, customize every slide, connect your
            social accounts, and publish to LinkedIn, Instagram, X, Threads, and
            more — all from one place.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/builder"
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/85"
            >
              Create your first carousel
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black transition hover:border-black/25"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Platform Marquee (Interactive SaaS Ribbon) */}
        <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex items-center gap-3.5 py-2">
            {[...marqueePlatforms, ...marqueePlatforms].map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className={`group/item flex items-center gap-2.5 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold tracking-tight text-zinc-600 shadow-xs backdrop-blur-md transition-all duration-300 select-none hover:scale-105 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-300 ${p.hoverStyle}`}
              >
                {/* Subtle blue / brand indicator dot */}
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-30 group-hover/item:opacity-0" />
                  <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500/70 transition-colors group-hover/item:${p.dotColor}`}
                  />
                </span>

                <span className="flex items-center text-zinc-500 transition-colors group-hover/item:text-inherit dark:text-zinc-400">
                  {p.icon}
                </span>

                <span className="text-[12px] font-medium">{p.name}</span>

                <span className="rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-black/40 uppercase transition-colors group-hover/item:bg-black/[0.08] dark:bg-white/[0.06] dark:text-white/40">
                  {p.ratio}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product preview */}
        <HeroProductPreview />

        {/* Value props */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            "AI generated",
            "Fully editable",
            "Connected accounts",
            "One-click publishing",
          ].map((item) => (
            <div
              key={item}
              className="text-muted-foreground flex items-center gap-2 text-xs"
            >
              <Check size={13} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO PRODUCT PREVIEW                                                       */
/* -------------------------------------------------------------------------- */

function HeroProductPreview() {
  return (
    <div className="group relative mx-auto mt-16 max-w-6xl">
      {/* Subtle colorful aura glow behind preview */}
      <div className="pointer-events-none absolute -inset-1.5 rounded-[28px] opacity-50 blur-2xl transition-all duration-700 group-hover:opacity-90" />

      {/* Frame container */}
      <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_35px_100px_rgba(0,0,0,0.15)] dark:border-white/10 dark:bg-zinc-900">
        <Image
          src="/hero.png"
          alt="SingleClick Carousel Studio Preview"
          width={1920}
          height={1080}
          priority
          className="h-auto w-full object-cover transition-transform duration-700 ease-out"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FEATURES                                                                   */
/* -------------------------------------------------------------------------- */

function Features() {
  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="max-w-2xl">
        <h2 className="mt-4 text-4xl leading-[1] font-semibold tracking-[-0.05em] sm:text-5xl">
          From idea to
          <br />
          published post.
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-black/45">
          Stop jumping between AI tools, Canva, image editors, and social
          platforms. SingleClick brings the entire carousel workflow together.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group bg-white p-7 transition-colors hover:bg-[#fafafa] sm:p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <Icon size={18} />
              </div>

              <h3 className="mt-8 text-base font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/45">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* HOW IT WORKS                                                               */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create",
      description:
        "Describe your topic, paste your content, or start with an idea. AI creates the carousel for you.",
    },
    {
      number: "02",
      title: "Customize",
      description:
        "Open the visual editor and change the content, typography, images, backgrounds, and layout.",
    },
    {
      number: "03",
      title: "Connect",
      description:
        "Connect the social accounts where you want your carousel to appear.",
    },
    {
      number: "04",
      title: "Publish",
      description:
        "Choose your platforms and publish the same carousel everywhere with one click.",
    },
  ];

  return (
    <motion.section
      id="how-it-works"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="border-y border-black/5 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-32">
        <div className="text-center">
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Four steps.
            <br />
            One workflow.
          </h2>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-7 sm:p-9">
              <div className="text-xs font-medium text-black/25">
                {step.number}
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/45">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* PUBLISHING                                                                 */
/* -------------------------------------------------------------------------- */

function Publishing() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="overflow-hidden rounded-3xl bg-black text-white">
        <div className="grid lg:grid-cols-2">
          <div className="px-7 py-16 sm:px-12 lg:px-16 lg:py-20">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
              One click publishing
            </div>

            <h2 className="mt-5 text-4xl leading-[0.98] font-semibold tracking-[-0.05em] sm:text-5xl">
              Create one.
              <br />
              Publish everywhere.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/45">
              Connect your social accounts once. When your carousel is ready,
              select where it should go and publish it without downloading,
              resizing, or uploading everything manually.
            </p>

            <Link
              href="/builder"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Start creating
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="border-t border-white/10 p-6 sm:p-10 lg:border-t-0 lg:border-l">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Publish carousel</span>

                <span className="text-[9px] text-white/30">6 slides</span>
              </div>

              <div className="mt-6 space-y-2">
                {["LinkedIn", "Instagram", "X", "Threads", "Facebook"].map(
                  (platform) => (
                    <div
                      key={platform}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="text-xs">{platform}</span>

                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-black">
                        <Check size={12} />
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-xl bg-white p-4 text-black">
                <div className="text-[9px] text-black/35">Publishing to</div>

                <div className="mt-1 text-sm font-semibold">
                  5 connected accounts
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2.5 text-[11px] font-medium text-white">
                  Publish now
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* PRICING                                                                    */
/* -------------------------------------------------------------------------- */

function Pricing() {
  const freeFeatures = [
    "AI carousel generation",
    "Visual editor",
    "PNG export",
    "Platform presets",
    "Unlimited slides",
  ];

  const proFeatures = [
    "Everything in Free",
    "PDF export",
    "ZIP batch download",
    "Custom brand templates",
    "Priority AI generation",
    "Social account publishing",
  ];

  return (
    <motion.section
      id="pricing"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="border-y border-black/5 bg-white"
    >
      <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 lg:py-32">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-[0.18em] text-black/30 uppercase">
            Pricing
          </div>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Start free.
          </h2>

          <p className="mt-4 text-sm text-black/45">
            Create first. Upgrade when you need more.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-8">
            <div className="text-sm font-medium">Free</div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-[-0.05em]">
                $0
              </span>

              <span className="pb-2 text-sm text-black/35">forever</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-black/45">
              Everything you need to start creating.
            </p>

            <ul className="mt-8 space-y-3">
              {freeFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check size={15} className="text-black/50" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/builder"
              className="mt-8 flex h-11 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-medium transition hover:border-black/25"
            >
              Start creating
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl bg-black p-8 text-white">
            <div className="absolute top-6 right-6 rounded-full bg-white/10 px-3 py-1 text-[9px] font-medium tracking-wider text-white/60 uppercase">
              Popular
            </div>

            <div className="text-sm font-medium">Pro</div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-[-0.05em]">
                $19
              </span>

              <span className="pb-2 text-sm text-white/35">/month</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/45">
              For creators who publish consistently.
            </p>

            <ul className="mt-8 space-y-3">
              {proFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check size={15} className="text-white/60" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/builder"
              className="mt-8 flex h-11 items-center justify-center rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/90"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-3xl px-5 py-28 sm:px-8 lg:py-32"
    >
      <h2 className="mt-4 text-center text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
        Questions, answered.
      </h2>

      <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-sm font-medium">{faq.q}</span>

                <ChevronDown
                  size={17}
                  className={`shrink-0 text-black/35 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pr-10 pb-6 text-sm leading-6 text-black/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="px-5 pb-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#f1f1f1] px-6 py-20 text-center sm:px-12">
        <Sparkles className="mx-auto h-6 w-6 text-black/35" />

        <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-[1] font-semibold tracking-[-0.055em] sm:text-5xl">
          Your next carousel
          <br />
          starts with an idea.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-black/45">
          Create it with AI. Make it yours. Connect your accounts. Publish it
          everywhere.
        </p>

        <Link
          href="/builder"
          className="group mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Create for free
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold tracking-tight"
            >
              <AnimatedLogo size={27} />

              <span>SingleClick</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-black/45">
              Create, customize, and publish social media carousels from one
              place.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="text-xs font-semibold tracking-wider text-black/30 uppercase">
              Product
            </div>

            <div className="mt-4 space-y-3 text-sm text-black/50">
              <a href="#features" className="block transition hover:text-black">
                Features
              </a>

              <Link
                href="/updates?tab=roadmap"
                className="block transition hover:text-black"
              >
                Roadmap
              </Link>

              <Link
                href="/updates?tab=changelog"
                className="block transition hover:text-black"
              >
                Changelog
              </Link>

              <a href="#pricing" className="block transition hover:text-black">
                Pricing
              </a>

              <Link
                href="/builder"
                className="block transition hover:text-black"
              >
                Builder
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold tracking-wider text-black/30 uppercase">
              Company
            </div>

            <div className="mt-4 space-y-3 text-sm text-black/50">
              <Link
                href="/contact"
                className="block transition hover:text-black"
              >
                Contact
              </Link>

              <Link
                href="/privacy-policy"
                className="block transition hover:text-black"
              >
                Privacy
              </Link>

              <Link href="/terms" className="block transition hover:text-black">
                Terms
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="text-xs font-semibold tracking-wider text-black/30 uppercase">
              Social
            </div>

            <div className="mt-4 space-y-3 text-sm text-black/50">
              <a href="#" className="block transition hover:text-black">
                LinkedIn
              </a>

              <a href="#" className="block transition hover:text-black">
                X
              </a>

              <a href="#" className="block transition hover:text-black">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-black/5 pt-6 text-xs text-black/30 sm:flex-row">
          <span>© 2026 SingleClick. All rights reserved.</span>

          <div className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="transition hover:text-black"
            >
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111] selection:bg-black selection:text-white">
      <Header />

      <Hero />

      <Features />

      <HowItWorks />

      <Publishing />

      <Pricing />

      <FAQ />

      <FinalCTA />

      <Footer />
    </main>
  );
}
