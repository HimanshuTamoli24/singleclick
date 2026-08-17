import { AnimatedLogo } from "~/components/ui/animated-logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black transition-colors dark:bg-zinc-950 dark:text-white">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Brand Logo */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-xl dark:bg-white/10" />
          <AnimatedLogo size={52} />
        </div>

        {/* Minimalist Loading Bar */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-1 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-full origin-left animate-[marquee_1.4s_ease-in-out_infinite] rounded-full bg-black dark:bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
