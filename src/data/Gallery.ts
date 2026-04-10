// src/data/Gallery.ts

export type LogoItem = {
  id: number;
  name: string;
  brand: string;
  category: string;
  year: string;
  description: string;
  image?: string;
  accent: string;
  tags: string[];
};

export const LOGOS: LogoItem[] = [
  {
    id: 1,
    name: "NUERA Mark",
    brand: "NUERA",
    category: "Brand Identity",
    year: "2026",
    description:
      "A minimal monogram system built for premium digital presence and flexible applications.",
    image: "/logos/nuera-mark.png",
    accent: "from-cyan-500/20 via-sky-500/10 to-transparent",
    tags: ["Monogram", "Minimal", "Premium"],
  },
  {
    id: 2,
    name: "Astra Wave",
    brand: "Astra",
    category: "Tech Startup",
    year: "2025",
    description:
      "A geometric wordmark designed for a futuristic SaaS product and product-led brand system.",
    image: "/logos/astra-wave.png",
    accent: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    tags: ["Wordmark", "SaaS", "Geometric"],
  },
  {
    id: 3,
    name: "Mara Blooms",
    brand: "Mara Bloom",
    category: "Lifestyle",
    year: "2025",
    description:
      "A soft, elegant logo direction for a fashion and lifestyle brand with a warm visual tone.",
    image: "/logos/mara-bloom.png",
    accent: "from-rose-500/20 via-orange-500/10 to-transparent",
    tags: ["Elegant", "Lifestyle", "Soft"],
  },
  {
    id: 4,
    name: "Forge Grid",
    brand: "Forge Grid",
    category: "Agency",
    year: "2024",
    description:
      "A bold, modular identity created for a creative studio with a strong editorial feel.",
    image: "/logos/forge-grid.png",
    accent: "from-emerald-500/20 via-lime-500/10 to-transparent",
    tags: ["Bold", "Editorial", "Studio"],
  },
  {
    id: 5,
    name: "Pulse Node",
    brand: "Pulse Node",
    category: "Web3",
    year: "2024",
    description:
      "A sharp, dynamic symbol built for a blockchain and fintech-focused visual identity.",
    image: "/logos/pulse-node.png",
    accent: "from-amber-500/20 via-yellow-500/10 to-transparent",
    tags: ["Web3", "Fintech", "Dynamic"],
  },
  {
    id: 6,
    name: "North Fold",
    brand: "North Fold",
    category: "Identity System",
    year: "2023",
    description:
      "A refined symbol and wordmark pairing for a design-forward consulting brand.",
    image: "/logos/north-fold.png",
    accent: "from-white/10 via-white/5 to-transparent",
    tags: ["Refined", "Consulting", "System"],
  },
];

export const CATEGORIES = [
  "All",
  ...new Set(LOGOS.map((item) => item.category)),
];
