"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBuilder } from "../context";
import { EditorCanvas } from "./editor-canvas";
import { Button } from "~/components/ui/button";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../types";
import { useMemo, useRef, useEffect, useState } from "react";

export function CanvasWorkspace() {
  const { state, dispatch } = useBuilder();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Calculate the scale factor
  const scale = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return 0.5;
    const padding = 80;
    const availableW = containerSize.width - padding;
    const availableH = containerSize.height - padding;
    const fitScale = Math.min(availableW / CANVAS_WIDTH, availableH / CANVAS_HEIGHT);
    return fitScale * (state.zoom / 100);
  }, [containerSize, state.zoom]);

  const scaledW = CANVAS_WIDTH * scale;
  const scaledH = CANVAS_HEIGHT * scale;

  return (
    <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
      {/* Canvas container */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-auto relative"
        onClick={(e) => {
          // Deselect when clicking the workspace background
          if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.workspace) {
            dispatch({ type: "SELECT_ELEMENT", payload: { id: null } });
          }
        }}
        data-workspace
      >
        <div
          style={{
            width: scaledW,
            height: scaledH,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className="shadow-2xl rounded-sm"
          >
            <EditorCanvas />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="h-10 border-t bg-background flex items-center justify-center gap-4 shrink-0 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => {
            if (state.activeSlideIndex > 0) {
              dispatch({ type: "SELECT_SLIDE", payload: { index: state.activeSlideIndex - 1 } });
            }
          }}
          disabled={state.activeSlideIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium text-muted-foreground min-w-[60px] text-center">
          {state.activeSlideIndex + 1} / {state.slides.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => {
            if (state.activeSlideIndex < state.slides.length - 1) {
              dispatch({ type: "SELECT_SLIDE", payload: { index: state.activeSlideIndex + 1 } });
            }
          }}
          disabled={state.activeSlideIndex === state.slides.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
