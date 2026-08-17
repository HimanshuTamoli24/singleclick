"use client";

import { useState, useMemo } from "react";
import { useBuilder } from "../../context";
import type { Background, GradientType, PatternType } from "../../types";
import { gridPatterns } from "~/constant/bg-patterns";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Search, CopyCheck } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

type SubPanel = "solid" | "gradient" | "image";

export function BackgroundPanel() {
  const { state, dispatch, activeSlide } = useBuilder();
  const [subPanel, setSubPanel] = useState<SubPanel>(
    activeSlide?.background.type === "gradient" ||
      activeSlide?.background.type === "preset"
      ? "gradient"
      : activeSlide?.background.type === "image"
        ? "image"
        : "solid",
  );

  const [patternSearch, setPatternSearch] = useState("");
  const [gradientMode, setGradientMode] = useState<"presets" | "custom">(
    "presets",
  );

  // Filtered patterns from bg-patterns.ts (all patterns in one unified list)
  const filteredPatterns = useMemo(() => {
    if (!patternSearch.trim()) return gridPatterns;
    const query = patternSearch.toLowerCase().trim();
    return gridPatterns.filter(
      (pattern) =>
        pattern.name.toLowerCase().includes(query) ||
        pattern.id.toLowerCase().includes(query),
    );
  }, [patternSearch]);

  if (!activeSlide) return null;

  const updateBg = (bg: Background) => {
    dispatch({ type: "SET_BACKGROUND", payload: { background: bg } });
  };

  const applyToAllSlides = () => {
    const currentBg = activeSlide.background;
    state.slides.forEach((_, i) => {
      dispatch({
        type: "UPDATE_SLIDE",
        payload: {
          index: i,
          slide: { background: currentBg },
        },
      });
    });
  };

  const activeColor =
    activeSlide.background.type === "solid"
      ? activeSlide.background.color
      : activeSlide.background.type === "pattern"
        ? activeSlide.background.backgroundColor
        : "#0A0A0A";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Background
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-6 gap-1 px-1.5 text-[11px]"
          onClick={applyToAllSlides}
          title="Apply current background to all slides"
        >
          <CopyCheck className="h-3 w-3" />
          Apply All
        </Button>
      </div>

      {/* Sub-panel tabs */}
      <div className="grid grid-cols-3 gap-1">
        {(["solid", "gradient", "image"] as SubPanel[]).map((p) => (
          <Button
            key={p}
            variant={subPanel === p ? "secondary" : "ghost"}
            size="sm"
            className="h-7 text-xs capitalize"
            onClick={() => setSubPanel(p)}
          >
            {p === "solid" ? "Solid" : p === "gradient" ? "Gradients" : "Image"}
          </Button>
        ))}
      </div>

      {/* Solid & Pattern Sub-panel */}
      {subPanel === "solid" && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={activeColor}
                onChange={(e) => {
                  if (activeSlide.background.type === "pattern") {
                    updateBg({
                      ...activeSlide.background,
                      backgroundColor: e.target.value,
                    });
                  } else {
                    updateBg({ type: "solid", color: e.target.value });
                  }
                }}
                className="h-8 w-8 cursor-pointer rounded border-0 p-0"
              />
              <Input
                value={activeColor}
                onChange={(e) => {
                  if (activeSlide.background.type === "pattern") {
                    updateBg({
                      ...activeSlide.background,
                      backgroundColor: e.target.value,
                    });
                  } else {
                    updateBg({ type: "solid", color: e.target.value });
                  }
                }}
                className="h-8 font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Quick color swatches */}
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Palettes</Label>
            <div className="grid grid-cols-6 gap-1.5">
              {[
                "#0A0A0A",
                "#FFFFFF",
                "#1E1E2E",
                "#0F172A",
                "#18181B",
                "#312E81",
                "#7C3AED",
                "#2563EB",
                "#059669",
                "#DC2626",
                "#D97706",
                "#EC4899",
                "#FAF5FF",
                "#F0FDF4",
                "#FFF7ED",
                "#EFF6FF",
                "#F8FAFC",
                "#FEF2F2",
              ].map((c) => (
                <button
                  key={c}
                  className={cn(
                    "aspect-square w-full cursor-pointer rounded-md border transition-transform hover:scale-110",
                    activeColor === c && "ring-primary ring-2 ring-offset-1",
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    if (activeSlide.background.type === "pattern") {
                      updateBg({
                        ...activeSlide.background,
                        backgroundColor: c,
                      });
                    } else {
                      updateBg({ type: "solid", color: c });
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Pattern Overlay inside Solid tab */}
          <div className="space-y-2 border-t pt-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Pattern Overlay</Label>
              {activeSlide.background.type === "pattern" && (
                <span className="text-primary text-[10px] font-medium capitalize">
                  {activeSlide.background.pattern}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1">
              <Button
                variant={
                  activeSlide.background.type === "solid"
                    ? "secondary"
                    : "outline"
                }
                size="sm"
                className="h-7 text-[10px]"
                onClick={() =>
                  updateBg({
                    type: "solid",
                    color: activeColor,
                  })
                }
              >
                None
              </Button>
              {(
                [
                  "dots",
                  "grid",
                  "diagonal",
                  "cross",
                  "waves",
                  "mesh",
                ] as PatternType[]
              ).map((p) => {
                const isPatternActive =
                  activeSlide.background.type === "pattern" &&
                  activeSlide.background.pattern === p;
                return (
                  <Button
                    key={p}
                    variant={isPatternActive ? "secondary" : "outline"}
                    size="sm"
                    className="h-7 text-[10px] capitalize"
                    onClick={() =>
                      updateBg({
                        type: "pattern",
                        pattern: p,
                        patternColor:
                          activeSlide.background.type === "pattern"
                            ? activeSlide.background.patternColor
                            : "#FFFFFF",
                        backgroundColor: activeColor,
                        opacity:
                          activeSlide.background.type === "pattern"
                            ? activeSlide.background.opacity
                            : 0.25,
                        size:
                          activeSlide.background.type === "pattern"
                            ? activeSlide.background.size
                            : 20,
                        rotation: 0,
                      })
                    }
                  >
                    {p}
                  </Button>
                );
              })}
            </div>

            {/* Pattern Customization when pattern active */}
            {activeSlide.background.type === "pattern" &&
              (() => {
                const bg = activeSlide.background;
                return (
                  <div className="bg-muted/20 mt-2 space-y-2.5 rounded-lg border p-2">
                    <div className="space-y-1">
                      <Label className="text-[11px]">Pattern Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bg.patternColor}
                          onChange={(e) =>
                            updateBg({
                              ...bg,
                              patternColor: e.target.value,
                            })
                          }
                          className="h-6 w-6 cursor-pointer rounded border-0 p-0"
                        />
                        <span className="text-muted-foreground font-mono text-[10px]">
                          {bg.patternColor}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <Label className="text-[11px]">Opacity</Label>
                        <span className="text-muted-foreground">
                          {Math.round(bg.opacity * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[bg.opacity * 100]}
                        onValueChange={(val) => {
                          const v = Array.isArray(val) ? val[0] : val;
                          updateBg({
                            ...bg,
                            opacity: (v ?? 25) / 100,
                          });
                        }}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <Label className="text-[11px]">Size</Label>
                        <span className="text-muted-foreground">
                          {bg.size}px
                        </span>
                      </div>
                      <Slider
                        value={[bg.size]}
                        onValueChange={(val) => {
                          const v = Array.isArray(val) ? val[0] : val;
                          updateBg({
                            ...bg,
                            size: v ?? 20,
                          });
                        }}
                        min={5}
                        max={60}
                        step={1}
                      />
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
      )}

      {/* Gradient & Patterns Sub-panel */}
      {subPanel === "gradient" && (
        <div className="space-y-3">
          {/* Mode Toggle: Presets vs Custom */}
          <div className="bg-muted/40 flex rounded-lg border p-0.5">
            <button
              className={cn(
                "flex-1 rounded-md py-1 text-xs font-medium transition-all",
                gradientMode === "presets"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setGradientMode("presets")}
            >
              Gradients ({gridPatterns.length})
            </button>
            <button
              className={cn(
                "flex-1 rounded-md py-1 text-xs font-medium transition-all",
                gradientMode === "custom"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setGradientMode("custom")}
            >
              Custom Gradient
            </button>
          </div>

          {gradientMode === "presets" ? (
            <div className="space-y-2.5">
              {/* Search Bar */}

              <InputGroup className="max-w-xs">
                <InputGroupInput
                  placeholder="Search gradients..."
                  value={patternSearch}
                  onChange={(e) => setPatternSearch(e.target.value)}
                  className="h-7 pl-7 text-xs"
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  {gridPatterns.length} items
                </InputGroupAddon>
              </InputGroup>

              {/* Pattern Presets Grid */}
              <div className="grid max-h-[340px] grid-cols-2 gap-2 overflow-y-auto p-0.5">
                {filteredPatterns.map((pattern) => {
                  const isSelected =
                    activeSlide.background.type === "preset" &&
                    activeSlide.background.presetId === pattern.id;

                  return (
                    <button
                      key={pattern.id}
                      className={cn(
                        "group flex flex-col overflow-hidden rounded-lg border text-left transition-all hover:scale-[1.01] hover:shadow-xs",
                        isSelected
                          ? "ring-primary border-primary ring-0.5 shadow-sm"
                          : "border-border hover:border-muted-foreground/30",
                      )}
                      onClick={() =>
                        updateBg({
                          type: "preset",
                          presetId: pattern.id,
                          name: pattern.name,
                          style: pattern.style,
                        })
                      }
                      title={pattern.name}
                    >
                      {/* Swatch Preview */}
                      <div
                        className="relative aspect-[16/10] w-full overflow-hidden rounded-t-sm"
                        style={{ ...pattern.style }}
                      />

                      {/* Name label */}
                      <div className="bg-background p-1.5">
                        <div className="text-foreground mx-2 flex items-center justify-center truncate text-[8px] font-medium">
                          {pattern.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredPatterns.length === 0 && (
                <div className="text-muted-foreground py-6 text-center text-xs">
                  No patterns match your search.
                </div>
              )}
            </div>
          ) : (
            /* Custom Gradient Controls */
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Color 1</Label>
                <input
                  type="color"
                  value={
                    activeSlide.background.type === "gradient"
                      ? (activeSlide.background.colors[0] ?? "#667EEA")
                      : "#667EEA"
                  }
                  onChange={(e) => {
                    const bg =
                      activeSlide.background.type === "gradient"
                        ? activeSlide.background
                        : {
                            type: "gradient" as const,
                            gradientType: "linear" as GradientType,
                            colors: ["#667EEA", "#764BA2"],
                            angle: 135,
                          };
                    updateBg({
                      type: "gradient",
                      gradientType: bg.gradientType,
                      colors: [e.target.value, ...bg.colors.slice(1)],
                      angle: bg.angle,
                    });
                  }}
                  className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Color 2</Label>
                <input
                  type="color"
                  value={
                    activeSlide.background.type === "gradient"
                      ? (activeSlide.background.colors[1] ?? "#764BA2")
                      : "#764BA2"
                  }
                  onChange={(e) => {
                    const bg =
                      activeSlide.background.type === "gradient"
                        ? activeSlide.background
                        : {
                            type: "gradient" as const,
                            gradientType: "linear" as GradientType,
                            colors: ["#667EEA", "#764BA2"],
                            angle: 135,
                          };
                    const colors = [...bg.colors];
                    colors[1] = e.target.value;
                    updateBg({
                      type: "gradient",
                      gradientType: bg.gradientType,
                      colors,
                      angle: bg.angle,
                    });
                  }}
                  className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Angle</Label>
                <Slider
                  value={[
                    activeSlide.background.type === "gradient"
                      ? activeSlide.background.angle
                      : 135,
                  ]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    const bg =
                      activeSlide.background.type === "gradient"
                        ? activeSlide.background
                        : {
                            type: "gradient" as const,
                            gradientType: "linear" as GradientType,
                            colors: ["#667EEA", "#764BA2"],
                            angle: 135,
                          };
                    updateBg({
                      type: "gradient",
                      gradientType: bg.gradientType,
                      colors: bg.colors,
                      angle: v ?? 135,
                    });
                  }}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Type</Label>
                <div className="flex gap-1">
                  {(["linear", "radial"] as GradientType[]).map((t) => (
                    <Button
                      key={t}
                      variant={
                        activeSlide.background.type === "gradient" &&
                        activeSlide.background.gradientType === t
                          ? "secondary"
                          : "ghost"
                      }
                      size="sm"
                      className="h-7 flex-1 text-xs capitalize"
                      onClick={() => {
                        const bg =
                          activeSlide.background.type === "gradient"
                            ? activeSlide.background
                            : {
                                type: "gradient" as const,
                                gradientType: "linear" as GradientType,
                                colors: ["#667EEA", "#764BA2"],
                                angle: 135,
                              };
                        updateBg({
                          type: "gradient",
                          gradientType: t,
                          colors: bg.colors,
                          angle: bg.angle,
                        });
                      }}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Sub-panel */}
      {subPanel === "image" && (
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  updateBg({
                    type: "image",
                    src: ev.target?.result as string,
                    fit: "cover",
                    positionX: 50,
                    positionY: 50,
                    scale: 100,
                    overlayColor: "#000000",
                    overlayOpacity: 0,
                  });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }}
          >
            Upload Background Image
          </Button>

          {activeSlide.background.type === "image" && (
            <>
              <div className="space-y-1.5">
                <Label className="text-xs">Overlay Opacity</Label>
                <Slider
                  value={[activeSlide.background.overlayOpacity]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    if (activeSlide.background.type === "image") {
                      const bg = activeSlide.background;
                      updateBg({
                        type: "image",
                        src: bg.src,
                        fit: bg.fit,
                        positionX: bg.positionX,
                        positionY: bg.positionY,
                        scale: bg.scale,
                        overlayColor: bg.overlayColor,
                        overlayOpacity: v ?? 0,
                      });
                    }
                  }}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Overlay Color</Label>
                <input
                  type="color"
                  value={activeSlide.background.overlayColor}
                  onChange={(e) => {
                    if (activeSlide.background.type === "image") {
                      const bg = activeSlide.background;
                      updateBg({
                        type: "image",
                        src: bg.src,
                        fit: bg.fit,
                        positionX: bg.positionX,
                        positionY: bg.positionY,
                        scale: bg.scale,
                        overlayColor: e.target.value,
                        overlayOpacity: bg.overlayOpacity,
                      });
                    }
                  }}
                  className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
