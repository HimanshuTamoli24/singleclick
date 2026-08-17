import type { Slide } from "~/app/builder/types";
import type { ExportFormat } from "./types";
import { renderSlideToBlob } from "./render-slide";
import { downloadBlob, sanitizeFilename } from "./export-utils";

export interface ExportSingleSlideOptions {
  format?: ExportFormat;
  quality?: number;
  projectTitle?: string;
}

/**
 * Export a single slide as PNG or JPG
 */
export async function exportCurrentSlide(
  slide: Slide,
  index: number,
  options?: ExportSingleSlideOptions,
): Promise<void> {
  const format = options?.format ?? "png";
  const quality = options?.quality ?? (format === "jpeg" ? 0.95 : 1.0);
  const ext = format === "jpeg" ? "jpg" : "png";
  const slideNum = String(index + 1).padStart(2, "0");

  const baseTitle = options?.projectTitle ? sanitizeFilename(options.projectTitle) : "";
  const filename = baseTitle
    ? `${baseTitle}-slide-${slideNum}.${ext}`
    : `slide-${slideNum}.${ext}`;

  const blob = await renderSlideToBlob(slide, {
    format,
    quality,
  });

  downloadBlob(blob, filename);
}
