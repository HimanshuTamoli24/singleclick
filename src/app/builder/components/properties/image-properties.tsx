"use client";

import { useBuilder } from "../../context";
import type { ImageElement, ObjectFit } from "../../types";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import { Button } from "~/components/ui/button";
import { useRef } from "react";

export function ImageProperties() {
  const { selectedElement, dispatch } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!selectedElement || selectedElement.type !== "image") return null;

  const el = selectedElement as ImageElement;

  const update = (updates: Partial<ImageElement>) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: el.id, updates } });
  };

  const handleReplace = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        update({ src: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      {/* Image actions */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image</Label>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={handleReplace}>
            Replace
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs text-destructive hover:text-destructive"
            onClick={() => update({ src: "" })}
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Fit */}
      <div className="space-y-1.5">
        <Label className="text-xs">Fit</Label>
        <div className="flex gap-1">
          {(["cover", "contain", "fill"] as ObjectFit[]).map((f) => (
            <Button
              key={f}
              variant={el.fit === f ? "secondary" : "ghost"}
              size="sm"
              className="flex-1 h-7 text-xs capitalize"
              onClick={() => update({ fit: f })}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-1.5">
        <Label className="text-xs">Border Radius</Label>
        <Slider
          value={[el.borderRadius]}
          onValueChange={([v]) => update({ borderRadius: v ?? 0 })}
          min={0}
          max={100}
          step={1}
        />
      </div>

      {/* Position */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Position</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px]">X</Label>
            <Input
              type="number"
              value={el.x}
              onChange={(e) => update({ x: parseInt(e.target.value) || 0 })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">Y</Label>
            <Input
              type="number"
              value={el.y}
              onChange={(e) => update({ y: parseInt(e.target.value) || 0 })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">Width</Label>
            <Input
              type="number"
              value={el.width}
              onChange={(e) => update({ width: parseInt(e.target.value) || 100 })}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">Height</Label>
            <Input
              type="number"
              value={el.height}
              onChange={(e) => update({ height: parseInt(e.target.value) || 100 })}
              className="h-8 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filters</Label>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Brightness ({el.brightness}%)</Label>
          <Slider
            value={[el.brightness]}
            onValueChange={([v]) => update({ brightness: v ?? 100 })}
            min={0}
            max={200}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Contrast ({el.contrast}%)</Label>
          <Slider
            value={[el.contrast]}
            onValueChange={([v]) => update({ contrast: v ?? 100 })}
            min={0}
            max={200}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Blur ({el.blur}px)</Label>
          <Slider
            value={[el.blur]}
            onValueChange={([v]) => update({ blur: v ?? 0 })}
            min={0}
            max={20}
          />
        </div>
      </div>

      {/* Rotation & Opacity */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Rotation</Label>
          <Input
            type="number"
            value={el.rotation}
            onChange={(e) => update({ rotation: parseInt(e.target.value) || 0 })}
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
            onChange={(e) => update({ opacity: parseFloat(e.target.value) || 1 })}
            className="h-8 text-xs"
            min={0}
            max={1}
          />
        </div>
      </div>
    </div>
  );
}
