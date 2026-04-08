// src/components/ProjectModal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, X, Sparkles, Tag, FolderKanban } from "lucide-react";

export type Project = {
    title: string;
    description: string;
    category: string;
    color?: "primary" | "secondary" | "accent" | string;
    tags: string[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    year?: string;
    role?: string;
    timeline?: string;
    client?: string;
    challenges?: string[];
    highlights?: string[];
};

type ProjectModalProps = {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
};

const colorClasses: Record<
    string,
    { border: string; tag: string; cat: string; bar: string; glow: string }
> = {
    primary: {
        border: "border-primary/20",
        tag: "text-primary",
        cat: "text-primary",
        bar: "bg-primary/40",
        glow: "from-primary/10",
    },
    secondary: {
        border: "border-secondary/20",
        tag: "text-secondary",
        cat: "text-secondary",
        bar: "bg-secondary/40",
        glow: "from-secondary/10",
    },
    accent: {
        border: "border-accent/20",
        tag: "text-accent",
        cat: "text-accent",
        bar: "bg-accent/40",
        glow: "from-accent/10",
    },
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const colors = colorClasses[project.color ?? "primary"] ?? colorClasses.primary;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6"
        >
            <button
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm transition-opacity"
            />

            <div
                className={[
                    "relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border bg-background shadow-[0_30px_120px_rgba(0,0,0,0.45)]",
                    "animate-in fade-in zoom-in-95 duration-200",
                    colors.border,
                ].join(" ")}
            >
                <div className={`absolute inset-x-0 top-0 h-[4px] ${colors.bar}`} />
                <div
                    className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${colors.glow} to-transparent blur-3xl opacity-80`}
                />

                <div className="relative grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative border-b border-border/60 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <p className={`font-mono text-[11px] uppercase tracking-[0.35em] ${colors.cat}`}>
                                    {project.category}
                                </p>
                                <h2
                                    id="project-modal-title"
                                    className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
                                >
                                    {project.title}
                                </h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                            {project.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {project.year && (
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Year
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{project.year}</p>
                                </div>
                            )}

                            {project.role && (
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Role
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{project.role}</p>
                                </div>
                            )}

                            {project.timeline && (
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Timeline
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{project.timeline}</p>
                                </div>
                            )}

                            {project.client && (
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Client
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{project.client}</p>
                                </div>
                            )}
                        </div>

                        {project.highlights?.length ? (
                            <div className="mt-8">
                                <div className="mb-4 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-accent" />
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                                        Highlights
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {project.highlights.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-border/60 bg-card/60 p-4 text-sm leading-7 text-muted-foreground"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {project.challenges?.length ? (
                            <div className="mt-8">
                                <div className="mb-4 flex items-center gap-2">
                                    <FolderKanban className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                                        Challenges
                                    </h3>
                                </div>

                                <ul className="space-y-3">
                                    {project.challenges.map((item, index) => (
                                        <li
                                            key={index}
                                            className="rounded-2xl border border-border/60 bg-card/60 p-4 text-sm leading-7 text-muted-foreground"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap gap-3">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                                >
                                    View live <ExternalLink className="h-4 w-4" />
                                </a>
                            )}

                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    GitHub <Github className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="mb-5 flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                                Tags
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 rounded-[24px] border border-border/60 bg-card/70 p-5">
                            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                Project Summary
                            </p>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                This project is presented as a case study, with the modal focusing on
                                the problem, the solution, and the visual/system details that make the
                                work easy to understand at a glance.
                            </p>
                        </div>

                        {project.image ? (
                            <div className="mt-6 overflow-hidden rounded-[24px] border border-border/60 bg-card">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[24px] border border-dashed border-border/70 bg-card/50 p-6 text-center">
                                <div>
                                    <p className="text-sm font-medium text-foreground">Preview image</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Add an image field later if you want a visual mockup in the modal.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProjectModal;