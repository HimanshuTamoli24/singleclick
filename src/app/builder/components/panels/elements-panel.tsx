"use client";

import {
  Type,
  Heading1,
  AlignLeft,
  Image as ImageIcon,
  Square,
  Circle,
  Minus,
  Code2,
  Quote,
  Badge,
  AtSign,
} from "lucide-react";
import { useBuilder } from "../../context";
import {
  createTextElement,
  createImageElement,
  createShapeElement,
  createCodeElement,
  createWatermarkElement,
} from "../../types";
import { Button } from "~/components/ui/button";

interface ElementItem {
  label: string;
  icon: React.ElementType;
  action: () => void;
}

export function ElementsPanel() {
  const { dispatch } = useBuilder();

  const textItems: ElementItem[] = [
    {
      label: "Heading",
      icon: Heading1,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createTextElement({
              name: "Heading",
              content: "Heading Text",
              fontSize: 64,
              fontWeight: 800,
            }),
          },
        }),
    },
    {
      label: "Subtitle",
      icon: Type,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createTextElement({
              name: "Subtitle",
              content: "Subtitle text here",
              fontSize: 32,
              fontWeight: 500,
              y: 350,
            }),
          },
        }),
    },
    {
      label: "Paragraph",
      icon: AlignLeft,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createTextElement({
              name: "Paragraph",
              content: "Write your paragraph text here. Make it informative and engaging.",
              fontSize: 24,
              fontWeight: 400,
              y: 500,
              height: 200,
            }),
          },
        }),
    },
  ];

  const mediaItems: ElementItem[] = [
    {
      label: "Image",
      icon: ImageIcon,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: { element: createImageElement() },
        }),
    },
  ];

  const shapeItems: ElementItem[] = [
    {
      label: "Rectangle",
      icon: Square,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createShapeElement({ name: "Rectangle", variant: "rectangle" }),
          },
        }),
    },
    {
      label: "Circle",
      icon: Circle,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createShapeElement({
              name: "Circle",
              variant: "circle",
              width: 300,
              height: 300,
            }),
          },
        }),
    },
    {
      label: "Line",
      icon: Minus,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createShapeElement({
              name: "Line",
              variant: "line",
              width: 500,
              height: 4,
              borderRadius: 0,
            }),
          },
        }),
    },
  ];

  const contentItems: ElementItem[] = [
    {
      label: "Code Block",
      icon: Code2,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: { element: createCodeElement() },
        }),
    },
    {
      label: "Quote",
      icon: Quote,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createTextElement({
              name: "Quote",
              content: '"Your inspiring quote here"',
              fontSize: 36,
              fontWeight: 500,
              fontFamily: "Georgia, serif",
              textAlign: "center",
              y: 500,
            }),
          },
        }),
    },
    {
      label: "Badge",
      icon: Badge,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            element: createShapeElement({
              name: "Badge",
              width: 200,
              height: 50,
              fill: "#3B82F6",
              borderRadius: 25,
              x: 440,
              y: 100,
            }),
          },
        }),
    },
  ];

  const brandItems: ElementItem[] = [
    {
      label: "Watermark",
      icon: AtSign,
      action: () =>
        dispatch({
          type: "ADD_ELEMENT",
          payload: { element: createWatermarkElement() },
        }),
    },
  ];

  const sections = [
    { title: "Text", items: textItems },
    { title: "Media", items: mediaItems },
    { title: "Shapes", items: shapeItems },
    { title: "Content", items: contentItems },
    { title: "Brand", items: brandItems },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Add Elements
      </h4>

      {sections.map((section) => (
        <div key={section.title} className="space-y-1.5">
          <h5 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {section.title}
          </h5>
          <div className="grid grid-cols-2 gap-1.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  className="h-9 justify-start gap-2 text-xs"
                  onClick={item.action}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
