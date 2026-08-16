"use client";

import { useBuilder } from "../context";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../types";
import type { Background } from "../types";
import { CanvasElement } from "./canvas-element";
import { FloatingToolbar } from "./floating-toolbar";

function getBackgroundStyle(bg: Background): React.CSSProperties {
  switch (bg.type) {
    case "solid":
      return { backgroundColor: bg.color };
    case "gradient": {
      const colors = bg.colors.join(", ");
      if (bg.gradientType === "radial") {
        return { background: `radial-gradient(circle, ${colors})` };
      }
      return { background: `linear-gradient(${bg.angle}deg, ${colors})` };
    }
    case "preset":
      return { ...bg.style };
    case "image":
      return {
        backgroundImage: `url(${bg.src})`,
        backgroundSize: bg.fit,
        backgroundPosition: `${bg.positionX}% ${bg.positionY}%`,
      };
    case "pattern":
      return { backgroundColor: bg.backgroundColor };
    default:
      return { backgroundColor: "#0A0A0A" };
  }
}

function PatternOverlay({ bg }: { bg: Background }) {
  if (bg.type !== "pattern") return null;

  const patternSVGs: Record<string, string> = {
    dots: `<circle cx="${bg.size / 2}" cy="${bg.size / 2}" r="1.5" fill="${bg.patternColor}" />`,
    grid: `<path d="M ${bg.size} 0 L 0 0 0 ${bg.size}" fill="none" stroke="${bg.patternColor}" stroke-width="0.5"/>`,
    diagonal: `<path d="M 0 ${bg.size} L ${bg.size} 0" stroke="${bg.patternColor}" stroke-width="0.5"/>`,
    cross: `<path d="M ${bg.size / 2} 0 L ${bg.size / 2} ${bg.size} M 0 ${bg.size / 2} L ${bg.size} ${bg.size / 2}" stroke="${bg.patternColor}" stroke-width="0.5"/>`,
    noise: `<rect width="${bg.size}" height="${bg.size}" fill="${bg.patternColor}" opacity="0.05"/>`,
    waves: `<path d="M 0 ${bg.size / 2} Q ${bg.size / 4} 0, ${bg.size / 2} ${bg.size / 2} T ${bg.size} ${bg.size / 2}" fill="none" stroke="${bg.patternColor}" stroke-width="0.5"/>`,
    mesh: `<circle cx="0" cy="0" r="${bg.size / 3}" fill="none" stroke="${bg.patternColor}" stroke-width="0.3"/><circle cx="${bg.size}" cy="${bg.size}" r="${bg.size / 3}" fill="none" stroke="${bg.patternColor}" stroke-width="0.3"/>`,
  };

  const svgContent = patternSVGs[bg.pattern] ?? patternSVGs.dots;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bg.size}" height="${bg.size}">${svgContent}</svg>`;
  const encoded = encodeURIComponent(svg);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encoded}")`,
        backgroundRepeat: "repeat",
        opacity: bg.opacity,
        transform: `rotate(${bg.rotation}deg)`,
      }}
    />
  );
}

export function EditorCanvas() {
  const { state, dispatch, activeSlide } = useBuilder();

  if (!activeSlide) return null;

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        ...getBackgroundStyle(activeSlide.background),
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch({ type: "SELECT_ELEMENT", payload: { id: null } });
        }
      }}
    >
      {/* Pattern overlay */}
      <PatternOverlay bg={activeSlide.background} />

      {/* Image overlay */}
      {activeSlide.background.type === "image" && activeSlide.background.overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: activeSlide.background.overlayColor,
            opacity: activeSlide.background.overlayOpacity / 100,
          }}
        />
      )}

      {/* Elements */}
      {activeSlide.elements
        .filter((el) => el.visible)
        .map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            isSelected={state.selectedElementId === element.id}
            onSelect={() => dispatch({ type: "SELECT_ELEMENT", payload: { id: element.id } })}
          />
        ))}

      {/* Floating toolbar for selected element */}
      {state.selectedElementId && (
        <FloatingToolbar />
      )}
    </div>
  );
}
