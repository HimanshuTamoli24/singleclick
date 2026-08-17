import Link from "next/link";
import { Plus, ArrowLeft, Home } from "lucide-react";
import { AnimatedLogo } from "~/components/ui/animated-logo";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-white px-6 py-8 text-black sm:px-12 sm:py-12 dark:bg-zinc-950 dark:text-white">
      {/* Top Left Header Copy (Exactly as in Reference Image) */}
      <header className="z-20 max-w-md">
        <h1 className="text-xl font-bold tracking-tight text-black sm:text-2xl dark:text-white">
          We&apos;re not sure what happened there sorry!
        </h1>
        <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Check for typos, try again?
        </p>
      </header>

      {/* Center 404 Illustration with Glowing Orb & Cat Silhouette */}
      <div className="relative my-auto flex w-full items-center justify-center py-10">
        <div className="relative flex items-center justify-center select-none">
          {/* Big Bold "404" Background Numbers */}
          <div className="text-[140px] font-extrabold tracking-tighter text-zinc-300 sm:text-[220px] md:text-[260px] dark:text-zinc-800">
            404
          </div>

          {/* Ethereal Misty Glowing Orb Behind the Cat's Head */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%]">
            <div className="relative h-44 w-44 rounded-full sm:h-56 sm:w-56">
              {/* Outer soft halo */}
              <div className="absolute inset-0 rounded-full border border-black/10 bg-radial from-black/25 via-black/10 to-transparent blur-xl dark:border-white/10 dark:from-white/20 dark:via-white/5" />
              {/* Inner misty core */}
              <div className="absolute inset-2 rounded-full bg-radial from-black/40 via-black/15 to-transparent blur-md dark:from-white/30 dark:via-white/10" />
            </div>
          </div>

          {/* Cat Silhouette Looking Up Into The Portal */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[10%]">
            <svg
              viewBox="0 0 200 240"
              className="h-44 w-auto drop-shadow-md sm:h-64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cat Back & Body Silhouette */}
              <path
                d="M 68 240 
                   C 68 200 70 170 82 140 
                   C 88 125 90 115 88 95 
                   C 85 85 82 82 82 72 
                   C 82 62 86 54 94 50 
                   L 92 38 
                   L 102 46 
                   C 106 45 114 45 118 46 
                   L 128 38 
                   L 126 50 
                   C 134 54 138 62 138 72 
                   C 138 82 135 85 132 95 
                   C 130 115 132 125 138 140 
                   C 150 170 152 200 152 240 
                   Z"
                className="fill-zinc-950 dark:fill-zinc-100"
              />

              {/* Cat Left Curled Upward Tail */}
              <path
                d="M 72 230 
                   C 60 228 48 220 42 205 
                   C 36 190 38 170 46 150 
                   C 48 144 54 148 52 154 
                   C 46 170 44 186 50 198 
                   C 54 208 62 216 72 220 
                   Z"
                className="fill-zinc-950 dark:fill-zinc-100"
              />

              {/* Second subtle tail swish curl line */}
              <path
                d="M 62 222 
                   C 54 214 50 200 52 186 
                   C 54 176 56 166 60 156 
                   C 62 152 66 154 64 158 
                   C 60 168 58 178 57 186 
                   C 56 196 58 206 64 214 
                   Z"
                className="fill-zinc-950 dark:fill-zinc-100"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <footer className="z-20 flex items-center justify-between pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Home size={14} />
          <span>Return Home</span>
        </Link>
        <Link
          href="/builder"
          className="flex items-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus size={14} />
          <span>Create Post</span>
        </Link>
      </footer>
    </main>
  );
}
