"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export function AnimatedLogo({
  size = 36,
  className,
  ...props
}: AnimatedLogoProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center select-none",
        className,
      )}
      style={{ width: size, height: size }}
      title="SingleClick - Lazy Cat"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full text-zinc-950 transition-transform duration-500 ease-out group-hover:scale-110 dark:text-zinc-50"
        {...props}
      >
        <defs>
          <style>
            {`
              /* Lazy tail swish & curl animation */
              @keyframes lazy-tail-swish {
                0% {
                  transform: rotate(0deg);
                }
                25% {
                  transform: rotate(-18deg) scaleY(0.92);
                }
                50% {
                  transform: rotate(12deg) scaleY(1.05);
                }
                75% {
                  transform: rotate(-8deg) scaleY(0.96);
                }
                100% {
                  transform: rotate(0deg);
                }
              }

              /* Tail tip extra wave lag */
              @keyframes lazy-tail-tip {
                0%, 100% {
                  transform: rotate(0deg);
                }
                30% {
                  transform: rotate(24deg);
                }
                70% {
                  transform: rotate(-18deg);
                }
              }

              /* Gentle sleeping breathing rise and fall */
              @keyframes lazy-cat-breathe {
                0%, 100% {
                  transform: scaleY(1) translateY(0px);
                }
                50% {
                  transform: scaleY(1.04) translateY(-1px);
                }
              }

              /* Ear twitch animation */
              @keyframes lazy-ear-flick {
                0%, 88%, 100% {
                  transform: rotate(0deg);
                }
                92% {
                  transform: rotate(-10deg);
                }
                96% {
                  transform: rotate(4deg);
                }
              }

              /* Micro floating Zzz sleeping animation */
              @keyframes float-zzz {
                0% {
                  transform: translate(0, 0) scale(0.6);
                  opacity: 0;
                }
                40% {
                  opacity: 0.75;
                }
                80% {
                  transform: translate(6px, -12px) scale(1);
                  opacity: 0.4;
                }
                100% {
                  transform: translate(10px, -18px) scale(1.1);
                  opacity: 0;
                }
              }

              .lazy-tail-root {
                transform-origin: 32px 58px;
                animation: lazy-tail-swish 3.6s ease-in-out infinite;
              }

              .group:hover .lazy-tail-root {
                animation-duration: 1.4s;
              }

              .lazy-tail-end {
                transform-origin: 18px 46px;
                animation: lazy-tail-tip 3.6s ease-in-out infinite;
              }

              .group:hover .lazy-tail-end {
                animation-duration: 1.4s;
              }

              .lazy-body-breathe {
                transform-origin: 55px 68px;
                animation: lazy-cat-breathe 3.2s ease-in-out infinite;
              }

              .lazy-ear-twitch {
                transform-origin: 72px 48px;
                animation: lazy-ear-flick 4.5s ease-in-out infinite;
              }

              .zzz-1 {
                transform-origin: 78px 44px;
                animation: float-zzz 3.4s ease-out infinite 0.2s;
              }

              .zzz-2 {
                transform-origin: 82px 40px;
                animation: float-zzz 3.4s ease-out infinite 1.8s;
              }
            `}
          </style>
        </defs>

        {/* Minimalist flat ground line / surface shadow */}
        <ellipse
          cx="55"
          cy="70"
          rx="38"
          ry="3"
          className="fill-black/10 dark:fill-white/10"
        />

        {/* ========================================================== */}
        {/* LAZY CAT TAIL (Extends out back and swishes lazily)        */}
        {/* ========================================================== */}
        <g className="lazy-tail-root">
          {/* Main tail base curve */}
          <path
            d="M 34 59 C 26 59 18 52 18 44 C 18 36 24 32 26 28 C 27 26 26 24 23 25 C 18 27 12 34 12 44 C 12 56 22 65 34 65 Z"
            fill="currentColor"
          />

          {/* Tail tip with secondary organic lag */}
          <g className="lazy-tail-end">
            <circle cx="23" cy="26" r="3.2" fill="currentColor" />
          </g>
        </g>

        {/* ========================================================== */}
        {/* LAZY CAT BODY & HEAD (Lying melted/flat on ground)          */}
        {/* ========================================================== */}
        <g className="lazy-body-breathe">
          {/* Main Flat Cat Body (Melted loaf contour) */}
          <path
            d="M 32 68 
               C 28 68 28 58 34 54 
               C 40 48 46 45 56 45 
               C 66 45 74 48 80 53 
               C 85 57 86 63 86 67 
               C 86 69 82 69 80 69 
               C 74 69 42 69 32 68 Z"
            fill="currentColor"
          />

          {/* Left Back Haunch / Hip Line Contour (Negative space highlight) */}
          <path
            d="M 35 66 C 36 57 44 54 48 57"
            fill="none"
            className="stroke-white/40 dark:stroke-black/40"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Front Paws stretched flat under chin */}
          <ellipse cx="83" cy="68" rx="5.5" ry="2.6" fill="currentColor" />
          <ellipse cx="75" cy="68" rx="6" ry="2.6" fill="currentColor" />

          {/* Back relaxed paw peeking */}
          <ellipse cx="34" cy="68" rx="4.5" ry="2.4" fill="currentColor" />

          {/* Ear 1 (Back ear resting flat) */}
          <path d="M 68 47 L 64 39 L 73 45 Z" fill="currentColor" />

          {/* Ear 2 (Front ear with gentle twitch) */}
          <g className="lazy-ear-twitch">
            <path d="M 73 46 L 73 37 L 80 44 Z" fill="currentColor" />
            <path
              d="M 74 44 L 74 39 L 78 43 Z"
              className="fill-white dark:fill-zinc-950"
              opacity="0.8"
            />
          </g>

          {/* Sleeping Closed Happy Eye (Curved slit on flat resting face) */}
          <path
            d="M 76 56 Q 79 58 82 56"
            fill="none"
            className="stroke-white dark:stroke-zinc-950"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Cute Tiny Nose */}
          <circle
            cx="84"
            cy="58"
            r="1"
            className="fill-white dark:fill-zinc-950"
          />

          {/* Relaxed Whisker Lines */}
          <line
            x1="84"
            y1="59"
            x2="90"
            y2="58"
            className="stroke-white dark:stroke-zinc-950"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="83"
            y1="60.5"
            x2="89"
            y2="62"
            className="stroke-white dark:stroke-zinc-950"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* ========================================================== */}
        {/* CUTE FLOATING SLEEPING 'Zzz'                               */}
        {/* ========================================================== */}
        <g className="pointer-events-none">
          <text
            x="80"
            y="42"
            className="zzz-1 fill-current text-[8px] font-bold"
            opacity="0.6"
          >
            z
          </text>
          <text
            x="85"
            y="36"
            className="zzz-2 fill-current text-[6px] font-bold"
            opacity="0.5"
          >
            z
          </text>
        </g>
      </svg>
    </div>
  );
}

export default AnimatedLogo;
