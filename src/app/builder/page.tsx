"use client";

import { useState } from "react";
import { BuilderProvider, useBuilder } from "./context";
import { BuilderHeader } from "./components/builder-header";
import { LeftSidebar } from "./components/left-sidebar";
import { CanvasWorkspace } from "./components/canvas-workspace";
import { RightPropertiesPanel } from "./components/right-panel";
import { AIGenerateModal } from "./components/ai-generate-modal";
import { PreviewMode } from "./components/preview-mode";
import { MobileGuard } from "./components/mobile-guard";

function BuilderContent() {
  const { state } = useBuilder();
  const [aiModalOpen, setAiModalOpen] = useState(false);

  if (state.previewMode) {
    return (
      <>
        <MobileGuard />
        <PreviewMode />
      </>
    );
  }

  return (
    <>
      <MobileGuard />
      <div className="h-screen hidden md:flex flex-col overflow-hidden">
        <BuilderHeader onAIGenerate={() => setAiModalOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <CanvasWorkspace />
          <RightPropertiesPanel />
        </div>
        <AIGenerateModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
      </div>
    </>
  );
}

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}
