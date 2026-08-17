import type { Slide, SlideElement, Background } from "~/app/builder/types";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "~/app/builder/types";
import type { RenderOptions } from "./types";
import { ensureFontsLoaded, loadImage } from "./export-utils";

/**
 * Render any CSS background / pattern / preset onto the canvas
 */
async function renderBackground(
  ctx: CanvasRenderingContext2D,
  bg: Background,
  width: number,
  height: number,
): Promise<void> {
  ctx.save();

  switch (bg.type) {
    case "solid": {
      const color = bg.color || "#0A0A0A";
      if (color.includes("gradient") || color.includes(",")) {
        // Complex gradient string inside solid color field
        await renderCssBackground(ctx, color, width, height);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
      }
      break;
    }

    case "gradient": {
      const colors = bg.colors && bg.colors.length > 0 ? bg.colors : ["#4F46E5", "#06B6D4"];
      if (bg.gradientType === "radial") {
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.max(width, height) / 1.5;
        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        colors.forEach((col, idx) => {
          radGrad.addColorStop(idx / Math.max(1, colors.length - 1), col);
        });
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Linear gradient with angle
        const angleRad = ((bg.angle ?? 90) - 90) * (Math.PI / 180);
        const cx = width / 2;
        const cy = height / 2;
        const length = Math.abs(width * Math.cos(angleRad)) + Math.abs(height * Math.sin(angleRad));
        const halfLen = length / 2;

        const x0 = cx - Math.cos(angleRad) * halfLen;
        const y0 = cy - Math.sin(angleRad) * halfLen;
        const x1 = cx + Math.cos(angleRad) * halfLen;
        const y1 = cy + Math.sin(angleRad) * halfLen;

        const linGrad = ctx.createLinearGradient(x0, y0, x1, y1);
        colors.forEach((col, idx) => {
          linGrad.addColorStop(idx / Math.max(1, colors.length - 1), col);
        });
        ctx.fillStyle = linGrad;
        ctx.fillRect(0, 0, width, height);
      }
      break;
    }

    case "preset": {
      const styleBg =
        (bg.style as Record<string, string>)?.background ||
        (bg.style as Record<string, string>)?.backgroundColor ||
        "#0A0A0A";
      await renderCssBackground(ctx, styleBg, width, height);
      break;
    }

    case "image": {
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      if (bg.src) {
        try {
          const img = await loadImage(bg.src);
          const posX = (bg.positionX ?? 50) / 100;
          const posY = (bg.positionY ?? 50) / 100;
          drawImageCover(ctx, img, 0, 0, width, height, posX, posY);
        } catch (e) {
          console.warn("Failed to load background image:", e);
        }
      }

      // Overlay
      if (bg.overlayOpacity && bg.overlayOpacity > 0) {
        ctx.fillStyle = bg.overlayColor || "#000000";
        ctx.globalAlpha = bg.overlayOpacity / 100;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }
      break;
    }

    case "pattern": {
      ctx.fillStyle = bg.backgroundColor || "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Render pattern overlay
      await renderPatternOverlay(ctx, bg, width, height);
      break;
    }

    default:
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

/**
 * Render any CSS background string into Canvas using an SVG ForeignObject
 */
async function renderCssBackground(
  ctx: CanvasRenderingContext2D,
  cssBackground: string,
  width: number,
  height: number,
): Promise<void> {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;background:${cssBackground.replace(/"/g, "'")};"></div>
      </foreignObject>
    </svg>
  `;
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  try {
    const img = await loadImage(dataUrl);
    ctx.drawImage(img, 0, 0, width, height);
  } catch (e) {
    // Fallback: simple fill
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, height);
  }
}

/**
 * Render procedural pattern overlays (dots, grid, diagonal, cross, noise, waves, mesh)
 */
async function renderPatternOverlay(
  ctx: CanvasRenderingContext2D,
  bg: Extract<Background, { type: "pattern" }>,
  width: number,
  height: number,
): Promise<void> {
  const size = bg.size || 24;
  const color = bg.patternColor || "rgba(255,255,255,0.15)";
  const patternSVGs: Record<string, string> = {
    dots: `<circle cx="${size / 2}" cy="${size / 2}" r="1.5" fill="${color}" />`,
    grid: `<path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${color}" stroke-width="0.5"/>`,
    diagonal: `<path d="M 0 ${size} L ${size} 0" stroke="${color}" stroke-width="0.5"/>`,
    cross: `<path d="M ${size / 2} 0 L ${size / 2} ${size} M 0 ${size / 2} L ${size} ${size / 2}" stroke="${color}" stroke-width="0.5"/>`,
    noise: `<rect width="${size}" height="${size}" fill="${color}" opacity="0.05"/>`,
    waves: `<path d="M 0 ${size / 2} Q ${size / 4} 0, ${size / 2} ${size / 2} T ${size} ${size / 2}" fill="none" stroke="${color}" stroke-width="0.5"/>`,
    mesh: `<circle cx="0" cy="0" r="${size / 3}" fill="none" stroke="${color}" stroke-width="0.3"/><circle cx="${size}" cy="${size}" r="${size / 3}" fill="none" stroke="${color}" stroke-width="0.3"/>`,
  };

  const svgContent = patternSVGs[bg.pattern] ?? patternSVGs.dots;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${svgContent}</svg>`;
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  try {
    const patternImg = await loadImage(dataUrl);
    const pattern = ctx.createPattern(patternImg, "repeat");
    if (pattern) {
      ctx.save();
      ctx.globalAlpha = bg.opacity ?? 0.5;
      if (bg.rotation) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate((bg.rotation * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
      }
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  } catch (e) {
    console.warn("Pattern render error:", e);
  }
}

/**
 * Draw an image fitted as "cover" with positioning
 */
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  posX = 0.5,
  posY = 0.5,
): void {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = w / h;

  let sx = 0;
  let sy = 0;
  let sWidth = img.naturalWidth;
  let sHeight = img.naturalHeight;

  if (imgRatio > targetRatio) {
    sWidth = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sWidth) * posX;
  } else {
    sHeight = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sHeight) * posY;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

/**
 * Word wrap helper for canvas text
 */
function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");

  for (const para of paragraphs) {
    if (para === "") {
      lines.push("");
      continue;
    }

    const words = para.split(" ");
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i]!;
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Render single element onto canvas
 */
async function renderElement(
  ctx: CanvasRenderingContext2D,
  el: SlideElement,
): Promise<void> {
  if (!el.visible) return;

  ctx.save();
  ctx.globalAlpha = el.opacity ?? 1;

  // Apply rotation
  if (el.rotation) {
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    ctx.translate(cx, cy);
    ctx.rotate((el.rotation * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  switch (el.type) {
    case "text": {
      const fontFamily = el.fontFamily || "Inter";
      const fontSize = el.fontSize || 48;
      const fontWeight = el.fontWeight || 600;
      const lineHeight = (el.lineHeight ?? 1.2) * fontSize;
      const textAlign = el.textAlign || "left";
      const color = el.color || "#FFFFFF";

      ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = "top";

      let textContent = el.content || "";
      if (el.textTransform === "uppercase") textContent = textContent.toUpperCase();
      if (el.textTransform === "lowercase") textContent = textContent.toLowerCase();

      const lines = wrapTextLines(ctx, textContent, el.width);
      let startX = el.x;
      if (textAlign === "center") startX = el.x + el.width / 2;
      else if (textAlign === "right") startX = el.x + el.width;

      lines.forEach((line, idx) => {
        const lineY = el.y + idx * lineHeight;
        if (lineY + fontSize <= el.y + el.height + 40) {
          ctx.fillText(line, startX, lineY);
        }
      });
      break;
    }

    case "code": {
      // Background card
      ctx.fillStyle = el.backgroundColor || "#1E1E1E";
      const r = el.borderRadius ?? 16;
      ctx.beginPath();
      ctx.roundRect(el.x, el.y, el.width, el.height, r);
      ctx.fill();

      // Text inside code box
      const padding = 24;
      const fontSize = el.fontSize || 24;
      const fontFamily = el.fontFamily || "JetBrains Mono, monospace";
      const color = el.textColor || "#E5E7EB";
      const lineHeight = fontSize * 1.5;

      ctx.font = `400 ${fontSize}px "${fontFamily}", monospace`;
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const lines = (el.content || "").split("\n");
      lines.forEach((line, idx) => {
        const lineY = el.y + padding + idx * lineHeight;
        if (lineY + fontSize <= el.y + el.height - padding) {
          ctx.fillText(line, el.x + padding, lineY);
        }
      });
      break;
    }

    case "image": {
      if (!el.src) break;
      try {
        const img = await loadImage(el.src);
        const r = el.borderRadius ?? 0;

        ctx.save();
        if (r > 0) {
          ctx.beginPath();
          ctx.roundRect(el.x, el.y, el.width, el.height, r);
          ctx.clip();
        }

        if (el.fit === "cover") {
          drawImageCover(ctx, img, el.x, el.y, el.width, el.height);
        } else if (el.fit === "contain") {
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const boxRatio = el.width / el.height;
          let dw = el.width;
          let dh = el.height;
          let dx = el.x;
          let dy = el.y;
          if (imgRatio > boxRatio) {
            dh = el.width / imgRatio;
            dy = el.y + (el.height - dh) / 2;
          } else {
            dw = el.height * imgRatio;
            dx = el.x + (el.width - dw) / 2;
          }
          ctx.drawImage(img, dx, dy, dw, dh);
        } else {
          ctx.drawImage(img, el.x, el.y, el.width, el.height);
        }

        ctx.restore();
      } catch (e) {
        console.warn("Failed to render slide image element:", e);
      }
      break;
    }

    case "shape": {
      ctx.save();
      const isCircle = el.variant === "circle";
      const r = isCircle ? el.width / 2 : el.borderRadius ?? 0;

      // Shadow
      if (el.shadowBlur && el.shadowBlur > 0) {
        ctx.shadowColor = el.shadowColor || "rgba(0,0,0,0.3)";
        ctx.shadowBlur = el.shadowBlur;
        ctx.shadowOffsetX = el.shadowOffsetX || 0;
        ctx.shadowOffsetY = el.shadowOffsetY || 0;
      }

      ctx.beginPath();
      if (isCircle) {
        ctx.arc(el.x + el.width / 2, el.y + el.height / 2, Math.min(el.width, el.height) / 2, 0, Math.PI * 2);
      } else {
        ctx.roundRect(el.x, el.y, el.width, el.height, r);
      }

      ctx.fillStyle = el.fill || "#3B82F6";
      ctx.fill();

      // Reset shadow for stroke
      ctx.shadowColor = "transparent";

      if (el.borderWidth && el.borderWidth > 0) {
        ctx.lineWidth = el.borderWidth;
        ctx.strokeStyle = el.borderColor || "#FFFFFF";
        ctx.stroke();
      }

      ctx.restore();
      break;
    }

    case "icon": {
      ctx.font = `${el.size || 48}px sans-serif`;
      ctx.fillStyle = el.color || "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("⬟", el.x + el.width / 2, el.y + el.height / 2);
      break;
    }

    case "watermark": {
      const fontSize = el.fontSize || 24;
      const fontFamily = el.fontFamily || "Inter";
      ctx.font = `500 ${fontSize}px "${fontFamily}", sans-serif`;
      ctx.fillStyle = el.color || "#FFFFFF";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(el.content || "", el.x, el.y + el.height / 2);
      break;
    }
  }

  ctx.restore();
}

/**
 * Render a Slide to an HTML5 Offscreen Canvas at exactly 1080x1350
 */
export async function renderSlideToCanvas(
  slide: Slide,
  options?: RenderOptions,
): Promise<HTMLCanvasElement> {
  await ensureFontsLoaded();

  const width = options?.width || CANVAS_WIDTH;
  const height = options?.height || CANVAS_HEIGHT;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { alpha: options?.format !== "jpeg" });
  if (!ctx) {
    throw new Error("Unable to create 2D canvas rendering context.");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // If JPEG, fill fallback white background
  if (options?.format === "jpeg") {
    ctx.fillStyle = options.backgroundColor || "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  // 1. Render Background
  await renderBackground(ctx, slide.background, width, height);

  // 2. Render Elements in layer order
  const elements = slide.elements || [];
  for (const el of elements) {
    await renderElement(ctx, el);
  }

  return canvas;
}

/**
 * Central Rendering Function: Render a Slide to a PNG or JPEG Blob
 */
export async function renderSlideToBlob(
  slide: Slide,
  options?: RenderOptions,
): Promise<Blob> {
  const canvas = await renderSlideToCanvas(slide, options);
  const format = options?.format === "jpeg" ? "image/jpeg" : "image/png";
  const quality = options?.quality ?? (options?.format === "jpeg" ? 0.95 : 1.0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        // Clean up canvas
        canvas.width = 0;
        canvas.height = 0;
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to export slide canvas to Blob."));
        }
      },
      format,
      quality,
    );
  });
}
