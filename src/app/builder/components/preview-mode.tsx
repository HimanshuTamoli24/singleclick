"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useBuilder } from "../context";
import { CANVAS_WIDTH, CANVAS_HEIGHT, type Slide, type Background } from "../types";
import { EditorCanvas } from "./editor-canvas";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function getSlideBgStyle(bg: Background): React.CSSProperties {
  switch (bg.type) {
    case "solid":
      return bg.color?.includes("gradient") || bg.color?.includes(",")
        ? { background: bg.color }
        : { backgroundColor: bg.color };
    case "gradient": {
      const colors = bg.colors.join(", ");
      return bg.gradientType === "radial"
        ? { background: `radial-gradient(circle, ${colors})` }
        : { background: `linear-gradient(${bg.angle}deg, ${colors})` };
    }
    case "preset":
      return { ...bg.style };
    case "image":
      return {
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    case "pattern":
      return { backgroundColor: bg.backgroundColor };
    default:
      return { backgroundColor: "#0A0A0A" };
  }
}

function PreviewThumbnail({
  slide,
  index,
  isActive,
  onClick,
}: {
  slide: Slide;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const thumbScale = 0.055;
  const thumbW = CANVAS_WIDTH * thumbScale;
  const thumbH = CANVAS_HEIGHT * thumbScale;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all duration-200 ease-out focus:outline-none",
        isActive
          ? "ring-primary border-primary z-10 scale-105 opacity-100 shadow-lg ring-2 grayscale-0"
          : "border-white/20 border opacity-60 grayscale hover:scale-105 hover:border-white/80 hover:opacity-100 hover:ring-2 hover:ring-white/40 hover:grayscale-0",
      )}
      style={{
        width: thumbW,
        height: thumbH,
      }}
      title={`Slide ${index + 1}`}
    >
      {/* Background layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-200"
        style={getSlideBgStyle(slide.background)}
      />

      {/* Mini content representation */}
      <div
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${thumbScale})`,
        }}
      >
        {slide.elements
          .filter((el) => el.visible)
          .map((el) => {
            if (
              el.type === "text" ||
              el.type === "code" ||
              el.type === "watermark"
            ) {
              return (
                <div
                  key={el.id}
                  style={{
                    position: "absolute",
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    fontSize: el.fontSize,
                    fontWeight: "fontWeight" in el ? el.fontWeight : 600,
                    color:
                      "color" in el
                        ? el.color
                        : "textColor" in el
                          ? el.textColor
                          : "#FFFFFF",
                    textAlign: "textAlign" in el ? el.textAlign : "left",
                    lineHeight: "lineHeight" in el ? el.lineHeight : 1.2,
                    fontFamily: "fontFamily" in el ? el.fontFamily : "Inter",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  {"content" in el ? el.content : ""}
                </div>
              );
            }
            if (el.type === "image") {
              return (
                <div
                  key={el.id}
                  style={{
                    position: "absolute",
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: el.borderRadius ?? 0,
                    overflow: "hidden",
                  }}
                >
                  {el.src && (
                    <img
                      src={el.src}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: el.fit ?? "cover",
                      }}
                    />
                  )}
                </div>
              );
            }
            if (el.type === "shape") {
              return (
                <div
                  key={el.id}
                  style={{
                    position: "absolute",
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    backgroundColor: el.fill,
                    borderRadius:
                      el.variant === "circle" ? "50%" : el.borderRadius,
                  }}
                />
              );
            }
            return null;
          })}
      </div>

      {/* Index badge */}
      <span className="py-0.2 absolute right-1 bottom-1 rounded bg-black/80 px-1 text-[9px] leading-tight font-semibold text-white/90 backdrop-blur-[2px]">
        {index + 1}
      </span>
    </button>
  );
}

export function PreviewMode() {
  const { state, dispatch } = useBuilder();
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = useCallback(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = filmstripRef.current;
    if (!el) return;
    const amount = direction === "left" ? -180 : 180;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrubber = e.currentTarget;
    const rect = scrubber.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const el = filmstripRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
  };

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch({ type: "TOGGLE_PREVIEW" });
      } else if (e.key === "ArrowLeft") {
        if (state.activeSlideIndex > 0) {
          dispatch({
            type: "SELECT_SLIDE",
            payload: { index: state.activeSlideIndex - 1 },
          });
        }
      } else if (e.key === "ArrowRight") {
        if (state.activeSlideIndex < state.slides.length - 1) {
          dispatch({
            type: "SELECT_SLIDE",
            payload: { index: state.activeSlideIndex + 1 },
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.activeSlideIndex, state.slides.length, dispatch]);

  // Auto-scroll filmstrip to active slide
  useEffect(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const activeThumb = el.querySelector(
      `[data-slide-index="${state.activeSlideIndex}"]`,
    ) as HTMLElement | null;
    if (activeThumb) {
      const containerLeft = el.getBoundingClientRect().left;
      const thumbLeft = activeThumb.getBoundingClientRect().left;
      const offset =
        thumbLeft - containerLeft - el.clientWidth / 2 + activeThumb.clientWidth / 2;
      el.scrollBy({ left: offset, behavior: "smooth" });
    }
    checkScroll();
  }, [state.activeSlideIndex, checkScroll]);

  // Calculate dynamic preview scale based on viewport
  const [scale, setScale] = useState(0.48);
  useEffect(() => {
    const updateScale = () => {
      const availableHeight = window.innerHeight - 200; // Account for header & bottom carousel
      const availableWidth = window.innerWidth - 120;
      const scaleH = availableHeight / CANVAS_HEIGHT;
      const scaleW = availableWidth / CANVAS_WIDTH;
      setScale(Math.max(0.25, Math.min(0.55, Math.min(scaleH, scaleW))));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative flex h-screen flex-col items-center justify-between bg-[#08090b] text-white select-none overflow-hidden">
      {/* Top Bar */}
      <header className="flex h-14 w-full items-center justify-between border-b border-white/10 px-6 backdrop-blur-md bg-black/40 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
            Preview Mode
          </span>
          <span className="text-xs text-white/50 hidden sm:inline">
            Use ← → arrow keys to navigate, Esc to exit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">
            Slide {state.activeSlideIndex + 1} of {state.slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            onClick={() => dispatch({ type: "TOGGLE_PREVIEW" })}
            title="Exit Preview (Esc)"
          >
            <X className="h-4 w-4 mr-1.5" />
            <span className="text-xs font-medium">Exit</span>
          </Button>
        </div>
      </header>

      {/* Main Canvas Center Stage */}
      <main className="relative flex flex-1 w-full items-center justify-center overflow-hidden py-2">
        {/* Floating Left Nav Arrow */}
        <button
          onClick={() => {
            if (state.activeSlideIndex > 0) {
              dispatch({
                type: "SELECT_SLIDE",
                payload: { index: state.activeSlideIndex - 1 },
              });
            }
          }}
          disabled={state.activeSlideIndex === 0}
          className="absolute left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md border border-white/15 transition-all hover:scale-110 hover:bg-black/90 hover:text-white disabled:pointer-events-none disabled:opacity-20 cursor-pointer shadow-xl"
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Scaled Slide Canvas */}
        <div
          style={{
            width: CANVAS_WIDTH * scale,
            height: CANVAS_HEIGHT * scale,
          }}
          className="relative transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-white/10"
        >
          <div
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className="overflow-hidden"
          >
            <EditorCanvas />
          </div>
        </div>

        {/* Floating Right Nav Arrow */}
        <button
          onClick={() => {
            if (state.activeSlideIndex < state.slides.length - 1) {
              dispatch({
                type: "SELECT_SLIDE",
                payload: { index: state.activeSlideIndex + 1 },
              });
            }
          }}
          disabled={state.activeSlideIndex === state.slides.length - 1}
          className="absolute right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md border border-white/15 transition-all hover:scale-110 hover:bg-black/90 hover:text-white disabled:pointer-events-none disabled:opacity-20 cursor-pointer shadow-xl"
          title="Next slide (Right Arrow)"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </main>

      {/* Bottom Filmstrip Carousel */}
      <footer className="flex flex-col items-center justify-center border-t border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md z-20 shrink-0 w-full">
        <div className="flex w-full max-w-4xl items-center justify-center gap-1.5">
          {/* Scroll Left */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 flex-shrink-0 rounded-full p-0 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft && state.activeSlideIndex === 0}
            title="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Filmstrip container */}
          <div
            ref={filmstripRef}
            onScroll={checkScroll}
            className="no-scrollbar flex items-center gap-2 overflow-x-auto px-2 py-1 scroll-smooth"
            style={{
              maxWidth: "calc(100% - 80px)",
            }}
          >
            <div className="flex items-center gap-2 py-0.5">
              {state.slides.map((slide, i) => (
                <div key={slide.id} data-slide-index={i}>
                  <PreviewThumbnail
                    slide={slide}
                    index={i}
                    isActive={state.activeSlideIndex === i}
                    onClick={() =>
                      dispatch({
                        type: "SELECT_SLIDE",
                        payload: { index: i },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Right */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 flex-shrink-0 rounded-full p-0 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20"
            onClick={() => handleScroll("right")}
            disabled={
              !canScrollRight &&
              state.activeSlideIndex === state.slides.length - 1
            }
            title="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mini scrubber bar */}
        {state.slides.length > 5 && (
          <div
            className="bg-white/10 hover:bg-white/20 relative mt-1 h-1.5 w-24 cursor-pointer overflow-hidden rounded-full transition-colors"
            onClick={handleScrubberClick}
            title="Slide progress"
          >
            <div
              className="bg-primary absolute top-0 bottom-0 w-6 rounded-full transition-all duration-150"
              style={{
                left: `calc(${scrollProgress * 100}% - ${scrollProgress * 24}px)`,
              }}
            />
          </div>
        )}
      </footer>
    </div>
  );
}
