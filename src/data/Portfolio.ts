export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
}

export const projects: Project[] = [
  {
    title: "NeuralVault",
    category: "ML + Full Stack",
    description:
      "AI-powered document intelligence platform. Extracts, classifies, and summarizes documents using custom transformer models.",
    tags: ["Python", "React", "TensorFlow", "GCP"],
    color: "primary",
  },
  {
    title: "ChainBridge",
    category: "Blockchain",
    description:
      "Cross-chain liquidity aggregator enabling seamless token swaps across Ethereum, Polygon, and Solana with optimal routing.",
    tags: ["Solidity", "Rust", "TypeScript", "The Graph"],
    color: "secondary",
  },
  {
    title: "PixelForge Studio",
    category: "Design + Dev",
    description:
      "Generative art platform with real-time WebGL rendering. Users create, mint, and trade unique algorithmic artworks.",
    tags: ["Three.js", "WebGL", "GLSL", "React"],
    color: "accent",
  },
  {
    title: "PredictFlow",
    category: "ML + Blockchain",
    description:
      "Decentralized prediction market using on-chain ML models for outcome probability estimation and automated settlement.",
    tags: ["PyTorch", "Solidity", "Next.js", "IPFS"],
    color: "primary",
  },
  {
    title: "Synthwave Studio",
    category: "Design + Full Stack",
    description:
      "Collaborative design tool with AI-assisted layout generation, real-time multiplayer editing, and design system management.",
    tags: ["React", "WebSockets", "Canvas API", "Node.js"],
    color: "secondary",
  },
  {
    title: "DataMesh",
    category: "ML + Full Stack",
    description:
      "Enterprise data pipeline orchestration with automated feature engineering and model training workflows.",
    tags: ["Python", "Kubernetes", "Apache Spark", "React"],
    color: "accent",
  },
];
