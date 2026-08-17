export type ExportFormat = "png" | "jpeg";

export interface RenderOptions {
  format?: ExportFormat;
  quality?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export interface ExportProgress {
  current: number;
  total: number;
  message?: string;
  percent: number;
}

export type ProgressCallback = (progress: ExportProgress) => void;
