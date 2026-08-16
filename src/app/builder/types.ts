// ─── Canvas Constants ───
export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1350;

// ─── Element Types ───
export type ElementType =
  | "text"
  | "image"
  | "shape"
  | "code"
  | "icon"
  | "watermark";

export type ShapeVariant = "rectangle" | "circle" | "line" | "arrow";

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextAlign = "left" | "center" | "right";
export type ObjectFit = "cover" | "contain" | "fill";

// ─── Background ───
export type BackgroundType = "solid" | "gradient" | "image" | "pattern";
export type GradientType = "linear" | "radial";
export type PatternType =
  | "dots"
  | "grid"
  | "diagonal"
  | "cross"
  | "noise"
  | "waves"
  | "mesh";

export interface SolidBackground {
  type: "solid";
  color: string;
}

export interface GradientBackground {
  type: "gradient";
  gradientType: GradientType;
  colors: string[];
  angle: number;
}

export interface ImageBackground {
  type: "image";
  src: string;
  fit: ObjectFit;
  positionX: number;
  positionY: number;
  scale: number;
  overlayColor: string;
  overlayOpacity: number;
}

export interface PatternBackground {
  type: "pattern";
  pattern: PatternType;
  patternColor: string;
  backgroundColor: string;
  opacity: number;
  size: number;
  rotation: number;
}

export interface PresetBackground {
  type: "preset";
  presetId: string;
  name?: string;
  style: React.CSSProperties & Record<string, any>;
}

export type Background =
  | SolidBackground
  | GradientBackground
  | ImageBackground
  | PatternBackground
  | PresetBackground;

// ─── Base Element ───
export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  name: string;
}

// ─── Text Element ───
export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: TextAlign;
  lineHeight: number;
  letterSpacing: number;
  textTransform: TextTransform;
}

// ─── Image Element ───
export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  fit: ObjectFit;
  borderRadius: number;
  brightness: number;
  contrast: number;
  blur: number;
}

// ─── Shape Element ───
export interface ShapeElement extends BaseElement {
  type: "shape";
  variant: ShapeVariant;
  fill: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

// ─── Code Element ───
export interface CodeElement extends BaseElement {
  type: "code";
  content: string;
  language: string;
  theme: "dark" | "light";
  fontFamily: string;
  fontSize: number;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
}

// ─── Icon Element ───
export interface IconElement extends BaseElement {
  type: "icon";
  iconName: string;
  color: string;
  size: number;
}

// ─── Watermark Element ───
export interface WatermarkElement extends BaseElement {
  type: "watermark";
  content: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  position: "bottom-left" | "bottom-center" | "bottom-right";
}

// ─── Union Element ───
export type SlideElement =
  | TextElement
  | ImageElement
  | ShapeElement
  | CodeElement
  | IconElement
  | WatermarkElement;

// ─── Slide Types ───
export type SlideType =
  | "intro"
  | "content"
  | "code"
  | "comparison"
  | "steps"
  | "checklist"
  | "quote"
  | "stat"
  | "tip"
  | "warning"
  | "example"
  | "diagram"
  | "table"
  | "outro";

// ─── Slide ───
export interface Slide {
  id: string;
  slideType: SlideType;
  elements: SlideElement[];
  background: Background;
}

// ─── Theme ───
export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    code: string;
  };
}

// ─── Left Panel Tabs ───
export type LeftPanelTab =
  | "slides"
  | "templates"
  | "elements"
  | "assets"
  | "background";

// ─── View Mode ───
export type ViewMode = "desktop" | "mobile";

// ─── Project ───
export interface CarouselProject {
  title: string;
  slides: Slide[];
  theme: Theme;
  canvasWidth: number;
  canvasHeight: number;
}

// ─── Builder State ───
export interface BuilderState {
  slides: Slide[];
  activeSlideIndex: number;
  selectedElementId: string | null;
  clipboard: SlideElement | null;
  undoStack: Slide[][];
  redoStack: Slide[][];
  zoom: number;
  viewMode: ViewMode;
  leftPanel: LeftPanelTab;
  previewMode: boolean;
  projectTitle: string;
  theme: Theme;
  assets: string[]; // base64 or object URLs
}

// ─── Builder Actions ───
export type BuilderAction =
  | { type: "ADD_SLIDE"; payload?: { slide?: Slide; index?: number } }
  | { type: "DELETE_SLIDE"; payload: { index: number } }
  | { type: "DUPLICATE_SLIDE"; payload: { index: number } }
  | { type: "REORDER_SLIDES"; payload: { fromIndex: number; toIndex: number } }
  | { type: "SELECT_SLIDE"; payload: { index: number } }
  | { type: "UPDATE_SLIDE"; payload: { index: number; slide: Partial<Slide> } }
  | { type: "SET_BACKGROUND"; payload: { background: Background } }
  | { type: "ADD_ELEMENT"; payload: { element: SlideElement } }
  | { type: "UPDATE_ELEMENT"; payload: { id: string; updates: Partial<SlideElement> } }
  | { type: "DELETE_ELEMENT"; payload: { id: string } }
  | { type: "DUPLICATE_ELEMENT"; payload: { id: string } }
  | { type: "SELECT_ELEMENT"; payload: { id: string | null } }
  | { type: "MOVE_ELEMENT_LAYER"; payload: { id: string; direction: "up" | "down" | "top" | "bottom" } }
  | { type: "COPY_ELEMENT" }
  | { type: "PASTE_ELEMENT" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_ZOOM"; payload: { zoom: number } }
  | { type: "SET_VIEW_MODE"; payload: { mode: ViewMode } }
  | { type: "SET_LEFT_PANEL"; payload: { panel: LeftPanelTab } }
  | { type: "TOGGLE_PREVIEW" }
  | { type: "SET_PROJECT_TITLE"; payload: { title: string } }
  | { type: "SET_THEME"; payload: { theme: Theme } }
  | { type: "LOAD_SLIDES"; payload: { slides: Slide[] } }
  | { type: "ADD_ASSET"; payload: { url: string } }
  | { type: "TOGGLE_ELEMENT_VISIBILITY"; payload: { id: string } }
  | { type: "TOGGLE_ELEMENT_LOCK"; payload: { id: string } };

// ─── Helpers ───
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ─── Default Theme ───
export const DEFAULT_THEME: Theme = {
  id: "minimal",
  name: "Minimal",
  colors: {
    primary: "#0A0A0A",
    secondary: "#FFFFFF",
    background: "#0A0A0A",
    text: "#FFFFFF",
    accent: "#3B82F6",
    muted: "#6B7280",
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
    code: "monospace",
  },
};

// ─── Default Slide ───
export function createDefaultSlide(slideType: SlideType = "content"): Slide {
  return {
    id: generateId(),
    slideType,
    elements: [],
    background: { type: "solid", color: "#0A0A0A" },
  };
}

// ─── Default Element Factories ───
export function createTextElement(overrides: Partial<TextElement> = {}): TextElement {
  return {
    id: generateId(),
    type: "text",
    x: 100,
    y: 200,
    width: 880,
    height: 120,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    name: "Text",
    content: "Your text here",
    fontFamily: "Inter, sans-serif",
    fontSize: 48,
    fontWeight: 700,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 1.2,
    letterSpacing: 0,
    textTransform: "none",
    ...overrides,
  };
}

export function createImageElement(overrides: Partial<ImageElement> = {}): ImageElement {
  return {
    id: generateId(),
    type: "image",
    x: 200,
    y: 300,
    width: 680,
    height: 500,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    name: "Image",
    src: "",
    fit: "cover",
    borderRadius: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
    ...overrides,
  };
}

export function createShapeElement(overrides: Partial<ShapeElement> = {}): ShapeElement {
  return {
    id: generateId(),
    type: "shape",
    x: 300,
    y: 400,
    width: 480,
    height: 480,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    name: "Shape",
    variant: "rectangle",
    fill: "#3B82F6",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 12,
    shadowColor: "transparent",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    ...overrides,
  };
}

export function createCodeElement(overrides: Partial<CodeElement> = {}): CodeElement {
  return {
    id: generateId(),
    type: "code",
    x: 80,
    y: 500,
    width: 920,
    height: 300,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    name: "Code Block",
    content: "// your code here",
    language: "typescript",
    theme: "dark",
    fontFamily: "monospace",
    fontSize: 24,
    backgroundColor: "#1E1E1E",
    textColor: "#D4D4D4",
    borderRadius: 12,
    ...overrides,
  };
}

export function createWatermarkElement(overrides: Partial<WatermarkElement> = {}): WatermarkElement {
  return {
    id: generateId(),
    type: "watermark",
    x: 40,
    y: 1280,
    width: 200,
    height: 40,
    rotation: 0,
    opacity: 0.5,
    locked: false,
    visible: true,
    name: "Watermark",
    content: "@yourhandle",
    fontFamily: "Inter, sans-serif",
    fontSize: 18,
    color: "#FFFFFF",
    position: "bottom-left",
    ...overrides,
  };
}
