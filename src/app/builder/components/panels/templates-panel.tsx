"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PRESET_THEMES } from "~/constant/bg-templates";
import { useBuilder } from "../../context";
import type { Theme, Background } from "../../types";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

export function TemplatesPanel() {
  const { state, dispatch } = useBuilder();
  const [search, setSearch] = useState("");

  const filteredThemes = useMemo(() => {
    if (!search.trim()) return PRESET_THEMES;
    const q = search.toLowerCase().trim();
    return PRESET_THEMES.filter(
      (t) => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q),
    );
  }, [search]);

  const handleApplyTheme = (theme: Theme) => {
    dispatch({ type: "SET_THEME", payload: { theme } });

    // Determine whether background is gradient/mesh/complex or solid
    const isComplexBg =
      theme.colors.background.includes("gradient") ||
      theme.colors.background.includes(",");

    const newBg: Background = isComplexBg
      ? {
          type: "preset",
          presetId: `template-${theme.id}`,
          name: theme.name,
          style: { background: theme.colors.background },
        }
      : {
          type: "solid",
          color: theme.colors.background,
        };

    // Update all slides' backgrounds to match theme
    state.slides.forEach((slide, i) => {
      dispatch({
        type: "UPDATE_SLIDE",
        payload: {
          index: i,
          slide: {
            background: newBg,
          },
        },
      });
    });

    // Update text colors for all elements across all slides
    state.slides.forEach((slide) => {
      slide.elements.forEach((el) => {
        if (
          el.type === "text" ||
          el.type === "watermark" ||
          el.type === "code"
        ) {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              id: el.id,
              updates: { color: theme.colors.text },
            },
          });
        }
      });
    });
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}

      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pr-8 pl-8 text-xs"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {PRESET_THEMES.length} items
        </InputGroupAddon>
      </InputGroup>

      <div className="grid grid-cols-2 gap-2 pb-4">
        {filteredThemes.map((theme) => {
          const isSelected = state.theme.id === theme.id;
          return (
            <button
              key={theme.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-lg border-2 text-left transition-all hover:scale-[1.02] hover:shadow-md",
                isSelected
                  ? "border-primary ring-primary/30 shadow-md ring-2"
                  : "border-border hover:border-muted-foreground/30",
              )}
              onClick={() => handleApplyTheme(theme)}
            >
              <div
                className="relative flex aspect-[4/5] flex-col items-center justify-between overflow-hidden p-3"
                style={{ background: theme.colors.background }}
              >
                <div className="w-full text-center">
                  <div
                    className="truncate text-xs font-bold drop-shadow-xs"
                    style={{
                      color: theme.colors.text,
                      fontFamily: theme.fonts.heading,
                    }}
                  >
                    {theme.name}
                  </div>
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-xs">
                  {[
                    theme.colors.primary,
                    theme.colors.accent,
                    theme.colors.muted,
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="h-2.5 w-2.5 rounded-full border border-white/20 shadow-xs"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
