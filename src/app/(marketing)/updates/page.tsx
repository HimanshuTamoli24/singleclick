"use client";

import React, { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Flame,
  Search,
  Compass,
  History,
} from "lucide-react";
import { AnimatedLogo } from "~/components/ui/animated-logo";

type TabType = "roadmap" | "changelog";

interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  status: "backlog" | "next_up" | "in_progress" | "done";
  description: string;
}

const initialRoadmapItems: RoadmapItem[] = [
  // IN PROGRESS
  {
    id: "r1",
    title: "Direct Social Auto-Publishing",
    category: "Integration",
    status: "in_progress",
    description:
      "Publish carousels directly to LinkedIn, X, and Threads without downloading files.",
  },
  {
    id: "r2",
    title: "Sound & Background Music Audio Layer",
    category: "Audio",
    status: "in_progress",
    description:
      "Attach background tracks and sound effects for video carousel reels.",
  },
  {
    id: "r3",
    title: "Animated MP4 & Video Slide Export",
    category: "Video",
    status: "in_progress",
    description:
      "Render smooth slide transitions into animated video formats for Instagram and TikTok.",
  },
  {
    id: "r4",
    title: "Custom Brand Watermarks & Logo Stamps",
    category: "Brand",
    status: "in_progress",
    description:
      "Apply custom handles and logo watermarks across all slides automatically.",
  },

  // NEXT UP
  {
    id: "r5",
    title: "16:9 Laptop & Phone Device Mockups",
    category: "Mockups",
    status: "next_up",
    description:
      "Place screenshot captures inside realistic MacBook and iPhone frame templates.",
  },
  {
    id: "r6",
    title: "AI Voiceover Slide Narration",
    category: "Audio",
    status: "next_up",
    description:
      "Generate synchronized natural AI voiceovers matching slide text.",
  },
  {
    id: "r7",
    title: "Chrome Extension (1-Click Thread to Carousel)",
    category: "Extension",
    status: "next_up",
    description:
      "Turn any tweet thread or blog article into an editable carousel in your browser.",
  },
  {
    id: "r8",
    title: "Custom Font Upload (.woff2 / .ttf)",
    category: "Typography",
    status: "next_up",
    description:
      "Upload brand typography with custom kerning and styling controls.",
  },

  // BACKLOG
  {
    id: "r9",
    title: "MCP Server Tool Integration",
    category: "Developer",
    status: "backlog",
    description:
      "Create and edit SingleClick carousels from AI agents and Claude Desktop.",
  },
  {
    id: "r10",
    title: "Cloud Drive Auto-Sync",
    category: "Storage",
    status: "backlog",
    description:
      "Sync exported slide bundles directly with Google Drive and Dropbox.",
  },
  {
    id: "r11",
    title: "Figma to SingleClick Plugin",
    category: "Design",
    status: "backlog",
    description:
      "Import Figma frames as slides and export carousel layers back to Figma.",
  },

  // DONE
  {
    id: "r12",
    title: "Visual Slide Canvas Editor",
    category: "Core",
    status: "done",
    description:
      "Full drag-and-drop slide manipulation, styling, and live canvas editing.",
  },
  {
    id: "r13",
    title: "AI Prompt-to-Carousel Generator",
    category: "Core",
    status: "done",
    description:
      "Turn text prompts into structured multi-slide social carousels.",
  },
  {
    id: "r14",
    title: "High-Resolution PNG, PDF & ZIP Exporter",
    category: "Export",
    status: "done",
    description:
      "Batch download slides as high-DPI PNG images, PDF document, or ZIP file.",
  },
  {
    id: "r15",
    title: "Multi-Platform Aspect Presets",
    category: "Presets",
    status: "done",
    description:
      "Dimensions for LinkedIn (4:5), Instagram (1:1), X (16:9), and Stories (9:16).",
  },
];

const changelogEntries = [
  {
    version: "v1.4.0",
    date: "August 16, 2026",
    title: "Social Media Platform Marquee & Auto-Publishing",
    description:
      "Added multi-platform preset dimensions, unified social publishing architecture, and our brand-new Lazy Cat branding.",
    items: [
      "Direct publishing connection panel for LinkedIn, X, Instagram, and Threads.",
      "Interactive platform presets ribbon with instant aspect ratio toggles.",
      "Upgraded AI generation engine with improved slide headline punchiness.",
      "Fixed text wrapping overflow on smaller mobile screens.",
    ],
  },
  {
    version: "v1.3.2",
    date: "August 9, 2026",
    title: "Enhanced Visual Editor & Alignment Guides",
    description:
      "Smoother canvas interaction with snap-to-grid guidelines and custom color gradients.",
    items: [
      "Snap-to-center guidelines when moving shapes and text blocks.",
      "Radial gradient background picker with opacity controls.",
      "Mobile guard preview for responsive slide testing.",
    ],
  },
  {
    version: "v1.2.0",
    date: "July 31, 2026",
    title: "High-Res PDF & ZIP Batch Exporting",
    description:
      "Export complete 10-slide carousels in under 2 seconds with client-side zero-latency processing.",
    items: [
      "One-click ZIP download containing sequentially numbered PNG slides.",
      "PDF document export formatted for LinkedIn carousels.",
      "3x faster canvas image rasterization.",
    ],
  },
  {
    version: "v1.0.0",
    date: "July 15, 2026",
    title: "Public Launch of SingleClick",
    description:
      "Turn ideas into published social carousels without complex design tools.",
    items: [
      "AI Carousel generator powered by structured prompt workflows.",
      "Visual editor with typography, badges, and quote styles.",
      "Cloud saves and responsive builder canvas.",
    ],
  },
];

function UpdatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const tabParam = searchParams.get("tab") as TabType | null;
  const initialTab: TabType =
    tabParam === "changelog" || tabParam === "roadmap" ? tabParam : "roadmap";

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [items] = useState<RoadmapItem[]>(initialRoadmapItems);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tabParam && (tabParam === "roadmap" || tabParam === "changelog")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    startTransition(() => {
      router.push(`/updates?tab=${tab}`, { scroll: false });
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns: {
    status: RoadmapItem["status"];
    label: string;
    icon: React.ReactNode;
    badgeStyle: string;
  }[] = [
    {
      status: "backlog",
      label: "Backlog",
      icon: <Compass size={14} className="text-zinc-500" />,
      badgeStyle: "bg-zinc-100 text-zinc-600 border border-black/5",
    },
    {
      status: "next_up",
      label: "Next up",
      icon: <Clock size={14} className="text-purple-600" />,
      badgeStyle: "bg-purple-50 text-purple-700 border border-purple-200/60",
    },
    {
      status: "in_progress",
      label: "In Progress",
      icon: <Flame size={14} className="text-blue-600" />,
      badgeStyle: "bg-blue-50 text-blue-700 border border-blue-200/60",
    },
    {
      status: "done",
      label: "Shipped",
      icon: <CheckCircle2 size={14} className="text-emerald-600" />,
      badgeStyle: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
            >
              <AnimatedLogo size={22} />

              <span className="text-sm font-bold tracking-tight text-black">
                SingleClick
              </span>
            </Link>

            {/* Segmented Navigation Tabs: Roadmap & Changelog */}
            <div className="flex items-center rounded-xl border border-black/10 bg-black/[0.03] p-1 gap-x-1">
              <button
                onClick={() => handleTabChange("roadmap")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "roadmap"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                <Compass size={13} />
                <span>Roadmap</span>
              </button>

              <button
                onClick={() => handleTabChange("changelog")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "changelog"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                <History size={13} />
                <span>Changelog</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-black/85"
            >
              <span>Open Studio</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        {/* =================================================================== */}
        {/* TAB 1: ROADMAP KANBAN BOARD                                         */}
        {/* =================================================================== */}
        {activeTab === "roadmap" && (
          <div className="animate-page-enter space-y-8">
            {/* Header copy & search */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Product Roadmap
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500">
                  What we&apos;re currently working on and shipping next.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white py-2 pr-3 pl-8 text-xs text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {columns.map((col) => {
                const colItems = filteredItems.filter(
                  (item) => item.status === col.status,
                );

                return (
                  <div
                    key={col.status}
                    className="flex flex-col rounded-2xl border border-black/[0.08] bg-black/[0.015] p-3.5"
                  >
                    {/* Column Header */}
                    <div className="mb-3.5 flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                      <div className="flex items-center gap-2">
                        {col.icon}
                        <h2 className="text-xs font-semibold tracking-tight text-zinc-900">
                          {col.label}
                        </h2>
                      </div>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${col.badgeStyle}`}
                      >
                        {colItems.length}
                      </span>
                    </div>

                    {/* Column Item Cards (Clean, No Upvote Buttons, No Icons clutter) */}
                    <div className="space-y-2.5">
                      {colItems.map((item) => (
                        <div
                          key={item.id}
                          className="group rounded-xl border border-black/[0.08] bg-white p-3.5 shadow-2xs transition-all duration-200 hover:border-black/25 hover:shadow-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xs leading-snug font-semibold text-zinc-900">
                              {item.title}
                            </h3>

                            <span className="shrink-0 rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[9px] font-medium text-zinc-600">
                              {item.category}
                            </span>
                          </div>

                          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                            {item.description}
                          </p>
                        </div>
                      ))}

                      {colItems.length === 0 && (
                        <div className="rounded-xl border border-dashed border-black/10 py-6 text-center text-xs text-zinc-400">
                          No features in this status
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: CHANGELOG TIMELINE                                           */}
        {/* =================================================================== */}
        {activeTab === "changelog" && (
          <div className="animate-page-enter mx-auto max-w-2xl space-y-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Changelog
              </h1>
              <p className="mt-1.5 text-sm text-zinc-500">
                The latest feature releases and updates to SingleClick.
              </p>
            </div>

            <div className="space-y-8 border-l border-black/10 pl-6">
              {changelogEntries.map((entry) => (
                <div key={entry.version} className="group relative">
                  {/* Timeline dot */}
                  <span className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full border-2 border-white bg-black transition-transform group-hover:scale-125" />

                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-black px-2 py-0.5 text-[10px] font-bold text-white">
                      {entry.version}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">
                      {entry.date}
                    </span>
                  </div>

                  <h2 className="mt-2 text-base font-bold text-zinc-900">
                    {entry.title}
                  </h2>

                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {entry.description}
                  </p>

                  <ul className="mt-3.5 space-y-1.5 rounded-xl border border-black/[0.08] bg-white p-4 text-xs text-zinc-700 shadow-2xs">
                    {entry.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 leading-relaxed"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-black/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function UpdatesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-black">
          <div className="animate-pulse text-xs text-zinc-400">
            Loading updates...
          </div>
        </div>
      }
    >
      <UpdatesContent />
    </Suspense>
  );
}
