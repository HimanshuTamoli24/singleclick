import type { Theme } from "~/app/builder/types";

export const PRESET_THEMES: Theme[] = [
  // ============================================================
  // CLEAN / MINIMAL
  // ============================================================

  {
    id: "minimal",
    name: "Minimal",
    colors: {
      primary: "#0A0A0A",
      secondary: "#FFFFFF",
      background: "#FFFFFF",
      text: "#0A0A0A",
      accent: "#2563EB",
      muted: "#6B7280",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "soft-white",
    name: "Soft White",
    colors: {
      primary: "#111827",
      secondary: "#FFFFFF",
      background: "#F8FAFC",
      text: "#111827",
      accent: "#2563EB",
      muted: "#64748B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "paper",
    name: "Paper",
    colors: {
      primary: "#292524",
      secondary: "#FFFDF7",
      background: "#FFFDF7",
      text: "#292524",
      accent: "#C2410C",
      muted: "#78716C",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Georgia, serif",
      code: "monospace",
    },
  },

  {
    id: "cream",
    name: "Cream",
    colors: {
      primary: "#3F2D20",
      secondary: "#FFFBEB",
      background: "#FFF7ED",
      text: "#3F2D20",
      accent: "#EA580C",
      muted: "#8B735B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // DARK
  // ============================================================

  {
    id: "dark",
    name: "Dark",
    colors: {
      primary: "#000000",
      secondary: "#FAFAFA",
      background: "#000000",
      text: "#FAFAFA",
      accent: "#A855F7",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "midnight",
    name: "Midnight",
    colors: {
      primary: "#020617",
      secondary: "#F8FAFC",
      background: "#020617",
      text: "#F8FAFC",
      accent: "#38BDF8",
      muted: "#64748B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "charcoal",
    name: "Charcoal",
    colors: {
      primary: "#18181B",
      secondary: "#FAFAFA",
      background: "#18181B",
      text: "#FAFAFA",
      accent: "#F59E0B",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "obsidian",
    name: "Obsidian",
    colors: {
      primary: "#030712",
      secondary: "#F9FAFB",
      background: "#030712",
      text: "#F9FAFB",
      accent: "#22D3EE",
      muted: "#6B7280",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "JetBrains Mono, monospace",
    },
  },

  {
    id: "developer",
    name: "Developer",
    colors: {
      primary: "#1E1E2E",
      secondary: "#CDD6F4",
      background: "#1E1E2E",
      text: "#CDD6F4",
      accent: "#89B4FA",
      muted: "#6C7086",
    },
    fonts: {
      heading: "monospace",
      body: "monospace",
      code: "monospace",
    },
  },

  {
    id: "terminal",
    name: "Terminal",
    colors: {
      primary: "#020617",
      secondary: "#E2E8F0",
      background: "#020617",
      text: "#E2E8F0",
      accent: "#22C55E",
      muted: "#64748B",
    },
    fonts: {
      heading: "JetBrains Mono, monospace",
      body: "JetBrains Mono, monospace",
      code: "JetBrains Mono, monospace",
    },
  },

  // ============================================================
  // LIGHT GRADIENTS
  // ============================================================

  {
    id: "gradient-sky",
    name: "Sky",
    colors: {
      primary: "#0C4A6E",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #DBEAFE 100%)",
      text: "#0C2340",
      accent: "#0284C7",
      muted: "#52718A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "gradient-lavender",
    name: "Lavender",
    colors: {
      primary: "#3B0764",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 55%, #DDD6FE 100%)",
      text: "#2E1065",
      accent: "#7C3AED",
      muted: "#76658C",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "gradient-mint",
    name: "Mint",
    colors: {
      primary: "#064E3B",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 55%, #A7F3D0 100%)",
      text: "#064E3B",
      accent: "#059669",
      muted: "#568275",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "gradient-peach",
    name: "Peach",
    colors: {
      primary: "#7C2D12",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%)",
      text: "#431407",
      accent: "#EA580C",
      muted: "#956C59",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "gradient-rose",
    name: "Rose",
    colors: {
      primary: "#881337",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)",
      text: "#4C0519",
      accent: "#E11D48",
      muted: "#9F6677",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // VIBRANT GRADIENTS
  // ============================================================

  {
    id: "sunset",
    name: "Sunset",
    colors: {
      primary: "#450A0A",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #7F1D1D 0%, #EA580C 52%, #FACC15 100%)",
      text: "#FFFFFF",
      accent: "#FDE68A",
      muted: "#FED7AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "electric",
    name: "Electric",
    colors: {
      primary: "#172554",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #2563EB 0%, #4F46E5 52%, #7C3AED 100%)",
      text: "#FFFFFF",
      accent: "#FDE047",
      muted: "#C7D2FE",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "candy",
    name: "Candy",
    colors: {
      primary: "#500724",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #EC4899 0%, #A855F7 50%, #6366F1 100%)",
      text: "#FFFFFF",
      accent: "#FDE047",
      muted: "#FBCFE8",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "tropical",
    name: "Tropical",
    colors: {
      primary: "#064E3B",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #059669 0%, #06B6D4 50%, #2563EB 100%)",
      text: "#FFFFFF",
      accent: "#FEF08A",
      muted: "#CCFBF1",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "berry",
    name: "Berry",
    colors: {
      primary: "#500724",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #881337 0%, #BE123C 50%, #DB2777 100%)",
      text: "#FFFFFF",
      accent: "#FDE68A",
      muted: "#FECDD3",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "royal",
    name: "Royal",
    colors: {
      primary: "#1E1B4B",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #312E81 0%, #6D28D9 50%, #A21CAF 100%)",
      text: "#FFFFFF",
      accent: "#F0ABFC",
      muted: "#DDD6FE",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // RADIAL GRADIENTS
  // ============================================================

  {
    id: "radial-purple",
    name: "Purple Glow",
    colors: {
      primary: "#2E1065",
      secondary: "#FFFFFF",
      background:
        "radial-gradient(circle at 50% 20%, #A855F7 0%, #581C87 38%, #09090B 80%)",
      text: "#FFFFFF",
      accent: "#E9D5FF",
      muted: "#C4B5FD",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "radial-blue",
    name: "Blue Glow",
    colors: {
      primary: "#082F49",
      secondary: "#FFFFFF",
      background:
        "radial-gradient(circle at 50% 10%, #38BDF8 0%, #075985 38%, #020617 80%)",
      text: "#FFFFFF",
      accent: "#BAE6FD",
      muted: "#93C5FD",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "radial-orange",
    name: "Orange Glow",
    colors: {
      primary: "#431407",
      secondary: "#FFFFFF",
      background:
        "radial-gradient(circle at 50% 20%, #FB923C 0%, #C2410C 40%, #431407 82%)",
      text: "#FFFFFF",
      accent: "#FED7AA",
      muted: "#FDBA74",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "radial-green",
    name: "Emerald Glow",
    colors: {
      primary: "#022C22",
      secondary: "#FFFFFF",
      background:
        "radial-gradient(circle at 50% 15%, #34D399 0%, #047857 38%, #022C22 82%)",
      text: "#FFFFFF",
      accent: "#A7F3D0",
      muted: "#6EE7B7",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // MESH / MULTI RADIAL
  // ============================================================

  {
    id: "aurora",
    name: "Aurora",
    colors: {
      primary: "#0F172A",
      secondary: "#FFFFFF",
      background: `
        radial-gradient(circle at 15% 20%, #14B8A6 0%, transparent 34%),
        radial-gradient(circle at 85% 20%, #6366F1 0%, transparent 38%),
        radial-gradient(circle at 50% 90%, #8B5CF6 0%, transparent 42%),
        #0F172A
      `,
      text: "#FFFFFF",
      accent: "#5EEAD4",
      muted: "#CBD5E1",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "neon-mesh",
    name: "Neon Mesh",
    colors: {
      primary: "#09090B",
      secondary: "#FFFFFF",
      background: `
        radial-gradient(circle at 15% 20%, #84CC16 0%, transparent 30%),
        radial-gradient(circle at 85% 20%, #06B6D4 0%, transparent 35%),
        radial-gradient(circle at 50% 90%, #A855F7 0%, transparent 42%),
        #09090B
      `,
      text: "#FFFFFF",
      accent: "#BEF264",
      muted: "#D4D4D8",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "cosmic",
    name: "Cosmic",
    colors: {
      primary: "#020617",
      secondary: "#FFFFFF",
      background: `
        radial-gradient(circle at 15% 25%, #2563EB 0%, transparent 32%),
        radial-gradient(circle at 85% 20%, #9333EA 0%, transparent 36%),
        radial-gradient(circle at 50% 85%, #DB2777 0%, transparent 38%),
        #020617
      `,
      text: "#FFFFFF",
      accent: "#F0ABFC",
      muted: "#CBD5E1",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // DOT PATTERNS
  // ============================================================

  {
    id: "dots-light",
    name: "Fine Dots",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background: "radial-gradient(#D4D4D8 1px, transparent 1px)",
      text: "#18181B",
      accent: "#2563EB",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "dots-dark",
    name: "Dark Dots",
    colors: {
      primary: "#FFFFFF",
      secondary: "#09090B",
      background: "radial-gradient(#3F3F46 1px, transparent 1px), #09090B",
      text: "#FAFAFA",
      accent: "#8B5CF6",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "dots-blue",
    name: "Blue Dots",
    colors: {
      primary: "#172554",
      secondary: "#FFFFFF",
      background: "radial-gradient(#93C5FD 1.2px, transparent 1.2px), #EFF6FF",
      text: "#172554",
      accent: "#2563EB",
      muted: "#64748B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "dots-pink",
    name: "Pink Dots",
    colors: {
      primary: "#500724",
      secondary: "#FFFFFF",
      background: "radial-gradient(#FDA4AF 1.2px, transparent 1.2px), #FFF1F2",
      text: "#500724",
      accent: "#E11D48",
      muted: "#9F6677",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // GRID PATTERNS
  // ============================================================

  {
    id: "grid-light",
    name: "Light Grid",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background: `
        linear-gradient(#E4E4E7 1px, transparent 1px),
        linear-gradient(90deg, #E4E4E7 1px, transparent 1px),
        #FFFFFF
      `,
      text: "#18181B",
      accent: "#2563EB",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "grid-dark",
    name: "Dark Grid",
    colors: {
      primary: "#FFFFFF",
      secondary: "#09090B",
      background: `
        linear-gradient(#27272A 1px, transparent 1px),
        linear-gradient(90deg, #27272A 1px, transparent 1px),
        #09090B
      `,
      text: "#FAFAFA",
      accent: "#38BDF8",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "JetBrains Mono, monospace",
    },
  },

  {
    id: "blueprint",
    name: "Blueprint",
    colors: {
      primary: "#172554",
      secondary: "#FFFFFF",
      background: `
        linear-gradient(#BFDBFE 1px, transparent 1px),
        linear-gradient(90deg, #BFDBFE 1px, transparent 1px),
        #EFF6FF
      `,
      text: "#172554",
      accent: "#2563EB",
      muted: "#64748B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "JetBrains Mono, monospace",
    },
  },

  {
    id: "fine-grid",
    name: "Fine Grid",
    colors: {
      primary: "#111827",
      secondary: "#FFFFFF",
      background: `
        linear-gradient(#E5E7EB 1px, transparent 1px),
        linear-gradient(90deg, #E5E7EB 1px, transparent 1px),
        #F9FAFB
      `,
      text: "#111827",
      accent: "#7C3AED",
      muted: "#6B7280",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // CHECKER / SQUARE
  // ============================================================

  {
    id: "checker",
    name: "Checker",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background: `
        linear-gradient(45deg, #E4E4E7 25%, transparent 25%),
        linear-gradient(-45deg, #E4E4E7 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #E4E4E7 75%),
        linear-gradient(-45deg, transparent 75%, #E4E4E7 75%),
        #FFFFFF
      `,
      text: "#18181B",
      accent: "#7C3AED",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "checker-dark",
    name: "Dark Checker",
    colors: {
      primary: "#FFFFFF",
      secondary: "#09090B",
      background: `
        linear-gradient(45deg, #27272A 25%, transparent 25%),
        linear-gradient(-45deg, #27272A 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #27272A 75%),
        linear-gradient(-45deg, transparent 75%, #27272A 75%),
        #09090B
      `,
      text: "#FFFFFF",
      accent: "#22D3EE",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // STRIPES
  // ============================================================

  {
    id: "stripes",
    name: "Stripes",
    colors: {
      primary: "#172554",
      secondary: "#FFFFFF",
      background:
        "repeating-linear-gradient(135deg, #DBEAFE 0px, #DBEAFE 10px, #EFF6FF 10px, #EFF6FF 20px)",
      text: "#172554",
      accent: "#2563EB",
      muted: "#64748B",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "dark-stripes",
    name: "Dark Stripes",
    colors: {
      primary: "#FFFFFF",
      secondary: "#09090B",
      background:
        "repeating-linear-gradient(135deg, #18181B 0px, #18181B 10px, #09090B 10px, #09090B 20px)",
      text: "#FFFFFF",
      accent: "#F97316",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "bold-stripes",
    name: "Bold Stripes",
    colors: {
      primary: "#FFFFFF",
      secondary: "#7F1D1D",
      background:
        "repeating-linear-gradient(135deg, #DC2626 0px, #DC2626 18px, #991B1B 18px, #991B1B 36px)",
      text: "#FFFFFF",
      accent: "#FDE047",
      muted: "#FECACA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // DIAGONAL / GEOMETRIC
  // ============================================================

  {
    id: "diagonal-soft",
    name: "Diagonal Soft",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background:
        "repeating-linear-gradient(135deg, #E4E4E7 0px, #E4E4E7 1px, transparent 1px, transparent 14px), #FFFFFF",
      text: "#18181B",
      accent: "#EC4899",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "cross",
    name: "Cross",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background: `
        linear-gradient(#E4E4E7 1px, transparent 1px),
        linear-gradient(90deg, #E4E4E7 1px, transparent 1px),
        #FAFAFA
      `,
      text: "#18181B",
      accent: "#F43F5E",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // RINGS
  // ============================================================

  {
    id: "rings",
    name: "Rings",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background:
        "radial-gradient(circle, transparent 25%, #E4E4E7 26%, transparent 29%), #FFFFFF",
      text: "#18181B",
      accent: "#7C3AED",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "rings-dark",
    name: "Dark Rings",
    colors: {
      primary: "#FFFFFF",
      secondary: "#09090B",
      background:
        "radial-gradient(circle, transparent 25%, #3F3F46 26%, transparent 29%), #09090B",
      text: "#FFFFFF",
      accent: "#22D3EE",
      muted: "#A1A1AA",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // EDITORIAL / PREMIUM
  // ============================================================

  {
    id: "editorial",
    name: "Editorial",
    colors: {
      primary: "#FAF3E0",
      secondary: "#1A1A1A",
      background: "#FAF3E0",
      text: "#1A1A1A",
      accent: "#C9A45C",
      muted: "#8B8680",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Georgia, serif",
      code: "monospace",
    },
  },

  {
    id: "luxury",
    name: "Luxury",
    colors: {
      primary: "#18120C",
      secondary: "#F5EAD7",
      background:
        "linear-gradient(135deg, #18120C 0%, #2A2117 55%, #3A2C1D 100%)",
      text: "#F5EAD7",
      accent: "#D4AF37",
      muted: "#A89980",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Georgia, serif",
      code: "monospace",
    },
  },

  {
    id: "monochrome",
    name: "Monochrome",
    colors: {
      primary: "#18181B",
      secondary: "#FFFFFF",
      background: "#E4E4E7",
      text: "#18181B",
      accent: "#18181B",
      muted: "#71717A",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // MODERN SOCIAL
  // ============================================================

  {
    id: "lime-pop",
    name: "Lime Pop",
    colors: {
      primary: "#1A2E05",
      secondary: "#FFFFFF",
      background: "#A3E635",
      text: "#1A2E05",
      accent: "#7C3AED",
      muted: "#365314",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "orange-pop",
    name: "Orange Pop",
    colors: {
      primary: "#431407",
      secondary: "#FFFFFF",
      background: "#FB923C",
      text: "#431407",
      accent: "#2563EB",
      muted: "#7C2D12",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "cyan-pop",
    name: "Cyan Pop",
    colors: {
      primary: "#083344",
      secondary: "#FFFFFF",
      background: "#22D3EE",
      text: "#083344",
      accent: "#E11D48",
      muted: "#155E75",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "hot-pink",
    name: "Hot Pink",
    colors: {
      primary: "#500724",
      secondary: "#FFFFFF",
      background: "#F43F5E",
      text: "#FFFFFF",
      accent: "#FDE047",
      muted: "#FECDD3",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  // ============================================================
  // DESI / WARM MODERN
  // ============================================================

  {
    id: "marigold",
    name: "Marigold",
    colors: {
      primary: "#451A03",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #B45309 0%, #F59E0B 55%, #FBBF24 100%)",
      text: "#FFFFFF",
      accent: "#FEF3C7",
      muted: "#FDE68A",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },

  {
    id: "terracotta",
    name: "Terracotta",
    colors: {
      primary: "#431407",
      secondary: "#FFFFFF",
      background:
        "linear-gradient(135deg, #7C2D12 0%, #C2410C 55%, #EA580C 100%)",
      text: "#FFFFFF",
      accent: "#FDE68A",
      muted: "#FDBA74",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Inter, sans-serif",
      code: "monospace",
    },
  },
];
