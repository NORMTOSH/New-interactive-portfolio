import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowUpRight,
    Layers3,
    Sparkles,
    Code2,
    Palette,
    Cpu,
} from "lucide-react";
import { skills } from "@/data/Expertise";
import type { ReactNode } from "react";

type Skill = {
    title: string;
    description: string;
    tools: string[];
    icon?: ReactNode;
    borderColor?: string;
    gradient?: string;
    iconBg?: string;
};

type ExpertiseModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const typedSkills = skills as Skill[];

const summaryCards = [
    {
        icon: Code2,
        label: "Engineering",
        value: "Frontend systems, interactions, APIs",
    },
    {
        icon: Palette,
        label: "Design",
        value: "UI polish, brand feel, visual hierarchy",
    },
    {
        icon: Cpu,
        label: "Emerging Tech",
        value: "Motion, experimentation, modern workflows",
    },
];

const categories = {
    engineering: {
        title: "Engineering",
        description: "Technical building blocks, systems, and implementation depth.",
        match: (skill: Skill) =>
            /react|typeScript|typescript|frontend|backend|api|gsap|javascript|web|system|engineering/i.test(
                `${skill.title} ${skill.description} ${skill.tools.join(" ")}`
            ),
    },
    design: {
        title: "Design",
        description: "Visual direction, UI polish, and brand-forward execution.",
        match: (skill: Skill) =>
            /design|ui|ux|brand|visual|interface|animation|motion|creative/i.test(
                `${skill.title} ${skill.description} ${skill.tools.join(" ")}`
            ),
    },
    tech: {
        title: "Emerging Tech",
        description: "Experimental tools, modern workflows, and future-facing work.",
        match: (skill: Skill) =>
            /web3|defi|ml|ai|data|blockchain|prototype|experimental|emerging|3d/i.test(
                `${skill.title} ${skill.description} ${skill.tools.join(" ")}`
            ),
    },
};

const getFilteredSkills = (key: keyof typeof categories) => {
    const filtered = typedSkills.filter(categories[key].match);
    return filtered.length ? filtered : typedSkills;
};

const ExpertiseModal = ({ open, onOpenChange }: ExpertiseModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl overflow-hidden border border-white/10 bg-[#080812] text-white shadow-[0_30px_120px_rgba(0,0,0,0.72)]">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                    <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_28%)]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative max-h-[85vh] overflow-y-auto pr-1"
                >
                    <DialogHeader className="space-y-4">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                                Expertise
                            </span>
                        </div>

                        <div className="space-y-2">
                            <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                What I Specialize In
                            </DialogTitle>
                            <DialogDescription className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                                A deeper look at the areas where I go beyond surface-level work and build with intention, structure, and detail.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="mt-8 grid gap-3 md:grid-cols-3">
                        {summaryCards.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.label}</p>
                                            <p className="mt-1 text-xs leading-relaxed text-white/55">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8">
                        <Tabs defaultValue="engineering" className="w-full">
                            <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
                                <TabsTrigger
                                    value="engineering"
                                    className="rounded-xl py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                                >
                                    Engineering
                                </TabsTrigger>
                                <TabsTrigger
                                    value="design"
                                    className="rounded-xl py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                                >
                                    Design
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tech"
                                    className="rounded-xl py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                                >
                                    Emerging Tech
                                </TabsTrigger>
                            </TabsList>

                            {(
                                [
                                    ["engineering", "engineering"],
                                    ["design", "design"],
                                    ["tech", "tech"],
                                ] as const
                            ).map(([tabKey, categoryKey]) => {
                                const filteredSkills = getFilteredSkills(categoryKey);

                                return (
                                    <TabsContent key={tabKey} value={tabKey} className="mt-6">
                                        <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                                            <p className="text-sm font-medium text-white">
                                                {categories[categoryKey].title}
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed text-white/55">
                                                {categories[categoryKey].description}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            {filteredSkills.map((skill, index) => (
                                                <motion.div
                                                    key={skill.title}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.06 }}
                                                    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] opacity-80" />

                                                    <div className="relative z-10 flex items-start gap-4">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                                                            {skill.icon ?? <Layers3 className="h-5 w-5 text-primary" />}
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-lg font-semibold text-white">
                                                                    {skill.title}
                                                                </h3>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="border border-white/10 bg-white/10 text-white/75"
                                                                >
                                                                    Core
                                                                </Badge>
                                                            </div>

                                                            <p className="mt-3 text-sm leading-relaxed text-white/70">
                                                                {skill.description}
                                                            </p>

                                                            <div className="mt-4">
                                                                <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.24em] text-white/40">
                                                                    Tools & stack
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {skill.tools.map((tool) => (
                                                                        <span
                                                                            key={tool}
                                                                            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] text-white/70"
                                                                        >
                                                                            {tool}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                );
                            })}
                        </Tabs>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-white/45">
                            Keep your expertise data in{" "}
                            <span className="text-white/70">src/data/Expertise</span> updated so this modal stays in sync.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="rounded-full px-5">
                                <a href="/resume.pdf" download>
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Open Resume
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default ExpertiseModal;