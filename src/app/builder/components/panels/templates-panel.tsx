"use client";

import { useBuilder } from "../../context";
import type { Theme } from "../../types";
import { cn } from "~/lib/utils";

const PRESET_THEMES: Theme[] = [
  {
    id: "minimal",
    name: "Minimal",
    colors: { primary: "#0A0A0A", secondary: "#FFFFFF", background: "#0A0A0A", text: "#FFFFFF", accent: "#3B82F6", muted: "#6B7280" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "monospace" },
  },
  {
    id: "developer",
    name: "Developer",
    colors: { primary: "#1E1E2E", secondary: "#CDD6F4", background: "#1E1E2E", text: "#CDD6F4", accent: "#89B4FA", muted: "#6C7086" },
    fonts: { heading: "monospace", body: "monospace", code: "monospace" },
  },
  {
    id: "editorial",
    name: "Editorial",
    colors: { primary: "#FAF3E0", secondary: "#1A1A1A", background: "#FAF3E0", text: "#1A1A1A", accent: "#C9A45C", muted: "#8B8680" },
    fonts: { heading: "Georgia, serif", body: "Georgia, serif", code: "monospace" },
  },
  {
    id: "gradient-ocean",
    name: "Ocean",
    colors: { primary: "#0F172A", secondary: "#E2E8F0", background: "#0F172A", text: "#E2E8F0", accent: "#38BDF8", muted: "#64748B" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "monospace" },
  },
  {
    id: "dark",
    name: "Dark",
    colors: { primary: "#000000", secondary: "#FAFAFA", background: "#000000", text: "#FAFAFA", accent: "#A855F7", muted: "#71717A" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "monospace" },
  },
  {
    id: "light",
    name: "Light",
    colors: { primary: "#FFFFFF", secondary: "#09090B", background: "#FFFFFF", text: "#09090B", accent: "#2563EB", muted: "#A1A1AA" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "monospace" },
  },
  {
    id: "technical",
    name: "Technical",
    colors: { primary: "#0D1117", secondary: "#C9D1D9", background: "#0D1117", text: "#C9D1D9", accent: "#58A6FF", muted: "#8B949E" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "JetBrains Mono, monospace" },
  },
  {
    id: "bold",
    name: "Bold",
    colors: { primary: "#EF4444", secondary: "#FFFFFF", background: "#EF4444", text: "#FFFFFF", accent: "#FCD34D", muted: "#FCA5A5" },
    fonts: { heading: "Inter, sans-serif", body: "Inter, sans-serif", code: "monospace" },
  },
];

export function TemplatesPanel() {
  const { state, dispatch } = useBuilder();

  const handleApplyTheme = (theme: Theme) => {
    dispatch({ type: "SET_THEME", payload: { theme } });

    // Update all slides' backgrounds to match theme
    state.slides.forEach((slide, i) => {
      dispatch({
        type: "UPDATE_SLIDE",
        payload: {
          index: i,
          slide: {
            background: { type: "solid", color: theme.colors.background },
          },
        },
      });
    });

    // Update text colors for all elements across all slides
    state.slides.forEach((slide, i) => {
      slide.elements.forEach((el) => {
        if (el.type === "text" || el.type === "watermark" || el.type === "code") {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              id: el.id,
              updates: { color: theme.colors.text } as any,
            },
          });
        }
      });
    });
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Templates
      </h4>

      <div className="grid grid-cols-2 gap-2">
        {PRESET_THEMES.map((theme) => (
          <button
            key={theme.id}
            className={cn(
              "rounded-lg border-2 overflow-hidden transition-all hover:shadow-md",
              state.theme.id === theme.id ? "border-primary" : "border-transparent hover:border-muted-foreground/20",
            )}
            onClick={() => handleApplyTheme(theme)}
          >
            <div
              className="aspect-[4/5] p-3 flex flex-col items-center justify-center gap-1.5"
              style={{ backgroundColor: theme.colors.background }}
            >
              <div
                className="text-xs font-bold truncate w-full text-center"
                style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
              >
                {theme.name}
              </div>
              <div className="flex gap-1">
                {[theme.colors.primary, theme.colors.accent, theme.colors.muted].map((c, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-white/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
