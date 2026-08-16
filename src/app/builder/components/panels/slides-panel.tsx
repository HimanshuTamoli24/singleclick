"use client";

import { Plus, Copy, Trash2 } from "lucide-react";
import { useBuilder } from "../../context";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../types";
import type { Background } from "../../types";

function SlideThumbnail({ bg, index }: { bg: Background; index: number }) {
  const bgStyle: React.CSSProperties = (() => {
    switch (bg.type) {
      case "solid":
        return { backgroundColor: bg.color };
      case "gradient": {
        const colors = bg.colors.join(", ");
        return bg.gradientType === "radial"
          ? { background: `radial-gradient(circle, ${colors})` }
          : { background: `linear-gradient(${bg.angle}deg, ${colors})` };
      }
      case "preset":
        return { ...bg.style };
      case "image":
        return { backgroundImage: `url(${bg.src})`, backgroundSize: "cover" };
      case "pattern":
        return { backgroundColor: bg.backgroundColor };
      default:
        return { backgroundColor: "#0A0A0A" };
    }
  })();

  return (
    <div
      className="w-full aspect-[4/5] rounded-md overflow-hidden relative"
      style={bgStyle}
    >
      <div className="absolute bottom-1 right-1.5 text-[10px] font-semibold text-white/60 bg-black/30 px-1.5 py-0.5 rounded">
        {index + 1}
      </div>
    </div>
  );
}

export function SlidesPanel() {
  const { state, dispatch } = useBuilder();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Slides
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => dispatch({ type: "ADD_SLIDE" })}
          title="Add Slide"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-2">
        {state.slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "relative group cursor-pointer rounded-lg border-2 p-1.5 transition-all",
              state.activeSlideIndex === i
                ? "border-primary shadow-sm"
                : "border-transparent hover:border-muted-foreground/20",
            )}
            onClick={() => dispatch({ type: "SELECT_SLIDE", payload: { index: i } })}
          >
            <SlideThumbnail bg={slide.background} index={i} />

            {/* Hover actions */}
            <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="h-5 w-5 bg-background/90 border rounded flex items-center justify-center hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "DUPLICATE_SLIDE", payload: { index: i } });
                }}
                title="Duplicate"
              >
                <Copy className="h-3 w-3" />
              </button>
              {state.slides.length > 1 && (
                <button
                  className="h-5 w-5 bg-background/90 border rounded flex items-center justify-center hover:bg-destructive/10 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "DELETE_SLIDE", payload: { index: i } });
                  }}
                  title="Delete"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Slide type badge */}
            <div className="mt-1 text-[10px] text-muted-foreground text-center capitalize">
              {slide.slideType}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1.5"
        onClick={() => dispatch({ type: "ADD_SLIDE" })}
      >
        <Plus className="h-3.5 w-3.5" />
        Add Slide
      </Button>
    </div>
  );
}
