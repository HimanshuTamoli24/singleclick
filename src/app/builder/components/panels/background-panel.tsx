"use client";

import { useState } from "react";
import { useBuilder } from "../../context";
import type { Background, GradientType, PatternType } from "../../types";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

type SubPanel = "color" | "gradient" | "image" | "pattern";

const GRADIENT_PRESETS: { colors: string[]; angle: number }[] = [
  { colors: ["#667EEA", "#764BA2"], angle: 135 },
  { colors: ["#F093FB", "#F5576C"], angle: 135 },
  { colors: ["#4FACFE", "#00F2FE"], angle: 135 },
  { colors: ["#43E97B", "#38F9D7"], angle: 135 },
  { colors: ["#FA709A", "#FEE140"], angle: 135 },
  { colors: ["#A18CD1", "#FBC2EB"], angle: 135 },
  { colors: ["#FFD1FF", "#FAD0C4"], angle: 135 },
  { colors: ["#0F2027", "#203A43", "#2C5364"], angle: 135 },
];

export function BackgroundPanel() {
  const { state, dispatch, activeSlide } = useBuilder();
  const [subPanel, setSubPanel] = useState<SubPanel>(
    activeSlide?.background.type === "gradient"
      ? "gradient"
      : activeSlide?.background.type === "image"
        ? "image"
        : activeSlide?.background.type === "pattern"
          ? "pattern"
          : "color",
  );

  if (!activeSlide) return null;

  const updateBg = (bg: Background) => {
    dispatch({ type: "SET_BACKGROUND", payload: { background: bg } });
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Background
      </h4>

      {/* Sub-panel tabs */}
      <div className="grid grid-cols-4 gap-1">
        {(["color", "gradient", "image", "pattern"] as SubPanel[]).map((p) => (
          <Button
            key={p}
            variant={subPanel === p ? "secondary" : "ghost"}
            size="sm"
            className="h-7 text-[10px] capitalize"
            onClick={() => setSubPanel(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      {/* Color Sub-panel */}
      {subPanel === "color" && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={activeSlide.background.type === "solid" ? activeSlide.background.color : "#0A0A0A"}
                onChange={(e) => updateBg({ type: "solid", color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <Input
                value={activeSlide.background.type === "solid" ? activeSlide.background.color : "#0A0A0A"}
                onChange={(e) => updateBg({ type: "solid", color: e.target.value })}
                className="h-8 text-xs font-mono"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Quick color swatches */}
          <div className="grid grid-cols-6 gap-1.5">
            {["#0A0A0A", "#FFFFFF", "#1E1E2E", "#1F2937", "#7C3AED", "#2563EB", "#059669", "#DC2626", "#D97706", "#EC4899"].map(
              (c) => (
                <button
                  key={c}
                  className={cn(
                    "w-full aspect-square rounded-md border transition-transform hover:scale-110",
                    activeSlide.background.type === "solid" && activeSlide.background.color === c && "ring-2 ring-primary ring-offset-1",
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => updateBg({ type: "solid", color: c })}
                />
              ),
            )}
          </div>
        </div>
      )}

      {/* Gradient Sub-panel */}
      {subPanel === "gradient" && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Presets</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {GRADIENT_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  className="w-full aspect-square rounded-md border hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`,
                  }}
                  onClick={() =>
                    updateBg({
                      type: "gradient",
                      gradientType: "linear",
                      colors: preset.colors,
                      angle: preset.angle,
                    })
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Color 1</Label>
            <input
              type="color"
              value={activeSlide.background.type === "gradient" ? activeSlide.background.colors[0] ?? "#667EEA" : "#667EEA"}
              onChange={(e) => {
                const bg = activeSlide.background.type === "gradient" ? activeSlide.background : { type: "gradient" as const, gradientType: "linear" as GradientType, colors: ["#667EEA", "#764BA2"], angle: 135 };
                updateBg({ ...bg, colors: [e.target.value, ...(bg.colors.slice(1))] });
              }}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Color 2</Label>
            <input
              type="color"
              value={activeSlide.background.type === "gradient" ? activeSlide.background.colors[1] ?? "#764BA2" : "#764BA2"}
              onChange={(e) => {
                const bg = activeSlide.background.type === "gradient" ? activeSlide.background : { type: "gradient" as const, gradientType: "linear" as GradientType, colors: ["#667EEA", "#764BA2"], angle: 135 };
                const colors = [...bg.colors];
                colors[1] = e.target.value;
                updateBg({ ...bg, colors });
              }}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Angle</Label>
            <Slider
              value={[activeSlide.background.type === "gradient" ? activeSlide.background.angle : 135]}
              onValueChange={(val) => {
                const v = Array.isArray(val) ? val[0] : val;
                const bg = activeSlide.background.type === "gradient" ? activeSlide.background : { type: "gradient" as const, gradientType: "linear" as GradientType, colors: ["#667EEA", "#764BA2"], angle: 135 };
                updateBg({ type: "gradient", gradientType: bg.gradientType, colors: bg.colors, angle: v ?? 135 });
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
                  variant={activeSlide.background.type === "gradient" && activeSlide.background.gradientType === t ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs flex-1 capitalize"
                  onClick={() => {
                    const bg = activeSlide.background.type === "gradient" ? activeSlide.background : { type: "gradient" as const, gradientType: "linear" as GradientType, colors: ["#667EEA", "#764BA2"], angle: 135 };
                    updateBg({ ...bg, gradientType: t });
                  }}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
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
                      updateBg({ type: "image", src: bg.src, fit: bg.fit, positionX: bg.positionX, positionY: bg.positionY, scale: bg.scale, overlayColor: bg.overlayColor, overlayOpacity: v ?? 0 });
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
                      updateBg({ type: "image", src: bg.src, fit: bg.fit, positionX: bg.positionX, positionY: bg.positionY, scale: bg.scale, overlayColor: e.target.value, overlayOpacity: bg.overlayOpacity });
                    }
                  }}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Pattern Sub-panel */}
      {subPanel === "pattern" && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Pattern</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["dots", "grid", "diagonal", "cross", "waves", "mesh"] as PatternType[]).map((p) => (
                <Button
                  key={p}
                  variant={activeSlide.background.type === "pattern" && activeSlide.background.pattern === p ? "secondary" : "outline"}
                  size="sm"
                  className="h-8 text-[10px] capitalize"
                  onClick={() =>
                    updateBg({
                      type: "pattern",
                      pattern: p,
                      patternColor: "#FFFFFF",
                      backgroundColor: "#0A0A0A",
                      opacity: 0.3,
                      size: 20,
                      rotation: 0,
                    })
                  }
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          {activeSlide.background.type === "pattern" && (() => {
            const bg = activeSlide.background;
            return (
            <>
              <div className="space-y-1.5">
                <Label className="text-xs">Pattern Color</Label>
                <input
                  type="color"
                  value={bg.patternColor}
                  onChange={(e) =>
                    updateBg({ type: "pattern", pattern: bg.pattern, patternColor: e.target.value, backgroundColor: bg.backgroundColor, opacity: bg.opacity, size: bg.size, rotation: bg.rotation })
                  }
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Background Color</Label>
                <input
                  type="color"
                  value={bg.backgroundColor}
                  onChange={(e) =>
                    updateBg({ type: "pattern", pattern: bg.pattern, patternColor: bg.patternColor, backgroundColor: e.target.value, opacity: bg.opacity, size: bg.size, rotation: bg.rotation })
                  }
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Opacity</Label>
                <Slider
                  value={[bg.opacity * 100]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    updateBg({ type: "pattern", pattern: bg.pattern, patternColor: bg.patternColor, backgroundColor: bg.backgroundColor, opacity: (v ?? 30) / 100, size: bg.size, rotation: bg.rotation });
                  }}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Size</Label>
                <Slider
                  value={[bg.size]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    updateBg({ type: "pattern", pattern: bg.pattern, patternColor: bg.patternColor, backgroundColor: bg.backgroundColor, opacity: bg.opacity, size: v ?? 20, rotation: bg.rotation });
                  }}
                  min={5}
                  max={60}
                  step={1}
                />
              </div>
            </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
