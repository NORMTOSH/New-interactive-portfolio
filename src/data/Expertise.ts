// src/data/Expertise.ts
export interface MainSkill {
  title: string;
  icon: string;
  description: string;
  tools: string[];
  gradient: string;
  borderColor: string;
  iconBg: string;
}

export interface Skill {
  title: string;
  description: string;
  tools: string[];
  icon?: string;
  borderColor?: string;
  gradient?: string;
  iconBg?: string;
}

export const mainskills: MainSkill[] = [
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

// data for ExpertiseModal.tsx
export const skills: Skill[] = [
  {
    title: "Frontend Architecture",
    icon: "⚡",
    description:
      "Building scalable React interfaces with TypeScript, reusable components, clean state flow, and maintainable structure.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Vite", "Component Design"],
    gradient: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-400/20",
    iconBg: "bg-cyan-500/10",
  },
  {
    title: "API Integration",
    icon: "🔌",
    description:
      "Connecting frontend experiences to backend services, REST APIs, authentication flows, and dynamic dashboards.",
    tools: ["REST APIs", "Axios", "Supabase", "JWT", "CRUD Flows"],
    gradient: "from-sky-500/10 to-sky-500/5",
    borderColor: "border-sky-400/20",
    iconBg: "bg-sky-500/10",
  },
  {
    title: "UI Engineering",
    icon: "🧩",
    description:
      "Turning designs into polished interfaces with strong spacing, hierarchy, responsiveness, and interaction quality.",
    tools: [
      "Responsive UI",
      "Design Systems",
      "Accessibility",
      "Shadcn UI",
      "Layout Systems",
    ],
    gradient: "from-indigo-500/10 to-indigo-500/5",
    borderColor: "border-indigo-400/20",
    iconBg: "bg-indigo-500/10",
  },
  {
    title: "Motion & Interaction",
    icon: "✨",
    description:
      "Creating smooth transitions, animated reveals, and interactive experiences that feel alive and intentional.",
    tools: [
      "Framer Motion",
      "GSAP",
      "Micro-interactions",
      "Scroll Effects",
      "Transitions",
    ],
    gradient: "from-violet-500/10 to-violet-500/5",
    borderColor: "border-violet-400/20",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Brand & Visual Design",
    icon: "🎨",
    description:
      "Crafting clean visual systems, presentation layouts, brand presence, and interface polish with strong aesthetics.",
    tools: [
      "Figma",
      "Typography",
      "Color Systems",
      "Composition",
      "Visual Hierarchy",
    ],
    gradient: "from-fuchsia-500/10 to-fuchsia-500/5",
    borderColor: "border-fuchsia-400/20",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    title: "Creative Coding",
    icon: "🖥️",
    description:
      "Experimenting with expressive web experiences, generative visuals, and interactive concepts for modern digital work.",
    tools: [
      "Canvas",
      "Three.js",
      "SVG",
      "Animations",
      "Interactive Prototypes",
    ],
    gradient: "from-emerald-500/10 to-emerald-500/5",
    borderColor: "border-emerald-400/20",
    iconBg: "bg-emerald-500/10",
  },
  {
    title: "Emerging Tech Exploration",
    icon: "🚀",
    description:
      "Testing modern workflows, future-facing tools, and experimental ideas that push web experiences forward.",
    tools: [
      "AI Tools",
      "3D Web",
      "Prototyping",
      "Workflow Automation",
      "Experimentation",
    ],
    gradient: "from-amber-500/10 to-amber-500/5",
    borderColor: "border-amber-400/20",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "Product Thinking",
    icon: "🧠",
    description:
      "Shaping interfaces around user goals, business outcomes, and practical delivery rather than just visuals.",
    tools: [
      "Problem Solving",
      "UX Thinking",
      "Feature Planning",
      "Iteration",
      "User Flow",
    ],
    gradient: "from-orange-500/10 to-orange-500/5",
    borderColor: "border-orange-400/20",
    iconBg: "bg-orange-500/10",
  },
];
