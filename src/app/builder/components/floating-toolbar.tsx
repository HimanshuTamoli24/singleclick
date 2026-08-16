"use client";

import { Copy, Trash2, ArrowUp, ArrowDown, Lock, Unlock } from "lucide-react";
import { useBuilder } from "../context";
import { Button } from "~/components/ui/button";

export function FloatingToolbar() {
  const { state, dispatch, activeSlide, selectedElement } = useBuilder();

  if (!selectedElement || !activeSlide) return null;

  return (
    <div
      className="absolute z-50 flex items-center gap-0.5 bg-background border rounded-lg shadow-lg px-1 py-0.5"
      style={{
        left: selectedElement.x,
        top: Math.max(0, selectedElement.y - 44),
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => dispatch({ type: "DUPLICATE_ELEMENT", payload: { id: selectedElement.id } })}
        title="Duplicate (Ctrl+D)"
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() =>
          dispatch({ type: "TOGGLE_ELEMENT_LOCK", payload: { id: selectedElement.id } })
        }
        title={selectedElement.locked ? "Unlock" : "Lock"}
      >
        {selectedElement.locked ? (
          <Lock className="h-3.5 w-3.5" />
        ) : (
          <Unlock className="h-3.5 w-3.5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() =>
          dispatch({ type: "MOVE_ELEMENT_LAYER", payload: { id: selectedElement.id, direction: "up" } })
        }
        title="Bring Forward"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() =>
          dispatch({ type: "MOVE_ELEMENT_LAYER", payload: { id: selectedElement.id, direction: "down" } })
        }
        title="Send Backward"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </Button>

      <div className="w-px h-4 bg-border mx-0.5" />

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
        onClick={() => dispatch({ type: "DELETE_ELEMENT", payload: { id: selectedElement.id } })}
        title="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
