"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useBuilder } from "../context";
import { useAskAI } from "~/hooks/use-ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import type { Slide, SlideElement, SlideType } from "../types";
import { generateId, createTextElement, createCodeElement, createWatermarkElement } from "../types";

interface AIGenerateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Convert one AI slide into our typed Slide with elements */
function aiSlideToSlide(
  aiSlide: { type: string; title?: string; subtitle?: string; content?: string[] },
  themeColors: { background: string; text: string },
): Slide {
  const elements: SlideElement[] = [];

  // Title
  if (aiSlide.title) {
    elements.push(
      createTextElement({
        name: "Title",
        content: aiSlide.title,
        x: 80,
        y: 200,
        width: 920,
        height: 160,
        fontSize: aiSlide.type === "intro" ? 72 : 56,
        fontWeight: 800,
        color: themeColors.text,
        textAlign: "center",
      }),
    );
  }

  // Subtitle
  if (aiSlide.subtitle) {
    elements.push(
      createTextElement({
        name: "Subtitle",
        content: aiSlide.subtitle,
        x: 80,
        y: 380,
        width: 920,
        height: 100,
        fontSize: 28,
        fontWeight: 400,
        color: themeColors.text,
        textAlign: "center",
        opacity: 0.7,
      }),
    );
  }

  // Content
  if (aiSlide.content && aiSlide.content.length > 0) {
    if (aiSlide.type === "code") {
      elements.push(
        createCodeElement({
          name: "Code",
          content: aiSlide.content.join("\n"),
          x: 80,
          y: 520,
          width: 920,
          height: 400,
        }),
      );
    } else {
      const bulletText = aiSlide.content.map((item) => `• ${item}`).join("\n");
      elements.push(
        createTextElement({
          name: "Content",
          content: bulletText,
          x: 80,
          y: 520,
          width: 920,
          height: 500,
          fontSize: 28,
          fontWeight: 400,
          color: themeColors.text,
          textAlign: "left",
          lineHeight: 1.6,
        }),
      );
    }
  }

  // Watermark for all slides
  elements.push(
    createWatermarkElement({
      name: "Watermark",
      content: "@yourhandle",
      x: 40,
      y: 1280,
      width: 200,
      height: 40,
      color: themeColors.text,
    }),
  );

  return {
    id: generateId(),
    slideType: (aiSlide.type ?? "content") as SlideType,
    elements,
    background: { type: "solid", color: themeColors.background },
  };
}

export function AIGenerateModal({ open, onOpenChange }: AIGenerateModalProps) {
  const { state, dispatch } = useBuilder();
  const { mutate: askAI, isPending } = useAskAI();
  const [prompt, setPrompt] = useState("");
  const [slideCount, setSlideCount] = useState(6);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setError(null);

    const fullPrompt = `Create a social media carousel about: "${prompt}". Generate exactly ${slideCount} slides. The first must be "intro", the last must be "outro". Return JSON only.`;

    askAI(
      { prompt: fullPrompt },
      {
        onSuccess: (resData) => {
          try {
            let text = typeof resData === "string" ? resData : JSON.stringify(resData);
            text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
            const parsed = JSON.parse(text);

            if (parsed?.slides && Array.isArray(parsed.slides)) {
              const slides: Slide[] = parsed.slides.map((aiSlide: any) =>
                aiSlideToSlide(aiSlide, {
                  background: state.theme.colors.background,
                  text: state.theme.colors.text,
                }),
              );

              dispatch({ type: "LOAD_SLIDES", payload: { slides } });

              if (parsed.title) {
                dispatch({ type: "SET_PROJECT_TITLE", payload: { title: parsed.title } });
              }

              onOpenChange(false);
              setPrompt("");
            } else {
              setError("AI response did not contain valid slides.");
            }
          } catch (e) {
            console.error("Failed to parse AI response:", e, resData);
            setError("Failed to parse the AI response. Please try again.");
          }
        },
        onError: (err) => {
          setError(err.message);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Carousel Generator
          </DialogTitle>
          <DialogDescription>
            Describe your topic and let AI generate a complete carousel for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Topic / Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. 5 Git commands every developer should know..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Number of Slides</Label>
            <Input
              type="number"
              value={slideCount}
              onChange={(e) => setSlideCount(Math.max(3, Math.min(15, parseInt(e.target.value) || 6)))}
              min={3}
              max={15}
              className="w-24"
            />
            <p className="text-xs text-muted-foreground">Including intro and outro (3–15).</p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
              {error}
            </div>
          )}

          <Button
            className="w-full gap-2"
            onClick={handleGenerate}
            disabled={isPending || !prompt.trim()}
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Carousel
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
