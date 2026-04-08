// src/components/ContactForm.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Lottie from "lottie-react";
import { X, Send, Mail, User, MessageSquare, Sparkles } from "lucide-react";
import contactAnimation from "@/assets/lottie/Robot says hello.json";

type ContactFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            const timeout = window.setTimeout(() => setMounted(false), 220);
            return () => window.clearTimeout(timeout);
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Hook this into your email service, API, or form backend later.
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[120]">
            <button
                aria-label="Close contact form"
                onClick={onClose}
                className={[
                    "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0",
                ].join(" ")}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-form-title"
                className={[
                    "absolute right-0 top-0 h-full w-full max-w-6xl overflow-hidden",
                    "border-l border-border bg-background shadow-[0_30px_100px_rgba(0,0,0,0.35)]",
                    "transition-transform duration-300 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                <div className="grid h-full lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative hidden overflow-hidden border-r border-border/60 bg-gradient-to-br from-primary/10 via-background to-background lg:flex lg:flex-col">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
                        <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                                    Contact
                                </p>
                                <h2 className="mt-3 max-w-md text-4xl font-bold tracking-tight xl:text-5xl">
                                    Let&apos;s create something meaningful.
                                </h2>
                                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                                    Share a few details and I&apos;ll get back to you with the next steps.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="rounded-3xl border border-border/60 bg-card/70 p-5 backdrop-blur-sm">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                            Fast response
                                        </p>
                                    </div>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        I usually reply within 1–2 days with clarity on timeline, scope,
                                        and the best way to move forward.
                                    </p>
                                </div>

                                <div className="mx-auto max-w-[420px]">
                                    <Lottie animationData={contactAnimation} loop autoplay />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex h-full flex-col overflow-y-auto">
                        <div className="sticky top-0 z-10 border-b border-border/60 bg-background/90 px-6 py-5 backdrop-blur-md sm:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                                        Contact
                                    </p>
                                    <h2
                                        id="contact-form-title"
                                        className="mt-2 text-2xl font-bold tracking-tight"
                                    >
                                        Let’s start a project
                                    </h2>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    aria-label="Close form"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-6 sm:px-8 sm:py-8">
                            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
                                Tell me a bit about your project, timeline, and what you want to build.
                                I’ll get back to you with the next steps.
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Reply time
                                    </p>
                                    <p className="mt-2 text-sm font-medium">Within 1–2 days</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Type
                                    </p>
                                    <p className="mt-2 text-sm font-medium">Freelance / contract</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                        Focus
                                    </p>
                                    <p className="mt-2 text-sm font-medium">UI / Web / Brand</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        Project details
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        placeholder="Tell me about the project, goals, timeline, and anything important..."
                                        className="w-full resize-none rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[var(--glow-primary)]"
                                    >
                                        Send message
                                        <Send className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center rounded-full border border-border/70 bg-card px-6 py-3.5 font-semibold text-foreground transition-colors hover:bg-muted"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>
        </div>,
        document.body
    );
};

export default ContactForm;