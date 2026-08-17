"use client";

import Link from "next/link";
import {
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ArrowLeft,
  Layers3,
  SlidersHorizontal,
  Download,
  Check,
} from "lucide-react";
import React from "react";

export function MobileGuard() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#08090b] text-white md:hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute top-[-180px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col items-center px-5 py-10 sm:justify-center">
        {/* Top brand */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium text-zinc-400">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <span>SingleClick Carousel Studio</span>
        </div>

        {/* Workspace Preview */}
        <div className="relative mb-8 w-full">
          <div className="bg-primary/10 absolute inset-0 rounded-3xl blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.035] p-3 shadow-2xl backdrop-blur-xl">
            {/* Fake browser */}
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f12]">
              {/* Browser header */}
              <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-3">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />

                <div className="mx-auto h-4 w-32 rounded-md bg-white/[0.04]" />
              </div>

              {/* Editor */}
              <div className="flex h-44">
                {/* Sidebar */}
                <div className="w-10 border-r border-white/[0.07] p-2">
                  <div className="space-y-2">
                    <div className="h-5 rounded bg-white/[0.07]" />
                    <div className="bg-primary/20 h-5 rounded" />
                    <div className="h-5 rounded bg-white/[0.07]" />
                    <div className="h-5 rounded bg-white/[0.07]" />
                  </div>
                </div>

                {/* Canvas */}
                <div className="flex flex-1 items-center justify-center bg-[#111318]">
                  <div className="from-primary/20 aspect-[4/5] h-32 rounded-md border border-white/10 bg-gradient-to-br via-purple-500/10 to-blue-500/20 p-2 shadow-xl">
                    <div className="flex h-full flex-col justify-between rounded border border-white/10 bg-black/20 p-2">
                      <div>
                        <div className="h-2 w-12 rounded bg-white/50" />
                        <div className="mt-1.5 h-1.5 w-20 rounded bg-white/20" />
                      </div>

                      <div className="h-12 rounded bg-white/[0.07]" />

                      <div className="h-1.5 w-10 rounded bg-white/30" />
                    </div>
                  </div>
                </div>

                {/* Properties */}
                <div className="w-12 border-l border-white/[0.07] p-2">
                  <div className="space-y-2">
                    <div className="h-2 rounded bg-white/10" />
                    <div className="h-5 rounded bg-white/[0.05]" />
                    <div className="h-2 rounded bg-white/10" />
                    <div className="h-5 rounded bg-white/[0.05]" />
                    <div className="h-2 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop badge */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-medium text-zinc-300 shadow-xl backdrop-blur-xl">
              <Monitor className="text-primary h-3 w-3" />
              Editor workspace
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="border-primary/20 bg-primary/[0.08] text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium">
          <Sparkles className="h-3 w-3" />
          Built for larger screens
        </div>

        {/* Heading */}
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Your canvas needs
            <span className="block text-zinc-500">a little more room.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Carousel Studio is designed for precise multi-slide editing. Open it
            on a desktop, laptop, or tablet for the full experience.
          </p>
        </div>

        {/* Supported devices */}
        <div className="mt-7 flex items-center justify-center gap-2">
          <Device
            icon={<Monitor className="h-4 w-4" />}
            label="Desktop"
            active
          />

          <Device icon={<Tablet className="h-4 w-4" />} label="Tablet" active />

          <Device
            icon={<Smartphone className="h-4 w-4" />}
            label="Mobile"
            disabled
          />
        </div>

        {/* Features */}
        <div className="mt-7 w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <div className="grid grid-cols-1 gap-3">
            <Feature
              icon={<Layers3 />}
              title="Multi-slide canvas"
              description="Work with your full 1080 × 1350 carousel workspace."
            />

            <Feature
              icon={<SlidersHorizontal />}
              title="Full editing controls"
              description="Layers, typography, colors and positioning in one workspace."
            />

            <Feature
              icon={<Download />}
              title="High-resolution export"
              description="Export complete social carousels without compromising quality."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 w-full">
          <Link
            href="/"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black shadow-lg shadow-white/5 transition-colors hover:bg-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <p className="mt-4 text-center text-[11px] text-zinc-600">
          Smartphone browsers are currently not supported.
        </p>
      </div>
    </div>
  );
}

function Device({
  icon,
  label,
  active = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
        active
          ? "border-white/10 bg-white/[0.05] text-zinc-300"
          : "border-red-500/10 bg-red-500/[0.04] text-zinc-600",
      ].join(" ")}
    >
      <span className={active ? "text-primary" : "text-red-400/60"}>
        {icon}
      </span>

      <span>{label}</span>

      {active && <Check className="h-3 w-3 text-emerald-400" />}

      {disabled && (
        <span className="text-[9px] text-red-400/70">Not supported</span>
      )}
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-3">
      <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: "h-4 w-4",
            })
          : icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-200">{title}</p>
        <p className="mt-0.5 text-[11px] leading-4 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}
