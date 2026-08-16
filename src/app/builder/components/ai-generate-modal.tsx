"use client";

import { useState } from "react";
import { Sparkles, Hash, AtSign, Layers, FileText } from "lucide-react";
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
  watermarkText: string,
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
      content: watermarkText.trim() ? (watermarkText.startsWith("@") ? watermarkText : `@${watermarkText}`) : "@yourhandle",
      x: 40,
      y: 1280,
      width: 260,
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
  const [watermark, setWatermark] = useState("@mybrand");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setError(null);

    let fullPrompt = `Create a social media carousel about: "${prompt.trim()}".
Generate exactly ${slideCount} slides. The first slide MUST be "intro" and the last slide MUST be "outro".`;

    if (watermark.trim()) {
      fullPrompt += `\nCreator/Brand Watermark or Handle: ${watermark.trim()}`;
    }

    if (additionalInfo.trim()) {
      fullPrompt += `\nAdditional Context, Target Audience, Tone & Posting Notes: ${additionalInfo.trim()}`;
    }

    fullPrompt += `\nReturn JSON only following the specified output schema.`;

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
                aiSlideToSlide(
                  aiSlide,
                  {
                    background: state.theme.colors.background,
                    text: state.theme.colors.text,
                  },
                  watermark,
                ),
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
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Carousel Generator
          </DialogTitle>
          <DialogDescription>
            Configure your topic, slide count, watermark handle, and posting context for AI generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Main Prompt */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold">
              <FileText className="h-3.5 w-3.5 text-primary" />
              Topic / Prompt <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. 5 Git commands every developer should know, explained with clean code examples..."
              className="min-h-[85px] text-sm resize-none"
            />
          </div>

          {/* Number of Slides & Watermark in a 2-column row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-semibold">
                <Layers className="h-3.5 w-3.5 text-primary" />
                Number of Slides
              </Label>
              <Input
                type="number"
                value={slideCount}
                onChange={(e) =>
                  setSlideCount(Math.max(3, Math.min(15, parseInt(e.target.value) || 6)))
                }
                min={3}
                max={15}
                className="h-9 text-sm"
              />
              <p className="text-[11px] text-muted-foreground">Between 3 to 15 slides.</p>
            </div>

            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs font-semibold">
                <AtSign className="h-3.5 w-3.5 text-primary" />
                Watermark / Handle
              </Label>
              <Input
                type="text"
                value={watermark}
                onChange={(e) => setWatermark(e.target.value)}
                placeholder="@yourhandle or Brand"
                className="h-9 text-sm"
              />
              <p className="text-[11px] text-muted-foreground">Appears at the bottom of slides.</p>
            </div>
          </div>

          {/* Additional Info / Posting Notes */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs font-semibold">
              <Hash className="h-3.5 w-3.5 text-primary" />
              Additional Info & Posting Context (Optional)
            </Label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="E.g. Target audience: junior developers; Tone: friendly and actionable; Include a CTA to bookmark and follow..."
              className="min-h-[70px] text-xs resize-none"
            />
            <p className="text-[11px] text-muted-foreground">
              Guide the tone, audience, key takeaways, or specific call-to-action for your post.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
              {error}
            </div>
          )}

          <Button
            className="w-full gap-2 mt-2"
            onClick={handleGenerate}
            disabled={isPending || !prompt.trim()}
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Generating Carousel...
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
