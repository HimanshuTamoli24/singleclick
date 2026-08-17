import { saveAs } from "file-saver";

/**
 * Sanitize filename by removing illegal filesystem characters
 */
export function sanitizeFilename(name: string, fallback = "carousel"): string {
  if (!name || typeof name !== "string") return fallback;
  // Replace illegal filename characters with dashes
  const sanitized = name
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();

  return sanitized || fallback;
}

/**
 * Ensure all document fonts are ready before rendering offscreen
 */
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn("Fonts ready check failed:", e);
    }
  }
}

/**
 * Load an image asynchronously with crossOrigin and timeout handling
 */
export function loadImage(src: string, timeoutMs = 12000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("Image source URL is empty."));
      return;
    }

    const img = new Image();
    // Enable CORS for external image assets
    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }

    let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      timer = null;
      img.onload = null;
      img.onerror = null;
      reject(new Error(`Timed out loading image: ${src.slice(0, 80)}...`));
    }, timeoutMs);

    img.onload = () => {
      if (timer) clearTimeout(timer);
      resolve(img);
    };

    img.onerror = (e) => {
      if (timer) clearTimeout(timer);
      reject(new Error(`Failed to load image: ${src.slice(0, 80)}...`));
    };

    img.src = src;

    // In case image was already cached and loaded synchronously
    if (img.complete && img.naturalWidth !== 0) {
      if (timer) clearTimeout(timer);
      resolve(img);
    }
  });
}

/**
 * Download a Blob using file-saver with memory cleanup
 */
export function downloadBlob(blob: Blob, filename: string): void {
  try {
    saveAs(blob, filename);
  } catch (err) {
    // Fallback using direct anchor tag
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  }
}
