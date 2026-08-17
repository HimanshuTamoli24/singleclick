"use client";

import { useBuilder } from "../../context";
import type {
  TextElement,
  TextAlign,
  TextTransform,
  WatermarkElement,
  CodeElement,
} from "../../types";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { useState } from "react";

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between py-1.5">
        <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "text-muted-foreground h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-1 pb-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

type TextLikeElement = TextElement | WatermarkElement | CodeElement;

export function TextProperties() {
  const { selectedElement, dispatch } = useBuilder();

  if (!selectedElement) return null;

  // This component handles text, code, and watermark elements
  const el = selectedElement as unknown as TextLikeElement;
  const isCode = selectedElement.type === "code";

  const textEl =
    selectedElement.type === "text" ? selectedElement : null;
  const content = "content" in el ? el.content : "";
  const fontFamily = "fontFamily" in el ? el.fontFamily : "Inter, sans-serif";
  const fontSize = "fontSize" in el ? el.fontSize : 48;
  const fontWeight = "fontWeight" in el ? el.fontWeight : 700;
  const color =
    "color" in el
      ? el.color
      : "textColor" in el
        ? el.textColor
        : "#FFFFFF";
  const textAlign = textEl?.textAlign ?? "left";
  const lineHeight = textEl?.lineHeight ?? 1.2;
  const letterSpacing = textEl?.letterSpacing ?? 0;
  const textTransform = textEl?.textTransform ?? "none";

  const update = (updates: Record<string, unknown>) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: el.id, updates } });
  };

  return (
    <div className="space-y-3">
      {/* Content */}
      <Section title="Content">
        <Textarea
          value={content ?? ""}
          onChange={(e) => update({ content: e.target.value })}
          className="min-h-[80px] resize-y text-xs"
          placeholder="Enter text content..."
        />
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-1.5">
          <Label className="text-xs">Font Family</Label>
          <select
            value={fontFamily ?? "Inter, sans-serif"}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className="bg-background h-8 w-full rounded-md border px-2 text-xs"
          >
            <option value="Inter, sans-serif">Inter</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="monospace">Monospace</option>
            <option value="system-ui, sans-serif">System UI</option>
            <option value="Arial, sans-serif">Arial</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Size</Label>
            <Input
              type="number"
              value={fontSize ?? 48}
              onChange={(e) =>
                update({ fontSize: parseInt(e.target.value) || 16 })
              }
              className="h-8 text-xs"
              min={8}
              max={200}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Weight</Label>
            <select
              value={fontWeight ?? 700}
              onChange={(e) => update({ fontWeight: parseInt(e.target.value) })}
              className="bg-background h-8 w-full rounded-md border px-2 text-xs"
            >
              <option value={300}>Light</option>
              <option value={400}>Regular</option>
              <option value={500}>Medium</option>
              <option value={600}>Semibold</option>
              <option value={700}>Bold</option>
              <option value={800}>Extrabold</option>
              <option value={900}>Black</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color ?? "#FFFFFF"}
              onChange={(e) => update({ color: e.target.value })}
              className="h-8 w-8 cursor-pointer rounded border-0 p-0"
            />
            <Input
              value={color ?? "#FFFFFF"}
              onChange={(e) => update({ color: e.target.value })}
              className="h-8 font-mono text-xs"
            />
          </div>
        </div>

        {!isCode && (
          <div className="space-y-1.5">
            <Label className="text-xs">Alignment</Label>
            <div className="flex gap-1">
              {(["left", "center", "right"] as TextAlign[]).map((a) => (
                <Button
                  key={a}
                  variant={textAlign === a ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 w-7 flex-1 p-0"
                  onClick={() => update({ textAlign: a })}
                >
                  {a === "left" && <AlignLeft className="h-3.5 w-3.5" />}
                  {a === "center" && <AlignCenter className="h-3.5 w-3.5" />}
                  {a === "right" && <AlignRight className="h-3.5 w-3.5" />}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Line Height</Label>
            <Input
              type="number"
              step={0.1}
              value={lineHeight ?? 1.2}
              onChange={(e) =>
                update({ lineHeight: parseFloat(e.target.value) || 1.2 })
              }
              className="h-8 text-xs"
              min={0.5}
              max={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Spacing</Label>
            <Input
              type="number"
              value={letterSpacing ?? 0}
              onChange={(e) =>
                update({ letterSpacing: parseFloat(e.target.value) || 0 })
              }
              className="h-8 text-xs"
              min={-5}
              max={20}
            />
          </div>
        </div>

        {!isCode && (
          <div className="space-y-1.5">
            <Label className="text-xs">Transform</Label>
            <div className="flex gap-1">
              {(
                [
                  "none",
                  "uppercase",
                  "lowercase",
                  "capitalize",
                ] as TextTransform[]
              ).map((t) => (
                <Button
                  key={t}
                  variant={textTransform === t ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 flex-1 text-[10px] capitalize"
                  onClick={() => update({ textTransform: t })}
                >
                  {t === "none" ? "Aa" : t.substring(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Position */}
      <Section title="Position" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">X</Label>
            <Input
              type="number"
              value={el.x}
              onChange={(e) => update({ x: parseInt(e.target.value) || 0 })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Y</Label>
            <Input
              type="number"
              value={el.y}
              onChange={(e) => update({ y: parseInt(e.target.value) || 0 })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Width</Label>
            <Input
              type="number"
              value={el.width}
              onChange={(e) =>
                update({ width: parseInt(e.target.value) || 100 })
              }
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Height</Label>
            <Input
              type="number"
              value={el.height}
              onChange={(e) =>
                update({ height: parseInt(e.target.value) || 100 })
              }
              className="h-8 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Rotation</Label>
            <Input
              type="number"
              value={el.rotation}
              onChange={(e) =>
                update({ rotation: parseInt(e.target.value) || 0 })
              }
              className="h-8 text-xs"
              min={-360}
              max={360}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Opacity</Label>
            <Input
              type="number"
              step={0.05}
              value={el.opacity}
              onChange={(e) =>
                update({ opacity: parseFloat(e.target.value) || 1 })
              }
              className="h-8 text-xs"
              min={0}
              max={1}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
