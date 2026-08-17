"use client";

import { Copy, Trash2, ArrowUp, ArrowDown, Lock, Unlock } from "lucide-react";
import { useBuilder } from "../context";
import { Button } from "~/components/ui/button";

export function FloatingToolbar() {
  const { dispatch, activeSlide, selectedElement } = useBuilder();

  if (!selectedElement || !activeSlide) return null;

  return (
    <div
      className="absolute z-50 flex items-center gap-2 rounded-2xl border-2 border-black/15 bg-white/98 px-3 py-2 shadow-2xl backdrop-blur-xl transition-all duration-150 select-none dark:border-white/20 dark:bg-zinc-900/98"
      style={{
        left: selectedElement.x,
        top: Math.max(12, selectedElement.y - 78),
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Duplicate */}
      <Button
        variant="ghost"
        size="sm"
        className="h-12 w-12 rounded-xl p-0 text-zinc-700 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={() =>
          dispatch({
            type: "DUPLICATE_ELEMENT",
            payload: { id: selectedElement.id },
          })
        }
        title="Duplicate Element (Ctrl+D)"
      >
        <Copy className="h-6 w-6" />
      </Button>

      {/* Lock / Unlock */}
      <Button
        variant="ghost"
        size="sm"
        className={`h-12 w-12 rounded-xl p-0 transition-colors ${
          selectedElement.locked
            ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-300"
            : "text-zinc-700 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
        onClick={() =>
          dispatch({
            type: "TOGGLE_ELEMENT_LOCK",
            payload: { id: selectedElement.id },
          })
        }
        title={selectedElement.locked ? "Unlock Element" : "Lock Element"}
      >
        {selectedElement.locked ? (
          <Lock className="h-6 w-6" />
        ) : (
          <Unlock className="h-6 w-6" />
        )}
      </Button>

      <div className="mx-1 h-6 w-[2px] bg-black/15 dark:bg-white/15" />

      {/* Bring Forward */}
      <Button
        variant="ghost"
        size="sm"
        className="h-12 w-12 rounded-xl p-0 text-zinc-700 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={() =>
          dispatch({
            type: "MOVE_ELEMENT_LAYER",
            payload: { id: selectedElement.id, direction: "up" },
          })
        }
        title="Bring Forward"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>

      {/* Send Backward */}
      <Button
        variant="ghost"
        size="sm"
        className="h-12 w-12 rounded-xl p-0 text-zinc-700 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={() =>
          dispatch({
            type: "MOVE_ELEMENT_LAYER",
            payload: { id: selectedElement.id, direction: "down" },
          })
        }
        title="Send Backward"
      >
        <ArrowDown className="h-6 w-6" />
      </Button>

      <div className="mx-1 h-6 w-[2px] bg-black/15 dark:bg-white/15" />

      {/* Delete */}
      <Button
        variant="ghost"
        size="sm"
        className="h-12 w-12 rounded-xl p-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
        onClick={() =>
          dispatch({
            type: "DELETE_ELEMENT",
            payload: { id: selectedElement.id },
          })
        }
        title="Delete Element (Del / Backspace)"
      >
        <Trash2 className="h-6 w-6" />
      </Button>
    </div>
  );
}
