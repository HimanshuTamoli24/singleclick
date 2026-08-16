"use client";

import { Eye, EyeOff, Lock, Unlock, GripVertical } from "lucide-react";
import { useBuilder } from "../../context";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export function LayersPanel() {
  const { state, dispatch, activeSlide } = useBuilder();

  if (!activeSlide) return null;

  // Layers are displayed in reverse order (top layer first)
  const elements = [...activeSlide.elements].reverse();

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Layers
      </h4>

      {elements.length === 0 && (
        <div className="text-xs text-muted-foreground/50 py-4 text-center">
          No elements on this slide.
        </div>
      )}

      <div className="space-y-0.5">
        {elements.map((el) => (
          <div
            key={el.id}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors group",
              state.selectedElementId === el.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50",
            )}
            onClick={() => dispatch({ type: "SELECT_ELEMENT", payload: { id: el.id } })}
          >
            <GripVertical className="h-3 w-3 text-muted-foreground/30 shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="text-xs truncate">{el.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{el.type}</div>
            </div>

            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "TOGGLE_ELEMENT_VISIBILITY", payload: { id: el.id } });
                }}
              >
                {el.visible ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "TOGGLE_ELEMENT_LOCK", payload: { id: el.id } });
                }}
              >
                {el.locked ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  <Unlock className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
