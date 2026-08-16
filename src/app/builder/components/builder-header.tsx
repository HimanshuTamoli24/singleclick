"use client";

import {
  Undo2,
  Redo2,
  Monitor,
  ZoomIn,
  ZoomOut,
  Eye,
  Save,
  Download,
  Sparkles,
} from "lucide-react";
import { useBuilder } from "../context";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState } from "react";

export function BuilderHeader({ onAIGenerate }: { onAIGenerate: () => void }) {
  const { state, dispatch } = useBuilder();
  const [editingTitle, setEditingTitle] = useState(false);

  return (
    <header className="bg-background z-50 flex h-12 shrink-0 items-center justify-between border-b px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-md">
            <span className="text-primary-foreground text-xs font-bold">P</span>
          </div>
          <span className="text-sm font-semibold">PostBuilder</span>
        </div>

        <div className="bg-border h-5 w-px" />

        {editingTitle ? (
          <input
            className="border-primary w-48 border-b bg-transparent px-1 py-0.5 text-sm outline-none"
            value={state.projectTitle}
            onChange={(e) =>
              dispatch({
                type: "SET_PROJECT_TITLE",
                payload: { title: e.target.value },
              })
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            autoFocus
          />
        ) : (
          <button
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            onClick={() => setEditingTitle(true)}
          >
            {state.projectTitle}
          </button>
        )}
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={state.undoStack.length === 0}
          className="h-8 w-8 p-0"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "REDO" })}
          disabled={state.redoStack.length === 0}
          className="h-8 w-8 p-0"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <div className="bg-border mx-2 h-5 w-px" />

        <Button
          variant={state.viewMode === "desktop" ? "secondary" : "ghost"}
          size="sm"
          onClick={() =>
            dispatch({ type: "SET_VIEW_MODE", payload: { mode: "desktop" } })
          }
          className="h-8 w-8 p-0"
        >
          <Monitor className="h-4 w-4" />
        </Button>

        <div className="bg-border mx-2 h-5 w-px" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            dispatch({ type: "SET_ZOOM", payload: { zoom: state.zoom - 10 } })
          }
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-muted-foreground min-w-[40px] text-center text-xs font-medium">
          {state.zoom}%
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            dispatch({ type: "SET_ZOOM", payload: { zoom: state.zoom + 10 } })
          }
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5"
          onClick={onAIGenerate}
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Generate
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => dispatch({ type: "TOGGLE_PREVIEW" })}
          title="Preview"
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Save">
          <Save className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium">
            <Download className="h-3.5 w-3.5" />
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
              Current Slide
            </div>
            <DropdownMenuItem>PNG</DropdownMenuItem>
            <DropdownMenuItem>JPG</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
              All Slides
            </div>
            <DropdownMenuItem>ZIP (all as PNG)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
              Carousel
            </div>
            <DropdownMenuItem>PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
