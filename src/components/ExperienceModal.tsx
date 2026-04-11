import * as React from "react";
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
    Briefcase,
    CalendarDays,
    Download,
    MapPin,
    ArrowUpRight,
    Sparkles,
    GraduationCap,
    Award,
} from "lucide-react";

import {
    experiences,
    academics,
    certifications,
    typeStyles,
    statusStyles,
    categoryStyles,
    type Experience,
    type Academic,
    type Certification,
} from "@/data/Experience";

type ExperienceModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const ExperienceModal = ({ open, onOpenChange }: ExperienceModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl overflow-hidden border border-white/10 bg-[#080812] text-white shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative max-h-[85vh] overflow-y-auto pr-1"
                >
                    <DialogHeader className="space-y-4">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="m38.301 7.752l-25.96 7.462a26 26 0 0 1 1.304 2.116q12.843-3.953 25.688-7.903q-.474-.858-1.032-1.675m2.499 4.872l-25.299 8.75q.438 1.16.806 2.353q12.566-4.622 25.13-9.241a33 33 0 0 0-.637-1.862M17.459 28.101c.189.821.361 1.65.527 2.482L42.738 19.92a89 89 0 0 0-.416-1.964z" /><path fill="currentColor" d="M61.228 33.155c-2.256-2.472-3.539-5.399-4.419-8.518q-4.09 2.313-7.747 4.385C46.392 19.556 47.121 8.488 38.121 2L2 10.253c15.272 11.005 11.144 39.508 22.041 50.212c.911.895 4.324 2.588 9.068.628c7.352-3.038 4.657-6.484 27.185-22.907c1.987-1.45 2.156-3.67.934-5.031M24.701 42.81c1.234 4.375 9.551 6.745 8.115 13.259c-.872 3.961-5.77 4.762-7.461 3.064c-4.45-4.466-6.291-12.502-8.191-21.061c-2.199-9.904-4.463-20.106-11.129-26.824l31.65-7.23c5.485 4.371 6.664 10.884 7.909 17.765c.491 2.715 1.014 5.497 1.804 8.182z" /></svg>
                            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                                Resume
                            </span>
                        </div>

                        <div className="space-y-2">
                            <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Experience & Profile
                            </DialogTitle>
                            <DialogDescription className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                                A tabbed overview of work experience, academic background, and certifications or specializations.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <Tabs defaultValue="experience" className="mt-8">
                        <TabsList className="grid w-full grid-cols-3 rounded-2xl border border-white/10 bg-white/5 p-1">
                            <TabsTrigger value="experience" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">
                                <Briefcase className="mr-2 h-4 w-4" />
                                Experience
                            </TabsTrigger>
                            <TabsTrigger value="academic" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Academic
                            </TabsTrigger>
                            <TabsTrigger value="certifications" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">
                                <Award className="mr-2 h-4 w-4" />
                                Certifications
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="experience" className="mt-6 outline-none">
                            <SectionIntro
                                icon={<Briefcase className="h-4 w-4 text-primary" />}
                                title="Work Experience"
                                subtitle="Roles, impact, and tools used across recent projects."
                            />
                            <div className="mt-6">
                                <TimelineExperienceSection experiences={experiences} typeStyles={typeStyles} />
                            </div>
                        </TabsContent>

                        <TabsContent value="academic" className="mt-6 outline-none">
                            <SectionIntro
                                icon={<GraduationCap className="h-4 w-4 text-primary" />}
                                title="Academic"
                                subtitle="Education and continuous learning foundation."
                            />
                            <div className="mt-6">
                                <TimelineAcademicSection academics={academics} statusStyles={statusStyles} />
                            </div>
                        </TabsContent>

                        <TabsContent value="certifications" className="mt-6 outline-none">
                            <SectionIntro
                                icon={<Award className="h-4 w-4 text-primary" />}
                                title="Certification / Specialization"
                                subtitle="Professional training, certifications, and focused study areas."
                            />
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={`${cert.title}-${cert.period}`}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: index * 0.08 }}
                                        className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                                                    <Badge variant="secondary" className={`border ${categoryStyles[cert.category]} bg-transparent`}>
                                                        {cert.category}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-white/65">{cert.issuer}</p>
                                            </div>

                                            <div className="space-y-1 text-sm text-white/55 sm:text-right">
                                                <div className="inline-flex items-center gap-2 sm:justify-end">
                                                    <CalendarDays className="h-4 w-4" />
                                                    <span>{cert.period}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{cert.description}</p>

                                        <span>{cert.link && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-blue-400 hover:text-blue-300"
                                            >
                                                View Certificate
                                            </a>
                                        )}</span>

                                        <div className="mt-5 border-t border-white/10 pt-4">
                                            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.24em] text-white/40">
                                                Skills / focus areas
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {cert.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] text-white/70 transition-colors duration-300 group-hover:bg-white/5"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-white/45">
                            Replace the sample entries with your real roles, education, certifications, and dates.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="rounded-full px-5">
                                <a href="/resume.pdf" download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>

                            <Button
                                variant="outline"
                                asChild
                                className="rounded-full border-white/10 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
                            >
                                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Open PDF
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

const SectionIntro = ({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) => (
    <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
            {icon}
            <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <p className="max-w-2xl text-sm text-white/55">{subtitle}</p>
    </div>
);

// Similar structure to TimelineExperienceSection but for work experience entries, using typeStyles for the badge colors
const TimelineExperienceSection = ({
    experiences,
    typeStyles,
}: {
    experiences: Experience[];
    typeStyles: Record<Experience["type"], string>;
}) => (
    <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/80 via-white/15 to-transparent" />

        {experiences.map((exp, index) => (
            <div key={`${exp.company}-${exp.period}`} className="relative pb-5 pl-6 last:pb-0">
                <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-[#0e1020] shadow-lg"
                >
                    <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 + 0.04 }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                <Badge variant="secondary" className={`border ${typeStyles[exp.type]} bg-transparent`}>
                                    {exp.type}
                                </Badge>
                            </div>
                            <p className="text-sm text-white/65">{exp.company}</p>
                        </div>

                        <div className="space-y-1 space-x-4 text-sm text-white/55 sm:text-right">
                            <div className="inline-flex items-center gap-2 sm:justify-end">
                                <CalendarDays className="h-4 w-4" />
                                <span>{exp.period}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 sm:justify-end">
                                <MapPin className="h-4 w-4" />
                                <span>{exp.location}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{exp.description}</p>

                    <ul className="mt-4 space-y-2">
                        {exp.achievements.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-white/65">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 border-t border-white/10 pt-4">
                        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.24em] text-white/40">
                            Skills used
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] text-white/70 transition-colors duration-300 group-hover:bg-white/5"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        ))}
    </div>
);

// Similar structure to TimelineExperienceSection but for academic entries, using statusStyles for the badge colors
const TimelineAcademicSection = ({
    academics,
    statusStyles,
}: {
    academics: Academic[];
    statusStyles: Record<Academic["status"], string>;
}) => (
    <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/80 via-white/15 to-transparent" />

        {academics.map((item, index) => (
            <div key={`${item.institution}-${item.period}`} className="relative pb-5 pl-6 last:pb-0">
                <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-[#0e1020] shadow-lg"
                >
                    <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 + 0.04 }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold text-white">{item.program}</h3>
                                <Badge variant="secondary" className={`border ${statusStyles[item.status]} bg-transparent`}>
                                    {item.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-white/65">{item.institution}</p>
                        </div>

                        <div className="space-y-1 space-x-4 text-sm text-white/55 sm:text-right">
                            <div className="inline-flex items-center gap-2 sm:justify-end">
                                <CalendarDays className="h-4 w-4" />
                                <span>{item.period}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 sm:justify-end">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{item.description}</p>

                    <ul className="mt-4 space-y-2">
                        {item.highlights.map((point) => (
                            <li key={point} className="flex gap-3 text-sm text-white/65">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        ))}
    </div>
);

export default ExperienceModal;