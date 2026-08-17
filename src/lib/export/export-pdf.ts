import { PDFDocument } from "pdf-lib";
import type { Slide } from "~/app/builder/types";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "~/app/builder/types";
import type { ProgressCallback } from "./types";
import { renderSlideToBlob } from "./render-slide";
import { downloadBlob, sanitizeFilename } from "./export-utils";

export interface ExportPdfOptions {
  projectTitle?: string;
  onProgress?: ProgressCallback;
}

/**
 * Export all slides as a multi-page PDF with exact 1080x1350 pt dimensions per page
 */
export async function exportCarouselPDF(
  slides: Slide[],
  options?: ExportPdfOptions,
): Promise<void> {
  if (!slides || slides.length === 0) {
    throw new Error("No slides to export.");
  }

  const pdfDoc = await PDFDocument.create();
  const total = slides.length;
  const projectTitle = options?.projectTitle || "carousel";
  const sanitizedTitle = sanitizeFilename(projectTitle);

  for (let i = 0; i < total; i++) {
    const slide = slides[i]!;

    options?.onProgress?.({
      current: i + 1,
      total,
      percent: Math.round(((i + 0.5) / total) * 100),
      message: `Rendering slide ${i + 1} of ${total} for PDF...`,
    });

    const blob = await renderSlideToBlob(slide, {
      format: "png",
      quality: 1.0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    const imageBytes = await blob.arrayBuffer();
    const embeddedImage = await pdfDoc.embedPng(imageBytes);

    const page = pdfDoc.addPage([CANVAS_WIDTH, CANVAS_HEIGHT]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    options?.onProgress?.({
      current: i + 1,
      total,
      percent: Math.round(((i + 1) / total) * 100),
      message: `Added page ${i + 1} of ${total} to PDF`,
    });
  }

  options?.onProgress?.({
    current: total,
    total,
    percent: 100,
    message: "Generating PDF document...",
  });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

  downloadBlob(pdfBlob, `${sanitizedTitle}.pdf`);
}
