"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, GripVertical } from "lucide-react";
import { useBuilder } from "../../context";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import type { SlideElement } from "../../types";

export function LayersPanel() {
  const { state, dispatch, activeSlide } = useBuilder();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  if (!activeSlide) return null;

  // Displayed in UI in reverse order (top layer first)
  const displayElements = [...activeSlide.elements].reverse();

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverId !== id) {
      setDragOverId(id);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    const sourceId = draggedId || e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) {
      setDraggedId(null);
      return;
    }

    const currentElements = [...activeSlide.elements];
    const fromIndex = currentElements.findIndex((el) => el.id === sourceId);
    const toIndex = currentElements.findIndex((el) => el.id === targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const [moved] = currentElements.splice(fromIndex, 1);
      if (moved) {
        currentElements.splice(toIndex, 0, moved);
        dispatch({
          type: "REORDER_ELEMENTS",
          payload: { elements: currentElements },
        });
      }
    }
    setDraggedId(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Layers ({activeSlide.elements.length})
        </h4>
        <span className="text-muted-foreground/60 text-[10px]">
          Drag to reorder
        </span>
      </div>

      {displayElements.length === 0 && (
        <div className="text-muted-foreground/50 py-4 text-center text-xs">
          No elements on this slide.
        </div>
      )}

      <div className="space-y-1">
        {displayElements.map((el) => {
          const isSelected = state.selectedElementId === el.id;
          const isDragging = draggedId === el.id;
          const isDragOver = dragOverId === el.id && draggedId !== el.id;

          return (
            <div
              key={el.id}
              draggable
              onDragStart={(e) => handleDragStart(e, el.id)}
              onDragOver={(e) => handleDragOver(e, el.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, el.id)}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
              }}
              onClick={() =>
                dispatch({ type: "SELECT_ELEMENT", payload: { id: el.id } })
              }
              className={cn(
                "group flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-all select-none",
                isSelected
                  ? "border-primary/40 bg-primary/10 text-primary shadow-2xs"
                  : "bg-muted/20 hover:bg-muted/50 text-foreground border-transparent",
                isDragging &&
                  "border-primary scale-[0.98] border-dashed opacity-40",
                isDragOver && "border-t-primary bg-primary/5 border-t-2",
              )}
            >
              {/* Drag Handle */}
              <div
                className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab p-0.5 transition-colors active:cursor-grabbing"
                title="Drag to change layer order"
              >
                <GripVertical className="h-3.5 w-3.5" />
              </div>

              {/* Element Name & Type */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{el.name}</div>
                <div className="text-muted-foreground text-[10px] capitalize">
                  {el.type}
                </div>
              </div>

              {/* Action Buttons: Visibility & Lock */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: "TOGGLE_ELEMENT_VISIBILITY",
                      payload: { id: el.id },
                    });
                  }}
                  title={el.visible ? "Hide layer" : "Show layer"}
                >
                  {el.visible ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="text-muted-foreground/50 h-3.5 w-3.5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: "TOGGLE_ELEMENT_LOCK",
                      payload: { id: el.id },
                    });
                  }}
                  title={el.locked ? "Unlock layer" : "Lock layer"}
                >
                  {el.locked ? (
                    <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Unlock className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
