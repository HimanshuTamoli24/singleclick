"use client";

import {
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
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
    <header className="h-12 border-b bg-background flex items-center justify-between px-4 shrink-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">P</span>
          </div>
          <span className="text-sm font-semibold">PostBuilder</span>
        </div>

        <div className="w-px h-5 bg-border" />

        {editingTitle ? (
          <input
            className="text-sm bg-transparent border-b border-primary outline-none px-1 py-0.5 w-48"
            value={state.projectTitle}
            onChange={(e) => dispatch({ type: "SET_PROJECT_TITLE", payload: { title: e.target.value } })}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            autoFocus
          />
        ) : (
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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

        <div className="w-px h-5 bg-border mx-2" />

        <Button
          variant={state.viewMode === "desktop" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: { mode: "desktop" } })}
          className="h-8 w-8 p-0"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant={state.viewMode === "mobile" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: { mode: "mobile" } })}
          className="h-8 w-8 p-0"
        >
          <Smartphone className="h-4 w-4" />
        </Button>

        <div className="w-px h-5 bg-border mx-2" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "SET_ZOOM", payload: { zoom: state.zoom - 10 } })}
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium text-muted-foreground min-w-[40px] text-center">
          {state.zoom}%
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "SET_ZOOM", payload: { zoom: state.zoom + 10 } })}
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={onAIGenerate}>
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
          <DropdownMenuTrigger
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary text-primary-foreground h-8 px-3 text-sm font-medium hover:bg-primary/90 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Current Slide</div>
            <DropdownMenuItem>PNG</DropdownMenuItem>
            <DropdownMenuItem>JPG</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">All Slides</div>
            <DropdownMenuItem>ZIP (all as PNG)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Carousel</div>
            <DropdownMenuItem>PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
