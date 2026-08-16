"use client";

import { useBuilder } from "../context";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SlideProperties } from "./properties/slide-properties";
import { TextProperties } from "./properties/text-properties";
import { ImageProperties } from "./properties/image-properties";
import { ShapeProperties } from "./properties/shape-properties";
import { LayersPanel } from "./properties/layers-panel";
import { Separator } from "~/components/ui/separator";

export function RightPropertiesPanel() {
  const { selectedElement, activeSlide } = useBuilder();

  return (
    <div className="w-[320px] border-l bg-background flex flex-col shrink-0 h-full">
      <div className="h-10 flex items-center px-4 border-b shrink-0">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {selectedElement ? `${selectedElement.type} Properties` : "Slide Properties"}
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {!selectedElement && <SlideProperties />}

          {selectedElement?.type === "text" && <TextProperties />}
          {selectedElement?.type === "image" && <ImageProperties />}
          {selectedElement?.type === "shape" && <ShapeProperties />}
          {selectedElement?.type === "code" && <TextProperties />}
          {selectedElement?.type === "watermark" && <TextProperties />}

          <Separator />

          {activeSlide && <LayersPanel />}
        </div>
      </ScrollArea>
    </div>
  );
}
