// src/data/Skills.ts
import type { LucideIcon } from "lucide-react";
import { Code2, PencilRuler, Rocket, Database, Bot } from "lucide-react";

export type SkillLane = {
  title: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
};

export type SkillStat = {
  label: string;
  value: string;
};

export const skillStats: SkillStat[] = [
  { label: "Focus", value: "Frontend" },
  { label: "Style", value: "Motion UI" },
  { label: "Stack", value: "Full-Stack" },
];

export const lanes: SkillLane[] = [
  {
    title: "Frontend",
    icon: Code2,
    accent: "from-cyan-400/20 via-cyan-300/10 to-transparent",
    items: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Design",
    icon: PencilRuler,
    accent: "from-fuchsia-400/20 via-fuchsia-300/10 to-transparent",
    items: [
      "UI Systems",
      "Responsive Layouts",
      "Brand Identity",
      "Visual Hierarchy",
      "Prototyping",
      "Accessibility",
    ],
  },
  {
    title: "Motion",
    icon: Rocket,
    accent: "from-amber-400/20 via-amber-300/10 to-transparent",
    items: [
      "Scroll-Driven Animations",
      "Microinteractions",
      "Narrative Transitions",
      "3D Motion",
      "Intro Sequences",
      "Page Flow",
    ],
  },
  {
    title: "Backend",
    icon: Database,
    accent: "from-emerald-400/20 via-emerald-300/10 to-transparent",
    items: [
      "Supabase",
      "REST APIs",
      "Auth Flows",
      "Data Modeling",
      "Dashboards",
      "CRUD Systems",
    ],
  },
  {
    title: "AI",
    icon: Bot,
    accent: "from-violet-400/20 via-violet-300/10 to-transparent",
    items: [
      "Prompting",
      "LLM Workflows",
      "Automation",
      "Data Insights",
      "Experimental UI",
      "AI Product Ideas",
    ],
  },
];
