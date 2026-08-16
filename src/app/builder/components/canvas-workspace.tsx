"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useBuilder } from "../context";
import { EditorCanvas } from "./editor-canvas";
import { Button } from "~/components/ui/button";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  type Slide,
  type Background,
} from "../types";
import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { cn } from "~/lib/utils";

function getSlideBgStyle(bg: Background): React.CSSProperties {
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

/** Mini preview thumbnail of a slide */
function SlideStripThumbnail({
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
  const thumbW = CANVAS_WIDTH * thumbScale; // ~59.4px
  const thumbH = CANVAS_HEIGHT * thumbScale; // ~74.25px

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex-shrink-0 overflow-hidden rounded-md transition-all duration-200 ease-out focus:outline-none cursor-pointer",
        isActive
          ? "grayscale-0 opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-md border-primary z-10"
          : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:ring-2 hover:ring-blue-400 hover:border-blue-400 border border-border/80",
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
                    fontWeight: (el as any).fontWeight ?? 600,
                    color: (el as any).color ?? "#FFFFFF",
                    textAlign: (el as any).textAlign ?? "left",
                    lineHeight: (el as any).lineHeight ?? 1.2,
                    fontFamily: (el as any).fontFamily ?? "Inter",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  {(el as any).content}
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
                    borderRadius: (el as any).borderRadius ?? 0,
                    overflow: "hidden",
                  }}
                >
                  {(el as any).src && (
                    <img
                      src={(el as any).src}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: (el as any).fit ?? "cover",
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
                    backgroundColor: (el as any).fill,
                    borderRadius:
                      (el as any).variant === "circle"
                        ? "50%"
                        : (el as any).borderRadius,
                  }}
                />
              );
            }
            return null;
          })}
      </div>

      {/* Index badge */}
      <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1 py-0.2 text-[9px] leading-tight font-semibold text-white/90 backdrop-blur-[2px]">
        {index + 1}
      </span>
    </button>
  );
}

export function CanvasWorkspace() {
  const { state, dispatch } = useBuilder();
  const containerRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Scroll position state for scrubber
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // Check scroll bounds
  const updateScrollBounds = useCallback(() => {
    const el = filmstripRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);

    if (maxScroll > 0) {
      setScrollProgress(el.scrollLeft / maxScroll);
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    const el = filmstripRef.current;
    if (!el) return;
    updateScrollBounds();
    el.addEventListener("scroll", updateScrollBounds);
    window.addEventListener("resize", updateScrollBounds);
    return () => {
      el.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, [updateScrollBounds, state.slides.length]);

  // Auto-scroll active slide thumbnail into view
  useEffect(() => {
    if (!filmstripRef.current) return;
    const activeThumb = filmstripRef.current.children[
      state.activeSlideIndex
    ] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    updateScrollBounds();
  }, [state.activeSlideIndex, updateScrollBounds]);

  const handleScroll = (direction: "left" | "right") => {
    if (!filmstripRef.current) return;
    const scrollAmount = 140; // ~2 thumbnails
    filmstripRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Drag-to-scrub on progress track
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = filmstripRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: ratio * maxScroll,
      behavior: "smooth",
    });
  };

  // Calculate the scale factor (accounting for bottom thumbnail tray)
  const scale = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return 0.5;
    const paddingH = 60;
    const paddingV = 140; // accounts for bottom filmstrip + scrubber
    const availableW = containerSize.width - paddingH;
    const availableH = containerSize.height - paddingV;
    const fitScale = Math.min(
      availableW / CANVAS_WIDTH,
      availableH / CANVAS_HEIGHT,
    );
    return Math.max(0.2, fitScale * (state.zoom / 100));
  }, [containerSize, state.zoom]);

  const scaledW = CANVAS_WIDTH * scale;
  const scaledH = CANVAS_HEIGHT * scale;

  return (
    <div className="bg-muted/30 flex flex-1 flex-col overflow-hidden">
      {/* Canvas workspace area */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-auto p-4"
        onClick={(e) => {
          // Deselect when clicking the workspace background
          if (
            e.target === e.currentTarget ||
            (e.target as HTMLElement).dataset.workspace
          ) {
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
            className="rounded-sm shadow-2xl"
          >
            <EditorCanvas />
          </div>
        </div>
      </div>

      {/* Bottom slide carousel filmstrip tray */}
      <div className="bg-background/95 z-10 flex shrink-0 flex-col items-center gap-1.5 border-t px-4 py-2 shadow-sm backdrop-blur-sm">
        {/* Slide count pill */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground bg-muted/60 rounded-full border px-3 py-0.5 text-[11px] font-medium tracking-wide">
            {state.activeSlideIndex + 1} / {state.slides.length}
          </span>
        </div>

        {/* Filmstrip with 5-slide viewport & side Chevrons */}
        <div className="flex items-center justify-center gap-1.5 w-full">
          {/* Left chevron */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-full p-0 flex-shrink-0 hover:bg-muted"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft && state.activeSlideIndex === 0}
            title="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* 5-Slide Visible Container (~360px max width for 5 thumbnails + gaps) */}
          <div className="max-w-[360px] overflow-hidden px-1 py-1">
            <div
              ref={filmstripRef}
              className="flex items-center gap-2.5 overflow-x-auto scroll-smooth scrollbar-none py-1 px-1"
              style={{
                scrollSnapType: "x mandatory",
              }}
            >
              {state.slides.map((slide, i) => (
                <div key={slide.id} style={{ scrollSnapAlign: "center" }}>
                  <SlideStripThumbnail
                    slide={slide}
                    index={i}
                    isActive={state.activeSlideIndex === i}
                    onClick={() =>
                      dispatch({ type: "SELECT_SLIDE", payload: { index: i } })
                    }
                  />
                </div>
              ))}

              {/* Quick Add Slide Button */}
              <button
                onClick={() => dispatch({ type: "ADD_SLIDE" })}
                className="border-muted-foreground/30 hover:border-primary text-muted-foreground hover:text-primary hover:bg-muted/40 flex flex-shrink-0 flex-col items-center justify-center rounded-md border border-dashed transition-all duration-150 cursor-pointer"
                style={{
                  width: CANVAS_WIDTH * 0.055,
                  height: CANVAS_HEIGHT * 0.055,
                }}
                title="Add new slide"
              >
                <Plus className="h-4 w-4" />
                <span className="mt-0.5 text-[9px] font-medium">Add</span>
              </button>
            </div>
          </div>

          {/* Right chevron */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-full p-0 flex-shrink-0 hover:bg-muted"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight && state.activeSlideIndex === state.slides.length - 1}
            title="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Fast Scrubber Ball / Track (like screenshot) */}
        {state.slides.length > 3 && (
          <div
            className="relative h-2 w-28 bg-muted/60 hover:bg-muted rounded-full cursor-pointer transition-colors overflow-hidden mt-0.5"
            onClick={handleScrubberClick}
            title="Fast scroll scrubber"
          >
            <div
              className="absolute top-0.5 bottom-0.5 w-6 bg-muted-foreground/60 hover:bg-primary rounded-full transition-all duration-150"
              style={{
                left: `calc(${scrollProgress * 100}% - ${scrollProgress * 24}px)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
