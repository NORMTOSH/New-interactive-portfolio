export interface Skill {
  title: string;
  icon: string;
  description: string;
  tools: string[];
  gradient: string;
  borderColor: string;
  iconBg: string;
}

export const skills: Skill[] = [
  {
    title: "Full Stack Development",
    icon: "⚡",
    description:
      "End-to-end web applications with React, Node.js, TypeScript, and cloud infrastructure. From pixel-perfect UIs to robust APIs.",
    tools: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    gradient: "from-primary/10 to-primary/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary/10",
  },
  {
    title: "Blockchain",
    icon: "🔗",
    description:
      "Smart contracts, DeFi protocols, and Web3 integrations. Building the decentralized future with Solidity and Rust.",
    tools: ["Solidity", "Rust", "Ethereum", "Web3.js", "IPFS"],
    gradient: "from-secondary/10 to-secondary/5",
    borderColor: "border-secondary/20",
    iconBg: "bg-secondary/10",
  },
  {
    title: "Graphic Design",
    icon: "🎨",
    description:
      "Visual identity, UI/UX design, motion graphics, and brand systems. Where creativity meets digital precision.",
    tools: ["Figma", "After Effects", "Illustrator", "Blender", "Framer"],
    gradient: "from-accent/10 to-accent/5",
    borderColor: "border-accent/20",
    iconBg: "bg-accent/10",
  },
  {
    title: "Machine Learning",
    icon: "🧠",
    description:
      "Neural networks, NLP, computer vision, and predictive models. Turning data into intelligent solutions.",
    tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
    gradient: "from-primary/10 to-accent/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary/10",
  },
];
