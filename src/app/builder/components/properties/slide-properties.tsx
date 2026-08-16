"use client";

import { useBuilder } from "../../context";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../types";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";

export function SlideProperties() {
  const { activeSlide, state } = useBuilder();

  if (!activeSlide) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs">Slide Type</Label>
        <Badge variant="outline" className="capitalize">
          {activeSlide.slideType}
        </Badge>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Canvas Size</Label>
        <div className="text-sm text-muted-foreground">
          {CANVAS_WIDTH} × {CANVAS_HEIGHT}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Elements</Label>
        <div className="text-sm text-muted-foreground">
          {activeSlide.elements.length} element{activeSlide.elements.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Background</Label>
        <div className="flex items-center gap-2">
          {activeSlide.background.type === "solid" && (
            <>
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: activeSlide.background.color }}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {activeSlide.background.color}
              </span>
            </>
          )}
          {activeSlide.background.type === "gradient" && (
            <div
              className="w-16 h-6 rounded border"
              style={{
                background: `linear-gradient(${activeSlide.background.angle}deg, ${activeSlide.background.colors.join(", ")})`,
              }}
            />
          )}
          {activeSlide.background.type === "preset" && (
            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
              {activeSlide.background.name || activeSlide.background.presetId}
            </span>
          )}
          {activeSlide.background.type === "image" && (
            <span className="text-xs text-muted-foreground">Image background</span>
          )}
          {activeSlide.background.type === "pattern" && (
            <span className="text-xs text-muted-foreground capitalize">
              {activeSlide.background.pattern} pattern
            </span>
          )}
        </div>
      </div>

      <div className="text-[10px] text-muted-foreground/50 pt-2">
        Click an element on the canvas to edit its properties.
      </div>
    </div>
  );
}
