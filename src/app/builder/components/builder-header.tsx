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
  Loader2,
  FileImage,
  FileArchive,
  FileText,
} from "lucide-react";
import { useBuilder } from "../context";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import {
  exportCurrentSlide,
  exportAllSlidesAsZip,
  exportCarouselPDF,
} from "~/lib/export";
import AnimatedLogo from "~/components/ui/animated-logo";

export function BuilderHeader({ onAIGenerate }: { onAIGenerate: () => void }) {
  const { state, dispatch, activeSlide } = useBuilder();
  const [editingTitle, setEditingTitle] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCurrent = async (format: "png" | "jpeg") => {
    if (!activeSlide) {
      toast.error("No active slide to export.");
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading(
      `Exporting Slide ${state.activeSlideIndex + 1} (${format.toUpperCase()})...`,
    );

    try {
      await exportCurrentSlide(activeSlide, state.activeSlideIndex, {
        format,
        projectTitle: state.projectTitle,
      });
      toast.success(
        `Slide ${state.activeSlideIndex + 1} exported successfully!`,
        { id: toastId },
      );
    } catch (err: unknown) {
      console.error("Export error:", err);
      const msg = err instanceof Error ? err.message : "Export failed";
      toast.error(msg, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportZip = async (format: "png" | "jpeg") => {
    if (!state.slides || state.slides.length === 0) {
      toast.error("No slides to export.");
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading(
      `Preparing ${state.slides.length} slides for ZIP export...`,
    );

    try {
      await exportAllSlidesAsZip(state.slides, {
        format,
        projectTitle: state.projectTitle,
        onProgress: (p) => {
          toast.loading(
            p.message || `Processing slide ${p.current} of ${p.total}...`,
            { id: toastId },
          );
        },
      });
      toast.success(`Exported ${state.slides.length} slides as ZIP!`, {
        id: toastId,
      });
    } catch (err: unknown) {
      console.error("ZIP Export error:", err);
      const msg = err instanceof Error ? err.message : "ZIP Export failed";
      toast.error(msg, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!state.slides || state.slides.length === 0) {
      toast.error("No slides to export.");
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading(
      `Generating PDF for ${state.slides.length} slides...`,
    );

    try {
      await exportCarouselPDF(state.slides, {
        projectTitle: state.projectTitle,
        onProgress: (p) => {
          toast.loading(
            p.message || `Rendering slide ${p.current} of ${p.total}...`,
            { id: toastId },
          );
        },
      });
      toast.success(`Exported carousel PDF successfully!`, { id: toastId });
    } catch (err: unknown) {
      console.error("PDF Export error:", err);
      const msg = err instanceof Error ? err.message : "PDF Export failed";
      toast.error(msg, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="bg-background z-50 flex h-12 shrink-0 items-center justify-between border-b px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <AnimatedLogo />
          <span className="text-sm font-semibold">Single Click</span>
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
            className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
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
          className="h-8 w-8 cursor-pointer p-0"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "REDO" })}
          disabled={state.redoStack.length === 0}
          className="h-8 w-8 cursor-pointer p-0"
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
          className="h-8 w-8 cursor-pointer p-0"
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
          className="h-8 w-8 cursor-pointer p-0"
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
          className="h-8 w-8 cursor-pointer p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer gap-1.5"
          onClick={onAIGenerate}
        >
          <Sparkles className="text-primary h-3.5 w-3.5" />
          AI Generate
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 cursor-pointer p-0"
          onClick={() => dispatch({ type: "TOGGLE_PREVIEW" })}
          title="Preview Mode"
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 cursor-pointer p-0"
          title="Save"
        >
          <Save className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={isExporting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                Current Slide
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleExportCurrent("png")}
                disabled={isExporting}
              >
                <FileImage className="h-4 w-4 text-blue-500" />
                <span>Export as PNG</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleExportCurrent("jpeg")}
                disabled={isExporting}
              >
                <FileImage className="h-4 w-4 text-amber-500" />
                <span>Export as JPG</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                All Slides ({state.slides.length})
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleExportZip("png")}
                disabled={isExporting}
              >
                <FileArchive className="h-4 w-4 text-emerald-500" />
                <span>PNG Images (ZIP)</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleExportZip("jpeg")}
                disabled={isExporting}
              >
                <FileArchive className="h-4 w-4 text-emerald-500" />
                <span>JPG Images (ZIP)</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                Carousel Document
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={handleExportPdf}
                disabled={isExporting}
              >
                <FileText className="h-4 w-4 text-red-500" />
                <span>Download PDF</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
