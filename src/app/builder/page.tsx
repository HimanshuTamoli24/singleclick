"use client";

import { useState } from "react";
import { useAskAI } from "~/hooks/use-ai";
import { Button } from "~/components/ui/button";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const { mutate: askAI, isPending, error } = useAskAI();
  const [slides, setSlides] = useState<any[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    askAI(
      { prompt },
      {
        onSuccess: (resData) => {
          try {
            // Since the API uses streaming text, axios will resolve when it finishes and return the full text buffer.
            // We parse the JSON out of the response.
            let text = typeof resData === "string" ? resData : JSON.stringify(resData);
            
            // Strip out markdown formatting (e.g. ```json ... ```)
            text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
            
            const parsed = JSON.parse(text);
            if (parsed && parsed.slides) {
              setSlides(parsed.slides);
            }
          } catch (e) {
            console.error("Failed to parse AI response:", e, "Response was:", resData);
          }
        },
      }
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Carousel Builder</h1>
        <p className="text-muted-foreground text-lg">
          Generate an AI-powered social media carousel by simply entering a topic.
        </p>
      </div>

      <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
        <textarea
          className="w-full p-4 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          rows={4}
          placeholder="E.g. Three basic git commands every beginner should know..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button 
          size="lg" 
          className="w-full" 
          onClick={handleGenerate} 
          disabled={isPending || !prompt.trim()}
        >
          {isPending ? "Generating Carousel..." : "Generate Magic"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
          <strong>Error:</strong> {(error as Error).message}
        </div>
      )}

      {slides.length > 0 && (
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold">Generated Slides ({slides.length})</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((slide, i) => (
              <div 
                key={i} 
                className="flex flex-col p-6 border rounded-2xl shadow-sm bg-card text-card-foreground hover:shadow-md transition-shadow h-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {slide.type}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {i + 1} / {slides.length}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                {slide.subtitle && (
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {slide.subtitle}
                  </p>
                )}
                
                {slide.content && slide.content.length > 0 && (
                  <div className="mt-auto p-4 bg-muted rounded-xl text-sm font-mono whitespace-pre-wrap">
                    {slide.content.join("\n")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
