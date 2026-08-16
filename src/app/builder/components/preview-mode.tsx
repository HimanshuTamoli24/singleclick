"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useBuilder } from "../context";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../types";
import { EditorCanvas } from "./editor-canvas";
import { Button } from "~/components/ui/button";

export function PreviewMode() {
  const { state, dispatch } = useBuilder();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={() => dispatch({ type: "TOGGLE_PREVIEW" })}
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Canvas */}
      <div
        style={{
          width: CANVAS_WIDTH * 0.5,
          height: CANVAS_HEIGHT * 0.5,
        }}
      >
        <div
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: "scale(0.5)",
            transformOrigin: "top left",
          }}
          className="rounded-lg overflow-hidden"
        >
          <EditorCanvas />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
          onClick={() => {
            if (state.activeSlideIndex > 0) {
              dispatch({ type: "SELECT_SLIDE", payload: { index: state.activeSlideIndex - 1 } });
            }
          }}
          disabled={state.activeSlideIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-white text-sm font-medium">
          {state.activeSlideIndex + 1} / {state.slides.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
          onClick={() => {
            if (state.activeSlideIndex < state.slides.length - 1) {
              dispatch({ type: "SELECT_SLIDE", payload: { index: state.activeSlideIndex + 1 } });
            }
          }}
          disabled={state.activeSlideIndex === state.slides.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
