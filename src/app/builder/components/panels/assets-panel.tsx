"use client";

import { Upload, X } from "lucide-react";
import { useBuilder } from "../../context";
import { createImageElement } from "../../types";
import { Button } from "~/components/ui/button";
import { useRef } from "react";

export function AssetsPanel() {
  const { state, dispatch } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.match(/image\/(png|jpeg|jpg|webp|svg\+xml)/)) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        dispatch({ type: "ADD_ASSET", payload: { url } });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAssetClick = (url: string) => {
    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        element: createImageElement({ src: url, name: "Uploaded Image" }),
      },
    });
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Assets
      </h4>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg,.webp,.svg"
        multiple
        onChange={handleFileUpload}
      />

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1.5"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-3.5 w-3.5" />
        Upload Image
      </Button>

      {state.assets.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Recent
          </h5>
          <div className="grid grid-cols-3 gap-1.5">
            {state.assets.map((url, i) => (
              <button
                key={i}
                className="aspect-square rounded-md overflow-hidden border hover:ring-2 hover:ring-primary transition-all"
                onClick={() => handleAssetClick(url)}
                title="Click to add to canvas"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {state.assets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No assets uploaded yet.
          <br />
          Upload images to use in your slides.
        </div>
      )}
    </div>
  );
}
