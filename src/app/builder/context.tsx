"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import {
  type BuilderState,
  type BuilderAction,
  type Slide,
  type SlideElement,
  DEFAULT_THEME,
  MAX_SLIDES,
  createDefaultSlide,
  generateId,
} from "./types";

// ─── Initial State ───
const initialState: BuilderState = {
  slides: [createDefaultSlide("intro")],
  activeSlideIndex: 0,
  selectedElementId: null,
  clipboard: null,
  undoStack: [],
  redoStack: [],
  zoom: 100,
  viewMode: "desktop",
  leftPanel: "elements",
  previewMode: false,
  projectTitle: "Untitled Carousel",
  theme: DEFAULT_THEME,
  assets: [],
};

// ─── Save undo snapshot ───
function pushUndo(state: BuilderState): BuilderState {
  return {
    ...state,
    undoStack: [
      ...state.undoStack.slice(-29),
      state.slides.map((s) => ({ ...s, elements: [...s.elements] })),
    ],
    redoStack: [],
  };
}

// ─── Reducer ───
function builderReducer(
  state: BuilderState,
  action: BuilderAction,
): BuilderState {
  switch (action.type) {
    case "ADD_SLIDE": {
      if (state.slides.length >= MAX_SLIDES) return state;
      const newState = pushUndo(state);
      const slide = action.payload?.slide ?? createDefaultSlide("content");
      const index = action.payload?.index ?? newState.slides.length;
      const slides = [...newState.slides];
      slides.splice(index, 0, slide);
      return { ...newState, slides, activeSlideIndex: index };
    }

    case "DELETE_SLIDE": {
      if (state.slides.length <= 1) return state;
      const newState = pushUndo(state);
      const slides = newState.slides.filter(
        (_, i) => i !== action.payload.index,
      );
      const activeSlideIndex = Math.min(
        newState.activeSlideIndex,
        slides.length - 1,
      );
      return { ...newState, slides, activeSlideIndex, selectedElementId: null };
    }

    case "DUPLICATE_SLIDE": {
      if (state.slides.length >= MAX_SLIDES) return state;
      const newState = pushUndo(state);
      const source = newState.slides[action.payload.index];
      if (!source) return state;
      const duplicated: Slide = {
        ...source,
        id: generateId(),
        elements: source.elements.map((el) => ({ ...el, id: generateId() })),
      };
      const slides = [...newState.slides];
      slides.splice(action.payload.index + 1, 0, duplicated);
      return {
        ...newState,
        slides,
        activeSlideIndex: action.payload.index + 1,
      };
    }

    case "REORDER_SLIDES": {
      const newState = pushUndo(state);
      const slides = [...newState.slides];
      const [moved] = slides.splice(action.payload.fromIndex, 1);
      if (!moved) return state;
      slides.splice(action.payload.toIndex, 0, moved);
      return { ...newState, slides, activeSlideIndex: action.payload.toIndex };
    }

    case "SELECT_SLIDE": {
      return {
        ...state,
        activeSlideIndex: action.payload.index,
        selectedElementId: null,
      };
    }

    case "UPDATE_SLIDE": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === action.payload.index ? { ...s, ...action.payload.slide } : s,
      );
      return { ...newState, slides };
    }

    case "SET_BACKGROUND": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? { ...s, background: action.payload.background }
          : s,
      );
      return { ...newState, slides };
    }

    case "ADD_ELEMENT": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? { ...s, elements: [...s.elements, action.payload.element] }
          : s,
      );
      return {
        ...newState,
        slides,
        selectedElementId: action.payload.element.id,
      };
    }

    case "UPDATE_ELEMENT": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === action.payload.id
                  ? ({ ...el, ...action.payload.updates } as SlideElement)
                  : el,
              ),
            }
          : s,
      );
      return { ...newState, slides };
    }

    case "DELETE_ELEMENT": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? {
              ...s,
              elements: s.elements.filter((el) => el.id !== action.payload.id),
            }
          : s,
      );
      return { ...newState, slides, selectedElementId: null };
    }

    case "DUPLICATE_ELEMENT": {
      const newState = pushUndo(state);
      const slide = newState.slides[newState.activeSlideIndex];
      if (!slide) return state;
      const source = slide.elements.find((el) => el.id === action.payload.id);
      if (!source) return state;
      const dup: SlideElement = {
        ...source,
        id: generateId(),
        x: source.x + 20,
        y: source.y + 20,
        name: `${source.name} copy`,
      };
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? { ...s, elements: [...s.elements, dup] }
          : s,
      );
      return { ...newState, slides, selectedElementId: dup.id };
    }

    case "SELECT_ELEMENT": {
      return { ...state, selectedElementId: action.payload.id };
    }

    case "MOVE_ELEMENT_LAYER": {
      const newState = pushUndo(state);
      const slide = newState.slides[newState.activeSlideIndex];
      if (!slide) return state;
      const elements = [...slide.elements];
      const idx = elements.findIndex((el) => el.id === action.payload.id);
      if (idx === -1) return state;

      const dir = action.payload.direction;
      if (dir === "up" && idx < elements.length - 1) {
        [elements[idx], elements[idx + 1]] = [
          elements[idx + 1]!,
          elements[idx]!,
        ];
      } else if (dir === "down" && idx > 0) {
        [elements[idx], elements[idx - 1]] = [
          elements[idx - 1]!,
          elements[idx]!,
        ];
      } else if (dir === "top") {
        const [el] = elements.splice(idx, 1);
        if (el) elements.push(el);
      } else if (dir === "bottom") {
        const [el] = elements.splice(idx, 1);
        if (el) elements.unshift(el);
      }

      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex ? { ...s, elements } : s,
      );
      return { ...newState, slides };
    }

    case "REORDER_ELEMENTS": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? { ...s, elements: action.payload.elements }
          : s,
      );
      return { ...newState, slides };
    }

    case "COPY_ELEMENT": {
      const slide = state.slides[state.activeSlideIndex];
      if (!slide || !state.selectedElementId) return state;
      const el = slide.elements.find((e) => e.id === state.selectedElementId);
      return { ...state, clipboard: el ? { ...el } : null };
    }

    case "PASTE_ELEMENT": {
      if (!state.clipboard) return state;
      const newState = pushUndo(state);
      const pasted: SlideElement = {
        ...state.clipboard,
        id: generateId(),
        x: state.clipboard.x + 20,
        y: state.clipboard.y + 20,
      };
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? { ...s, elements: [...s.elements, pasted] }
          : s,
      );
      return { ...newState, slides, selectedElementId: pasted.id };
    }

    case "UNDO": {
      if (state.undoStack.length === 0) return state;
      const undoStack = [...state.undoStack];
      const prevSlides = undoStack.pop()!;
      return {
        ...state,
        slides: prevSlides,
        undoStack,
        redoStack: [
          ...state.redoStack,
          state.slides.map((s) => ({ ...s, elements: [...s.elements] })),
        ],
        selectedElementId: null,
      };
    }

    case "REDO": {
      if (state.redoStack.length === 0) return state;
      const redoStack = [...state.redoStack];
      const nextSlides = redoStack.pop()!;
      return {
        ...state,
        slides: nextSlides,
        redoStack,
        undoStack: [
          ...state.undoStack,
          state.slides.map((s) => ({ ...s, elements: [...s.elements] })),
        ],
        selectedElementId: null,
      };
    }

    case "SET_ZOOM":
      return {
        ...state,
        zoom: Math.max(25, Math.min(200, action.payload.zoom)),
      };

    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload.mode };

    case "SET_LEFT_PANEL":
      return { ...state, leftPanel: action.payload.panel };

    case "TOGGLE_PREVIEW":
      return {
        ...state,
        previewMode: !state.previewMode,
        selectedElementId: null,
      };

    case "SET_PROJECT_TITLE":
      return { ...state, projectTitle: action.payload.title };

    case "SET_THEME":
      return { ...state, theme: action.payload.theme };

    case "LOAD_SLIDES": {
      return {
        ...state,
        slides: action.payload.slides,
        activeSlideIndex: 0,
        selectedElementId: null,
        undoStack: [],
        redoStack: [],
      };
    }

    case "ADD_ASSET":
      return { ...state, assets: [...state.assets, action.payload.url] };

    case "TOGGLE_ELEMENT_VISIBILITY": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === action.payload.id
                  ? { ...el, visible: !el.visible }
                  : el,
              ),
            }
          : s,
      );
      return { ...newState, slides };
    }

    case "TOGGLE_ELEMENT_LOCK": {
      const newState = pushUndo(state);
      const slides = newState.slides.map((s, i) =>
        i === newState.activeSlideIndex
          ? {
              ...s,
              elements: s.elements.map((el) =>
                el.id === action.payload.id
                  ? { ...el, locked: !el.locked }
                  : el,
              ),
            }
          : s,
      );
      return { ...newState, slides };
    }

    default:
      return state;
  }
}

// ─── Context ───
interface BuilderContextValue {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  activeSlide: Slide | undefined;
  selectedElement: SlideElement | undefined;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
}

// ─── Provider ───
export function BuilderProvider({
  children,
  initialSlides,
}: {
  children: ReactNode;
  initialSlides?: Slide[];
}) {
  const [state, dispatch] = useReducer(builderReducer, {
    ...initialState,
    slides:
      initialSlides && initialSlides.length > 0
        ? initialSlides
        : initialState.slides,
  });

  const activeSlide = state.slides[state.activeSlideIndex];
  const selectedElement = activeSlide?.elements.find(
    (el) => el.id === state.selectedElementId,
  );

  // ─── Keyboard Shortcuts ───
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;

      const isCtrl = e.ctrlKey || e.metaKey;

      if (e.key === "Delete" || e.key === "Backspace") {
        if (state.selectedElementId) {
          e.preventDefault();
          dispatch({
            type: "DELETE_ELEMENT",
            payload: { id: state.selectedElementId },
          });
        }
      }

      if (isCtrl && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      }
      if (isCtrl && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "REDO" });
      }
      if (isCtrl && e.key === "d") {
        e.preventDefault();
        if (state.selectedElementId) {
          dispatch({
            type: "DUPLICATE_ELEMENT",
            payload: { id: state.selectedElementId },
          });
        }
      }
      if (isCtrl && e.key === "c") {
        e.preventDefault();
        dispatch({ type: "COPY_ELEMENT" });
      }
      if (isCtrl && e.key === "v") {
        e.preventDefault();
        dispatch({ type: "PASTE_ELEMENT" });
      }

      // Arrow keys for moving elements
      if (
        state.selectedElementId &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const updates: Record<string, number> = {};
        if (e.key === "ArrowUp") updates.y = -step;
        if (e.key === "ArrowDown") updates.y = step;
        if (e.key === "ArrowLeft") updates.x = -step;
        if (e.key === "ArrowRight") updates.x = step;

        const el = activeSlide?.elements.find(
          (el) => el.id === state.selectedElementId,
        );
        if (el) {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              id: state.selectedElementId,
              updates: {
                x: el.x + (updates.x ?? 0),
                y: el.y + (updates.y ?? 0),
              },
            },
          });
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.selectedElementId, activeSlide, dispatch]);

  return (
    <BuilderContext.Provider
      value={{ state, dispatch, activeSlide, selectedElement }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
