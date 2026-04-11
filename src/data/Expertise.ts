// src/data/Expertise.ts
export type SkillCategory =
  | "development"
  | "aiData"
  | "web3Systems"
  | "creative";

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
  category: SkillCategory;
  borderColor?: string;
  gradient?: string;
  iconBg?: string;
}

export const mainskills: MainSkill[] = [
  {
    title: "Full Stack Development",
    icon: "</>",
    description:
      "Building responsive web applications and business systems with React, Node.js, Django, databases, and REST APIs. I focus on reliable structure, clean UI, and practical delivery.",
    tools: [
      "React",
      "Next.js",
      "Node.js",
      "Django",
      "REST APIs",
      "Tailwind CSS",
      "SQL",
    ],
    gradient: "from-primary/10 to-primary/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary/10",
  },
  {
    title: "Machine Learning & Data Science",
    icon: "📊",
    description:
      "Turning data into useful insight through analysis, feature engineering, model development, and evaluation. I enjoy working from raw data all the way to production-ready models.",
    tools: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "EDA",
      "Feature Engineering",
      "Model Evaluation",
    ],
    gradient: "from-secondary/10 to-secondary/5",
    borderColor: "border-secondary/20",
    iconBg: "bg-secondary/10",
  },
  {
    title: "Blockchain & Web3",
    icon: "⛓",
    description:
      "Designing decentralized applications, DID workflows, smart-contract integrations, and IPFS-backed systems with a strong focus on trust, verification, and interoperability.",
    tools: ["Solidity", "Ethereum", "IPFS", "Wagmi", "DID", "Web3"],
    gradient: "from-accent/10 to-accent/5",
    borderColor: "border-accent/20",
    iconBg: "bg-accent/10",
  },
  {
    title: "Technical Support & Systems",
    icon: "🛠",
    description:
      "Supporting users and systems through troubleshooting, networking, device setup, automation, and operational support across Windows and Linux environments.",
    tools: [
      "Windows",
      "Linux",
      "Networking",
      "RPA",
      "Cisco",
      "Troubleshooting",
    ],
    gradient: "from-primary/10 to-accent/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary/10",
  },
];

// data for ExpertiseModal.tsx
export const skills: Skill[] = [
  {
    title: "Frontend Development",
    icon: "🖥️",
    category: "development",
    description:
      "Creating responsive, interactive interfaces with clean structure, reusable components, and strong visual hierarchy.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-400/20",
    iconBg: "bg-cyan-500/10",
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    category: "development",
    description:
      "Building APIs, server-side logic, and application workflows that keep web products stable and scalable.",
    tools: ["Node.js", "Express", "Django", "PHP", "REST APIs"],
    gradient: "from-sky-500/10 to-sky-500/5",
    borderColor: "border-sky-400/20",
    iconBg: "bg-sky-500/10",
  },
  {
    title: "API & Database Integration",
    icon: "🔌",
    category: "development",
    description:
      "Connecting front ends to structured data sources and external services with secure and maintainable integrations.",
    tools: ["MySQL", "PostgreSQL", "SQLite", "JSON", "XML"],
    gradient: "from-indigo-500/10 to-indigo-500/5",
    borderColor: "border-indigo-400/20",
    iconBg: "bg-indigo-500/10",
  },
  {
    title: "Deployment & Version Control",
    icon: "🚀",
    category: "development",
    description:
      "Managing source control, releases, and deployments while keeping projects organized and easy to maintain.",
    tools: ["Git", "GitHub", "GitLab", "Vercel", "Netlify"],
    gradient: "from-violet-500/10 to-violet-500/5",
    borderColor: "border-violet-400/20",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Machine Learning Engineering",
    icon: "🧠",
    category: "aiData",
    description:
      "Working on data preparation, model training, tuning, evaluation, and practical machine learning delivery.",
    tools: ["Python", "Scikit-learn", "CNN", "LSTM", "Grid Search"],
    gradient: "from-emerald-500/10 to-emerald-500/5",
    borderColor: "border-emerald-400/20",
    iconBg: "bg-emerald-500/10",
  },
  {
    title: "Data Science & Analysis",
    icon: "📈",
    category: "aiData",
    description:
      "Cleaning, exploring, and shaping datasets to uncover patterns, improve feature quality, and support model decisions.",
    tools: [
      "Data Cleaning",
      "EDA",
      "Visualization",
      "Feature Engineering",
      "Evaluation",
    ],
    gradient: "from-teal-500/10 to-teal-500/5",
    borderColor: "border-teal-400/20",
    iconBg: "bg-teal-500/10",
  },
  {
    title: "Model Optimization",
    icon: "🎯",
    category: "aiData",
    description:
      "Improving model performance through tuning, validation, and metric-driven experimentation.",
    tools: ["SVM", "Random Forest", "MLP", "ROC AUC", "F1 Score"],
    gradient: "from-lime-500/10 to-lime-500/5",
    borderColor: "border-lime-400/20",
    iconBg: "bg-lime-500/10",
  },
  {
    title: "Blockchain & DApp Development",
    icon: "⛓",
    category: "web3Systems",
    description:
      "Developing decentralized identity and blockchain workflows with smart contracts, IPFS, and verifiable records.",
    tools: ["Solidity", "Ethereum", "DID", "IPFS", "ERC-1056"],
    gradient: "from-amber-500/10 to-amber-500/5",
    borderColor: "border-amber-400/20",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "Technical Support & Networking",
    icon: "🛠",
    category: "web3Systems",
    description:
      "Handling workstation setup, printer support, domain issues, cabling, switches, routers, and general ICT troubleshooting.",
    tools: ["Windows", "Linux", "Networking", "Printers", "Cisco"],
    gradient: "from-orange-500/10 to-orange-500/5",
    borderColor: "border-orange-400/20",
    iconBg: "bg-orange-500/10",
  },
  {
    title: "RPA & Process Automation",
    icon: "🤖",
    category: "web3Systems",
    description:
      "Automating repetitive workflows and supporting operational efficiency with low-code and AI-assisted tools.",
    tools: ["UIPath", "Druid AI", "OCR", "Automation", "Workflow Design"],
    gradient: "from-fuchsia-500/10 to-fuchsia-500/5",
    borderColor: "border-fuchsia-400/20",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    title: "Graphic Design & Branding",
    icon: "🎨",
    category: "creative",
    description:
      "Creating logos, layouts, brand visuals, and presentation assets with strong composition and clarity.",
    tools: ["Figma", "Canva", "Illustrator", "Typography", "Brand Kits"],
    gradient: "from-pink-500/10 to-pink-500/5",
    borderColor: "border-pink-400/20",
    iconBg: "bg-pink-500/10",
  },
];
