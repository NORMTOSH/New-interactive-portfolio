// src/components/HeroSection.tsx
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Sparkles,
    Code2,
    Cpu,
    Palette,
    Brain,
    CheckCircle2,
    Wand2,
    Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 44;
const TITLE_LINES = ["Crafting", "Elevated", "Digital Experiences"];

type SkillTone = "primary" | "secondary" | "accent";

const SKILLS: { label: string; tone: SkillTone; icon: ReactNode }[] = [
    { label: "Full Stack Dev", tone: "primary", icon: <Code2 className="h-3.5 w-3.5" /> },
    { label: "Blockchain", tone: "secondary", icon: <Cpu className="h-3.5 w-3.5" /> },
    { label: "Graphic Design", tone: "accent", icon: <Palette className="h-3.5 w-3.5" /> },
    { label: "Machine Learning", tone: "primary", icon: <Brain className="h-3.5 w-3.5" /> },
];

const STATS = [
    { value: "Premium", label: "Experience-led design" },
    { value: "Fast", label: "Modern, responsive build" },
    { value: "Smart", label: "Motion with purpose" },
];

const PROCESS_STEPS = [
    {
        label: "Discover",
        detail: "Understand goals, audience, and direction.",
        icon: <Sparkles className="h-4 w-4" />,
    },
    {
        label: "Design",
        detail: "Shape the visual language and motion system.",
        icon: <Wand2 className="h-4 w-4" />,
    },
    {
        label: "Build",
        detail: "Develop polished, performant interfaces.",
        icon: <Code2 className="h-4 w-4" />,
    },
    {
        label: "Launch",
        detail: "Refine, ship, and optimize the final experience.",
        icon: <Rocket className="h-4 w-4" />,
    },
];

const skillClassMap: Record<SkillTone, string> = {
    primary: "border-primary/20 bg-primary/8 text-primary",
    secondary: "border-secondary/20 bg-secondary/8 text-secondary",
    accent: "border-accent/20 bg-accent/8 text-accent",
};

const TYPE_SPEED = 90;
const DELETE_SPEED = 52;
const LINE_PAUSE = 420;
const PHRASE_PAUSE = 900;

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const glowARef = useRef<HTMLDivElement>(null);
    const glowBRef = useRef<HTMLDivElement>(null);
    const showcaseRef = useRef<HTMLDivElement>(null);

    const [typedLines, setTypedLines] = useState(["", "", ""]);
    const [activeLine, setActiveLine] = useState(0);
    const [processIndex, setProcessIndex] = useState(0);

    const particles = useMemo(
        () =>
            Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
                const size = 1 + Math.random() * 2.5;
                const opacity = 0.12 + Math.random() * 0.35;
                const left = Math.random() * 100;
                const top = 10 + Math.random() * 85;
                const color =
                    i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--secondary))" : "hsl(var(--accent))";
                return { size, opacity, left, top, color };
            }),
        []
    );

    useEffect(() => {
        let cancelled = false;

        const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

        const runTypingLoop = async () => {
            while (!cancelled) {
                setTypedLines(["", "", ""]);

                for (let lineIndex = 0; lineIndex < TITLE_LINES.length; lineIndex += 1) {
                    setActiveLine(lineIndex);

                    for (let charIndex = 1; charIndex <= TITLE_LINES[lineIndex].length; charIndex += 1) {
                        if (cancelled) return;

                        const current = TITLE_LINES[lineIndex].slice(0, charIndex);
                        setTypedLines((prev) => {
                            const next = [...prev];
                            next[lineIndex] = current;
                            return next;
                        });

                        await sleep(TYPE_SPEED);
                    }

                    await sleep(LINE_PAUSE);
                }

                await sleep(PHRASE_PAUSE);

                for (let lineIndex = TITLE_LINES.length - 1; lineIndex >= 0; lineIndex -= 1) {
                    setActiveLine(lineIndex);

                    for (let charIndex = TITLE_LINES[lineIndex].length; charIndex >= 0; charIndex -= 1) {
                        if (cancelled) return;

                        const current = TITLE_LINES[lineIndex].slice(0, charIndex);
                        setTypedLines((prev) => {
                            const next = [...prev];
                            next[lineIndex] = current;
                            return next;
                        });

                        await sleep(DELETE_SPEED);
                    }
                }

                await sleep(300);
            }
        };

        runTypingLoop();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setProcessIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
        }, 1400);

        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(subtitleRef.current, { y: 18, opacity: 0, duration: 0.6 })
                .from(titleRef.current, { y: 90, opacity: 0, duration: 1.05, skewY: 4 }, "-=0.1")
                .from(
                    tagsRef.current?.children ? Array.from(tagsRef.current.children) : [],
                    { y: 18, opacity: 0, duration: 0.45, stagger: 0.08 },
                    "-=0.42"
                )
                .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.55 }, "-=0.25")
                .from(showcaseRef.current, { x: 40, opacity: 0, scale: 0.96, duration: 0.9 }, "-=0.75")
                .from(gridRef.current, { opacity: 0, duration: 0.9 }, "-=0.8");

            const parallaxItems = [
                { el: titleRef.current, yPercent: -18 },
                { el: subtitleRef.current, yPercent: -28 },
                { el: glowARef.current, yPercent: 28, xPercent: 12 },
                { el: glowBRef.current, yPercent: -22, xPercent: -10 },
                { el: gridRef.current, yPercent: 12 },
                { el: showcaseRef.current, yPercent: -8 },
            ];

            parallaxItems.forEach(({ el, yPercent, xPercent }) => {
                if (!el) return;

                gsap.to(el, {
                    yPercent,
                    ...(xPercent !== undefined ? { xPercent } : {}),
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            if (particlesRef.current) {
                Array.from(particlesRef.current.children).forEach((p) => {
                    const el = p as HTMLElement;
                    const travel = 28 + Math.random() * 42;
                    const drift = (Math.random() - 0.5) * 70;
                    const duration = 4 + Math.random() * 5;

                    gsap.to(el, {
                        y: `-=${travel}`,
                        x: `+=${drift}`,
                        opacity: 0,
                        duration,
                        repeat: -1,
                        ease: "none",
                        delay: Math.random() * 4,
                        onRepeat() {
                            gsap.set(el, {
                                y: 0,
                                x: 0,
                                opacity: parseFloat(el.dataset.opacity || "0.25"),
                            });
                        },
                    });
                });
            }

            gsap.to(glowARef.current, {
                x: 36,
                y: -18,
                duration: 6.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(glowBRef.current, {
                x: -30,
                y: 24,
                duration: 8.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative isolate min-h-screen overflow-hidden section-padding">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.06]" />

            <div
                ref={glowARef}
                className="absolute top-1/4 -left-32 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[150px] will-change-transform"
            />
            <div
                ref={glowBRef}
                className="absolute bottom-1/4 -right-32 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-[150px] will-change-transform"
            />

            <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {particles.map((p, i) => (
                    <div
                        key={i}
                        data-opacity={p.opacity}
                        className="absolute rounded-full will-change-transform"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            backgroundColor: p.color,
                            opacity: p.opacity,
                            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center">
                <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-mono text-xs tracking-[0.28em] uppercase text-muted-foreground">
                                Creative Technologist & Builder
                            </span>
                        </div>

                        <p
                            ref={subtitleRef}
                            className="mb-6 font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground will-change-transform"
                        >
                            Premium digital experiences
                        </p>

                        <h1
                            ref={titleRef}
                            className="mb-8 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl will-change-transform"
                        >
                            <span className="text-foreground">{typedLines[0] || "\u00A0"}</span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
                                {typedLines[1] || "\u00A0"}
                            </span>
                            <br />
                            <span className="text-foreground">
                                {typedLines[2] || "\u00A0"}
                                <span
                                    className={[
                                        "ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] align-middle bg-primary",
                                        "transition-opacity duration-200",
                                        "animate-pulse",
                                        typedLines[activeLine].length === 0 ? "opacity-100" : "opacity-100",
                                    ].join(" ")}
                                />
                            </span>
                        </h1>

                        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            I design and build refined interfaces with motion, depth, and clarity — the kind of frontend work
                            that feels polished, fast, and memorable.
                        </p>

                        <div ref={tagsRef} className="mt-10 flex flex-wrap gap-3">
                            {SKILLS.map((skill) => (
                                <span
                                    key={skill.label}
                                    className={[
                                        "inline-flex items-center gap-2 rounded-full border px-4 py-2",
                                        "font-mono text-[11px] tracking-[0.22em] uppercase backdrop-blur-xl",
                                        skillClassMap[skill.tone],
                                    ].join(" ")}
                                >
                                    {skill.icon}
                                    {skill.label}
                                </span>
                            ))}
                        </div>

                        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                            >
                                <span>View Projects</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-foreground/90 backdrop-blur-xl transition-colors duration-300 hover:border-primary/30 hover:bg-white/8"
                            >
                                Let&apos;s talk
                            </a>
                        </div>

                        <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
                                >
                                    <div className="mb-2 text-2xl font-semibold tracking-tight text-foreground">{stat.value}</div>
                                    <div className="text-sm leading-6 text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={showcaseRef} className="relative mx-auto w-full max-w-xl lg:justify-self-end">
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-secondary/25 blur-3xl opacity-70" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.35)] lg:p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                                        Signature Preview
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                                        Premium interface direction
                                    </h2>
                                </div>
                                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                                    Live
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-2xl bg-primary/15 ring-1 ring-primary/20" />
                                        <div>
                                            <div className="text-sm font-medium text-foreground">Luxury motion system</div>
                                            <div className="text-xs text-muted-foreground">Subtle, responsive, elegant</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                            <span>{PROCESS_STEPS[processIndex].label}</span>
                                            <span>{processIndex + 1}/{PROCESS_STEPS.length}</span>
                                        </div>

                                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-primary via-foreground to-secondary transition-all duration-700 ease-out"
                                                style={{ width: `${((processIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
                                            />
                                        </div>

                                        <div className="grid gap-3 pt-2">
                                            {PROCESS_STEPS.map((step, index) => {
                                                const active = index === processIndex;
                                                const done = index < processIndex;

                                                return (
                                                    <div
                                                        key={step.label}
                                                        className={[
                                                            "flex items-start gap-3 rounded-2xl border p-4 transition-all duration-500",
                                                            active
                                                                ? "border-primary/30 bg-primary/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                                                                : "border-white/10 bg-white/5",
                                                        ].join(" ")}
                                                    >
                                                        <div
                                                            className={[
                                                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                                                                active
                                                                    ? "border-primary/30 bg-primary/15 text-primary animate-pulse"
                                                                    : done
                                                                        ? "border-secondary/20 bg-secondary/10 text-secondary"
                                                                        : "border-white/10 bg-black/10 text-muted-foreground",
                                                            ].join(" ")}
                                                        >
                                                            {done ? <CheckCircle2 className="h-4 w-4" /> : step.icon}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium text-foreground">{step.label}</span>
                                                                {active && (
                                                                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                                                                        Active
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.detail}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                                            Performance
                                        </p>
                                        <div className="mt-3 text-3xl font-semibold text-foreground">Fast</div>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            Designed to feel fluid and premium on every screen.
                                        </p>
                                    </div>

                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                                            Feel
                                        </p>
                                        <div className="mt-3 text-3xl font-semibold text-foreground">Refined</div>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            Clean spacing, depth, and a strong editorial rhythm.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={gridRef}
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 opacity-[0.04] will-change-transform lg:block"
                aria-hidden="true"
            >
                <div className="grid h-full w-full grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-foreground/30" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;