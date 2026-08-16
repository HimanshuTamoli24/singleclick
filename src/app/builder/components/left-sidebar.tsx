"use client";

import {
  LayoutTemplate,
  Image as ImageIcon,
  Paintbrush,
  Plus,
} from "lucide-react";
import { useBuilder } from "../context";
import type { LeftPanelTab } from "../types";
import { cn } from "~/lib/utils";
import { TemplatesPanel } from "./panels/templates-panel";
import { ElementsPanel } from "./panels/elements-panel";
import { AssetsPanel } from "./panels/assets-panel";
import { BackgroundPanel } from "./panels/background-panel";

const tabs: { id: LeftPanelTab; label: string; icon: React.ElementType }[] = [
  { id: "elements", label: "Add", icon: Plus },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "assets", label: "Assets", icon: ImageIcon },
  { id: "background", label: "BG", icon: Paintbrush },
];

export function LeftSidebar() {
  const { state, dispatch } = useBuilder();

  return (
    <div className="bg-background flex h-full w-[280px] shrink-0 flex-col border-r">
      {/* Tabs */}
      <div className="flex shrink-0 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={cn(
                "hover:bg-muted/50 flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors",
                state.leftPanel === tab.id
                  ? "text-primary border-primary bg-muted/30 border-b-2"
                  : "text-muted-foreground",
              )}
              onClick={() =>
                dispatch({ type: "SET_LEFT_PANEL", payload: { panel: tab.id } })
              }
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {state.leftPanel === "elements" && <ElementsPanel />}
        {state.leftPanel === "templates" && <TemplatesPanel />}
        {state.leftPanel === "assets" && <AssetsPanel />}
        {state.leftPanel === "background" && <BackgroundPanel />}
      </div>
    </div>
  );
}
