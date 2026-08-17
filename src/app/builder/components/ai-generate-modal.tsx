"use client";

import { useState } from "react";
import {
  Sparkles,
  WandSparkles,
  Users,
  Palette,
  Layers,
  AtSign,
  Lightbulb,
  Check,
  ChevronDown,
} from "lucide-react";

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
import { Input } from "~/components/ui/input";

import type { Slide, SlideElement, SlideType } from "../types";

import {
  generateId,
  createTextElement,
  createCodeElement,
  createWatermarkElement,
  MAX_SLIDES,
} from "../types";

interface AIGenerateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STYLES = [
  {
    id: "fun",
    label: "Fun & Colorful",
    emoji: "🎨",
  },
  {
    id: "clean",
    label: "Clean & Simple",
    emoji: "✨",
  },
  {
    id: "educational",
    label: "Educational",
    emoji: "📚",
  },
  {
    id: "professional",
    label: "Professional",
    emoji: "💼",
  },
  {
    id: "story",
    label: "Storytelling",
    emoji: "📖",
  },
  {
    id: "bold",
    label: "Bold & Modern",
    emoji: "⚡",
  },
];

const AUDIENCES = [
  {
    id: "everyone",
    label: "Everyone",
    emoji: "🌎",
  },
  {
    id: "children",
    label: "Children",
    emoji: "🧒",
  },
  {
    id: "students",
    label: "Students",
    emoji: "🎓",
  },
  {
    id: "parents",
    label: "Parents",
    emoji: "👨‍👩‍👧",
  },
  {
    id: "customers",
    label: "Customers",
    emoji: "🛍️",
  },
  {
    id: "professionals",
    label: "Professionals",
    emoji: "💼",
  },
];

const SLIDE_OPTIONS = [5, 6, 7, 8, 10];

function aiSlideToSlide(
  aiSlide: {
    type: string;
    title?: string;
    subtitle?: string;
    content?: string[];
  },
  themeColors: {
    background: string;
    text: string;
  },
  watermarkText: string,
): Slide {
  const elements: SlideElement[] = [];

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
      elements.push(
        createTextElement({
          name: "Content",
          content: aiSlide.content.map((item) => `• ${item}`).join("\n"),
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

  elements.push(
    createWatermarkElement({
      name: "Watermark",
      content: watermarkText.trim()
        ? watermarkText.startsWith("@")
          ? watermarkText
          : `@${watermarkText}`
        : "@yourhandle",
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
    background: {
      type: "solid",
      color: themeColors.background,
    },
  };
}

export function AIGenerateModal({ open, onOpenChange }: AIGenerateModalProps) {
  const { state, dispatch } = useBuilder();
  const { mutate: askAI, isPending } = useAskAI();

  const [idea, setIdea] = useState("");
  const [slideCount, setSlideCount] = useState(6);
  const [style, setStyle] = useState("fun");
  const [audience, setAudience] = useState("everyone");
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!idea.trim()) return;

    setError(null);

    const selectedStyle =
      STYLES.find((item) => item.id === style)?.label ?? "Clean & Simple";

    const selectedAudience =
      AUDIENCES.find((item) => item.id === audience)?.label ?? "Everyone";

    const fullPrompt = `
Create a social media carousel about:
"${idea.trim()}"

Generate exactly ${slideCount} slides.

The first slide MUST be "intro".
The last slide MUST be "outro".

Style:
${selectedStyle}

Audience:
${selectedAudience}

Brand / creator name:
${brandName.trim() || "None"}

Make the content easy to understand for the selected audience.
Avoid unnecessary technical language.
Use short, clear sentences.
Make every slide visually interesting and easy to read.

Return JSON only following the specified output schema.
`;

    askAI(
      { prompt: fullPrompt },
      {
        onSuccess: (resData) => {
          try {
            let text =
              typeof resData === "string" ? resData : JSON.stringify(resData);

            text = text
              .replace(/```json/gi, "")
              .replace(/```/g, "")
              .trim();

            const parsed = JSON.parse(text);

            if (parsed?.slides && Array.isArray(parsed.slides)) {
              const slides: Slide[] = parsed.slides.map((aiSlide: any) =>
                aiSlideToSlide(
                  aiSlide,
                  {
                    background: state.theme.colors.background,
                    text: state.theme.colors.text,
                  },
                  brandName,
                ),
              );

              dispatch({
                type: "LOAD_SLIDES",
                payload: { slides },
              });

              if (parsed.title) {
                dispatch({
                  type: "SET_PROJECT_TITLE",
                  payload: {
                    title: parsed.title,
                  },
                });
              }

              onOpenChange(false);
              setIdea("");
            } else {
              setError("We couldn't create the carousel. Please try again.");
            }
          } catch (error) {
            console.error(error);
            setError("Something went wrong while creating your carousel.");
          }
        },

        onError: (error) => {
          setError(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] min-w-4xl overflow-y-auto rounded-3xl border-white/10 p-0 sm:max-w-[620px]">
        <div className="bg-background">
          <div className="space-y-7 px-6 py-6">
            {/* IDEA */}
            <section className="space-y-3">
              <SectionTitle
                icon={<Lightbulb />}
                title="What do you want to share?"
              />

              <div className="relative">
                <Textarea
                  value={idea}
                  onChange={(event) => setIdea(event.target.value)}
                  placeholder="Example: 5 healthy breakfast ideas for children..."
                  className="border-muted-foreground/15 bg-muted/30 min-h-[125px] resize-none rounded-2xl p-4 text-sm leading-6"
                />

                {!idea && (
                  <div className="text-muted-foreground pointer-events-none absolute right-3 bottom-3 text-[10px]">
                    Just describe your idea
                  </div>
                )}
              </div>
            </section>

            {/* STYLE */}
            <section className="space-y-3">
              <SectionTitle icon={<Palette />} title="Choose a style" />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {STYLES.map((item) => {
                  const selected = style === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStyle(item.id)}
                      className={[
                        "relative rounded-2xl border p-3 text-left transition-all",
                        selected
                          ? "border-primary bg-primary/8 ring-primary/20 ring-2"
                          : "border-border hover:bg-muted/50",
                      ].join(" ")}
                    >
                      {/* <div className="mb-2 text-xl">{item.emoji}</div> */}

                      <div className="text-xs font-semibold">{item.label}</div>

                      {selected && (
                        <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* AUDIENCE */}
            <section className="space-y-3">
              <SectionTitle icon={<Users />} title="Who is this for?" />

              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((item) => {
                  const selected = audience === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAudience(item.id)}
                      className={[
                        "rounded-full border px-3.5 py-2 text-xs font-medium transition-all",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted",
                      ].join(" ")}
                    >
                      <span className="mr-1.5">{item.emoji}</span>

                      {item.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="flex items-center justify-between">
              {" "}
              {/* SLIDES */}
              <section className="space-y-3">
                <SectionTitle icon={<Layers />} title="How many pages?" />

                <div className="flex gap-2">
                  {SLIDE_OPTIONS.map((count) => {
                    const selected = slideCount === count;

                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setSlideCount(Math.min(count, MAX_SLIDES))
                        }
                        className={[
                          "h-10 min-w-[48px] rounded-xl border text-sm font-semibold transition-all",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-muted",
                        ].join(" ")}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </section>
              {/* BRAND */}
              <section className="space-y-3">
                <SectionTitle
                  icon={<AtSign />}
                  title="Your name or brand"
                  optional
                />

                <Input
                  value={brandName}
                  onChange={(event) => setBrandName(event.target.value)}
                  placeholder="@yourname or your brand"
                  className="h-11 rounded-xl"
                />
              </section>
            </div>

            {/* ERROR */}
            {error && (
              <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* CTA */}
            <div className="border-t pt-5">
              <Button
                className="h-12 w-full gap-2 rounded-xl text-sm font-semibold"
                onClick={handleGenerate}
                disabled={isPending || !idea.trim()}
              >
                {isPending ? (
                  <>
                    <span className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
                    Creating your carousel...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Create my carousel
                  </>
                )}
              </Button>

              <p className="text-muted-foreground mt-2 text-center text-[11px]">
                You can change everything after it's created.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({
  icon,
  title,
  optional,
}: {
  icon: React.ReactNode;
  title: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary [&>svg]:h-4 [&>svg]:w-4">{icon}</span>

      <h3 className="text-sm font-semibold">{title}</h3>

      {optional && (
        <span className="text-muted-foreground text-[11px]">Optional</span>
      )}
    </div>
  );
}
