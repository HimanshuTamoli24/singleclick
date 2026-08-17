import JSZip from "jszip";
import type { Slide } from "~/app/builder/types";
import type { ExportFormat, ProgressCallback } from "./types";
import { renderSlideToBlob } from "./render-slide";
import { downloadBlob, sanitizeFilename } from "./export-utils";

export interface ExportZipOptions {
  format?: ExportFormat;
  quality?: number;
  projectTitle?: string;
  onProgress?: ProgressCallback;
}

/**
 * Export all slides packaged inside a ZIP file (PNG or JPG)
 */
export async function exportAllSlidesAsZip(
  slides: Slide[],
  options?: ExportZipOptions,
): Promise<void> {
  if (!slides || slides.length === 0) {
    throw new Error("No slides to export.");
  }

  const format = options?.format ?? "png";
  const quality = options?.quality ?? (format === "jpeg" ? 0.95 : 1.0);
  const ext = format === "jpeg" ? "jpg" : "png";
  const zip = new JSZip();

  const total = slides.length;
  const projectTitle = options?.projectTitle || "carousel";
  const sanitizedTitle = sanitizeFilename(projectTitle);
  const folderName = sanitizedTitle;
  const folder = zip.folder(folderName) ?? zip;

  for (let i = 0; i < total; i++) {
    const slide = slides[i]!;
    const slideNumber = String(i + 1).padStart(2, "0");

    options?.onProgress?.({
      current: i + 1,
      total,
      percent: Math.round(((i + 0.5) / total) * 100),
      message: `Rendering slide ${i + 1} of ${total}...`,
    });

    const blob = await renderSlideToBlob(slide, {
      format,
      quality,
    });

    folder.file(`slide-${slideNumber}.${ext}`, blob);

    options?.onProgress?.({
      current: i + 1,
      total,
      percent: Math.round(((i + 1) / total) * 100),
      message: `Added slide ${i + 1} of ${total} to archive`,
    });
  }

  options?.onProgress?.({
    current: total,
    total,
    percent: 100,
    message: "Compressing ZIP archive...",
  });

  const zipBlob = await zip.generateAsync(
    {
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      options?.onProgress?.({
        current: total,
        total,
        percent: Math.round(metadata.percent),
        message: `Compressing ZIP (${Math.round(metadata.percent)}%)...`,
      });
    },
  );

  const zipFilename = format === "jpeg"
    ? `${sanitizedTitle}-jpg.zip`
    : `${sanitizedTitle}.zip`;

  downloadBlob(zipBlob, zipFilename);
}
