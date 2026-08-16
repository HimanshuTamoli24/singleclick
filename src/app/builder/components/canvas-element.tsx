"use client";

import { useRef, useState, useCallback } from "react";
import type { SlideElement } from "../types";
import { useBuilder } from "../context";
import { cn } from "~/lib/utils";

interface CanvasElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
}

export function CanvasElement({ element, isSelected, onSelect }: CanvasElementProps) {
  const { dispatch } = useBuilder();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, elX: 0, elY: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (element.locked) return;
      e.stopPropagation();
      onSelect();

      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        elX: element.x,
        elY: element.y,
      };

      const handleMouseMove = (ev: MouseEvent) => {
        // We need the canvas scale factor — get it from the transform
        const canvas = elementRef.current?.closest("[data-canvas]") as HTMLElement | null;
        const scale = canvas ? parseFloat(canvas.dataset.scale ?? "1") : 1;
        const dx = (ev.clientX - dragStart.current.x) / scale;
        const dy = (ev.clientY - dragStart.current.y) / scale;

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: element.id,
            updates: {
              x: Math.round(dragStart.current.elX + dx),
              y: Math.round(dragStart.current.elY + dy),
            },
          },
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [element.id, element.x, element.y, element.locked, dispatch, onSelect],
  );

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    opacity: element.opacity,
    transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
    cursor: element.locked ? "default" : isDragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  const renderContent = () => {
    switch (element.type) {
      case "text":
        return (
          <div
            style={{
              fontFamily: element.fontFamily,
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              color: element.color,
              textAlign: element.textAlign,
              lineHeight: element.lineHeight,
              letterSpacing: element.letterSpacing,
              textTransform: element.textTransform,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {element.content}
          </div>
        );

      case "image":
        return element.src ? (
          <img
            src={element.src}
            alt=""
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: element.fit,
              borderRadius: element.borderRadius,
              filter: `brightness(${element.brightness}%) contrast(${element.contrast}%) blur(${element.blur}px)`,
            }}
          />
        ) : (
          <div
            className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground border border-dashed border-muted-foreground/30 rounded-md"
            style={{ borderRadius: element.borderRadius }}
          >
            <span className="text-2xl">🖼️</span>
          </div>
        );

      case "shape":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: element.fill,
              borderColor: element.borderColor,
              borderWidth: element.borderWidth,
              borderStyle: element.borderWidth > 0 ? "solid" : "none",
              borderRadius: element.variant === "circle" ? "50%" : element.borderRadius,
              boxShadow:
                element.shadowBlur > 0
                  ? `${element.shadowOffsetX}px ${element.shadowOffsetY}px ${element.shadowBlur}px ${element.shadowColor}`
                  : undefined,
            }}
          />
        );

      case "code":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: element.backgroundColor,
              borderRadius: element.borderRadius,
              padding: 24,
              overflow: "hidden",
            }}
          >
            <pre
              style={{
                fontFamily: element.fontFamily,
                fontSize: element.fontSize,
                color: element.textColor,
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <code>{element.content}</code>
            </pre>
          </div>
        );

      case "icon":
        return (
          <div
            className="flex items-center justify-center w-full h-full"
            style={{ color: element.color, fontSize: element.size }}
          >
            ⬟
          </div>
        );

      case "watermark":
        return (
          <div
            style={{
              fontFamily: element.fontFamily,
              fontSize: element.fontSize,
              color: element.color,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {element.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      style={baseStyle}
      className={cn(
        "group",
        isSelected && "ring-2 ring-blue-500 ring-offset-0",
      )}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {renderContent()}

      {/* Resize handles when selected */}
      {isSelected && !element.locked && (
        <>
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border border-blue-500 rounded-sm cursor-nw-resize" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border border-blue-500 rounded-sm cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border border-blue-500 rounded-sm cursor-sw-resize" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border border-blue-500 rounded-sm cursor-se-resize" />
        </>
      )}
    </div>
  );
}
