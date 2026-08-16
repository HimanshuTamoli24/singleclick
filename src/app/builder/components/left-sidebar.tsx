"use client";

import {
  Layers,
  LayoutTemplate,
  Image as ImageIcon,
  Paintbrush,
  Plus,
  Search,
} from "lucide-react";
import { useBuilder } from "../context";
import type { LeftPanelTab } from "../types";
import { cn } from "~/lib/utils";
import { SlidesPanel } from "./panels/slides-panel";
import { TemplatesPanel } from "./panels/templates-panel";
import { ElementsPanel } from "./panels/elements-panel";
import { AssetsPanel } from "./panels/assets-panel";
import { BackgroundPanel } from "./panels/background-panel";
import { ScrollArea } from "~/components/ui/scroll-area";

const tabs: { id: LeftPanelTab; label: string; icon: React.ElementType }[] = [
  { id: "slides", label: "Slides", icon: Layers },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "elements", label: "Add", icon: Plus },
  { id: "assets", label: "Assets", icon: ImageIcon },
  { id: "background", label: "BG", icon: Paintbrush },
];

export function LeftSidebar() {
  const { state, dispatch } = useBuilder();

  return (
    <div className="w-[280px] border-r bg-background flex flex-col shrink-0 h-full">
      {/* Tabs */}
      <div className="flex border-b shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors hover:bg-muted/50",
                state.leftPanel === tab.id
                  ? "text-primary border-b-2 border-primary bg-muted/30"
                  : "text-muted-foreground",
              )}
              onClick={() => dispatch({ type: "SET_LEFT_PANEL", payload: { panel: tab.id } })}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {state.leftPanel === "slides" && <SlidesPanel />}
          {state.leftPanel === "templates" && <TemplatesPanel />}
          {state.leftPanel === "elements" && <ElementsPanel />}
          {state.leftPanel === "assets" && <AssetsPanel />}
          {state.leftPanel === "background" && <BackgroundPanel />}
        </div>
      </ScrollArea>
    </div>
  );
}
