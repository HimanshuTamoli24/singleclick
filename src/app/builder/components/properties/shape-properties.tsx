"use client";

import { useBuilder } from "../../context";
import type { ShapeElement } from "../../types";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

export function ShapeProperties() {
  const { selectedElement, dispatch } = useBuilder();

  if (selectedElement?.type !== "shape") return null;

  const el = selectedElement;

  const update = (updates: Partial<ShapeElement>) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: el.id, updates } });
  };

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shape</div>

      {/* Fill */}
      <div className="space-y-1.5">
        <Label className="text-xs">Fill Color</Label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={el.fill}
            onChange={(e) => update({ fill: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
          <Input
            value={el.fill}
            onChange={(e) => update({ fill: e.target.value })}
            className="h-8 text-xs font-mono"
          />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-1.5">
        <Label className="text-xs">Border Color</Label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={el.borderColor === "transparent" ? "#000000" : el.borderColor}
            onChange={(e) => update({ borderColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
          <Input
            value={el.borderColor}
            onChange={(e) => update({ borderColor: e.target.value })}
            className="h-8 text-xs font-mono"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Border Width</Label>
        <Slider
          value={[el.borderWidth]}
          onValueChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            update({ borderWidth: v ?? 0 });
          }}
          min={0}
          max={20}
          step={1}
        />
      </div>

      {/* Radius */}
      {el.variant !== "circle" && (
        <div className="space-y-1.5">
          <Label className="text-xs">Border Radius</Label>
          <Slider
            value={[el.borderRadius]}
            onValueChange={(val) => {
              const v = Array.isArray(val) ? val[0] : val;
              update({ borderRadius: v ?? 0 });
            }}
            min={0}
            max={200}
            step={1}
          />
        </div>
      )}

      {/* Position */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Position</div>
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

      {/* Shadow */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shadow</div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Blur</Label>
          <Slider
            value={[el.shadowBlur]}
            onValueChange={(val) => {
              const v = Array.isArray(val) ? val[0] : val;
              update({ shadowBlur: v ?? 0 });
            }}
            min={0}
            max={50}
          />
        </div>
        {el.shadowBlur > 0 && (
          <div className="space-y-1.5">
            <Label className="text-[10px]">Shadow Color</Label>
            <input
              type="color"
              value={el.shadowColor === "transparent" ? "#000000" : el.shadowColor}
              onChange={(e) => update({ shadowColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
          </div>
        )}
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
