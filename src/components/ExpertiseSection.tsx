import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent,
    type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Layers3 } from "lucide-react";
import TextReveal from "./TextReveal";
import { skills } from "@/data/Expertise";
import ExpertiseModal from "./ExpertiseModal";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
    title: string;
    description: string;
    tools: string[];
    icon?: ReactNode;
    borderColor?: string;
    gradient?: string;
    iconBg?: string;
};

const themes = [
    {
        border: "border-cyan-400/15",
        gradient: "from-cyan-500/10 via-white/[0.04] to-sky-500/10",
        iconBg: "bg-cyan-500/15",
        auraA: "rgba(34,211,238,0.34)",
        auraB: "rgba(14,165,233,0.22)",
    },
    {
        border: "border-violet-400/15",
        gradient: "from-violet-500/10 via-white/[0.04] to-fuchsia-500/10",
        iconBg: "bg-violet-500/15",
        auraA: "rgba(168,85,247,0.34)",
        auraB: "rgba(236,72,153,0.22)",
    },
    {
        border: "border-emerald-400/15",
        gradient: "from-emerald-500/10 via-white/[0.04] to-teal-500/10",
        iconBg: "bg-emerald-500/15",
        auraA: "rgba(16,185,129,0.34)",
        auraB: "rgba(20,184,166,0.22)",
    },
    {
        border: "border-amber-400/15",
        gradient: "from-amber-500/10 via-white/[0.04] to-orange-500/10",
        iconBg: "bg-amber-500/15",
        auraA: "rgba(245,158,11,0.34)",
        auraB: "rgba(249,115,22,0.22)",
    },
];

const ExpertiseSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const glowARef = useRef<HTMLDivElement>(null);
    const glowBRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);

    const typedSkills = skills as Skill[];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
            if (!cards.length) return;

            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    }
                );
            }

            if (glowARef.current) {
                gsap.to(glowARef.current, {
                    xPercent: 14,
                    yPercent: -10,
                    duration: 10,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            if (glowBRef.current) {
                gsap.to(glowBRef.current, {
                    xPercent: -14,
                    yPercent: 12,
                    duration: 12,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            cards.forEach((card, i) => {
                gsap.set(card, {
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    z: -i * 220,
                    y: i * 28,
                    scale: 1 - i * 0.055,
                    rotateX: 18,
                    rotateY: i % 2 === 0 ? -10 : 10,
                    opacity: i === 0 ? 1 : 0.18,
                    filter: i === 0 ? "blur(0px)" : "blur(0.4px)",
                    willChange: "transform, opacity, filter",
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (cards.length + 1.35)}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const step = 1 / Math.max(1, cards.length);
                        const index = Math.min(cards.length - 1, Math.floor(progress / step));
                        setActiveIndex(index);
                    },
                },
            });

            cards.forEach((card, i) => {
                const enterAt = i;
                const exitAt = i + 0.9;

                tl.to(
                    card,
                    {
                        z: 120 - i * 18,
                        y: -i * 10,
                        x: i % 2 === 0 ? -6 : 6,
                        scale: 1,
                        rotateX: 4,
                        rotateY: i % 2 === 0 ? -2 : 2,
                        opacity: 1,
                        filter: "blur(0px)",
                        ease: "none",
                        duration: 0.8,
                    },
                    enterAt
                );

                if (i < cards.length - 1) {
                    tl.to(
                        card,
                        {
                            z: -320 - i * 24,
                            y: -120 - i * 14,
                            scale: 0.92 - i * 0.015,
                            opacity: 0.1,
                            filter: "blur(0.6px)",
                            ease: "none",
                            duration: 0.8,
                        },
                        exitAt
                    );
                }
            });

            if (orbRefs.current.length) {
                gsap.to(orbRefs.current.filter(Boolean), {
                    x: 18,
                    y: -12,
                    duration: 6,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    stagger: 0.25,
                });
            }

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, [typedSkills.length]);

    const handleSpotlightMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const handleSpotlightLeave = (e: MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${rect.width / 2}px`);
        el.style.setProperty("--my", `${rect.height / 2}px`);
    };

    return (
        <section
            ref={sectionRef}
            id="expertise"
            className="relative min-h-screen overflow-hidden bg-background"
        >
            <ExpertiseModal
                open={isExpertiseOpen}
                onOpenChange={setIsExpertiseOpen}
            />

            <div
                ref={glowARef}
                className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[180px]"
            />
            <div
                ref={glowBRef}
                className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-fuchsia-500/10 blur-[200px]"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />

            <div className="flex min-h-screen items-center">
                <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
                    <div ref={headingRef} className="relative z-10 max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                                Expertise
                            </span>
                        </div>

                        <TextReveal className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            <TextReveal.Line>
                                Where I <span className="text-gradient-accent">Specialize</span>
                            </TextReveal.Line>
                        </TextReveal>

                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            The areas where I go deeper — blending engineering, design, and emerging technology into practical results.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {["Scroll-driven depth", "Glassmorphism lighting", "Per-skill motion art"].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] tracking-[0.22em] text-white/70 backdrop-blur-xl"
                                    >
                                        {item}
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-6">
                            <Button
                                onClick={() => setIsExpertiseOpen(true)}
                                className="rounded-full px-5"
                            >
                                <Layers3 className="mr-2 h-4 w-4" />
                                More
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-white/[0.03] blur-3xl" />

                        <div
                            ref={stackRef}
                            className="relative h-[clamp(26rem,52vw,34rem)] w-full max-w-[38rem] overflow-visible [perspective:1800px]"
                        >
                            {typedSkills.map((skill, index) => {
                                const theme = themes[index % themes.length];
                                const isActive = index === activeIndex;

                                return (
                                    <div
                                        key={skill.title}
                                        ref={(el) => {
                                            cardRefs.current[index] = el;
                                        }}
                                        onMouseMove={handleSpotlightMove}
                                        onMouseLeave={handleSpotlightLeave}
                                        style={
                                            {
                                                "--mx": "50%",
                                                "--my": "50%",
                                            } as CSSProperties
                                        }
                                        className={`group absolute inset-0 overflow-hidden rounded-[32px] border ${skill.borderColor ?? theme.border
                                            } bg-gradient-to-br ${skill.gradient ?? theme.gradient
                                            } shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl [transform-style:preserve-3d] transition-opacity duration-300`}
                                    >
                                        <div className="absolute inset-0 bg-black/18" />

                                        <div
                                            className="absolute inset-0 opacity-85"
                                            style={{
                                                backgroundImage: `
                          radial-gradient(circle at 20% 15%, ${theme.auraA}, transparent 38%),
                          radial-gradient(circle at 82% 24%, ${theme.auraB}, transparent 34%),
                          radial-gradient(circle at 50% 85%, rgba(255,255,255,0.08), transparent 42%)
                        `,
                                            }}
                                        />

                                        <div
                                            className="absolute inset-0 opacity-30 mix-blend-screen"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
                                                backgroundSize: "34px 34px",
                                            }}
                                        />

                                        <div
                                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{
                                                backgroundImage:
                                                    "radial-gradient(700px circle at var(--mx) var(--my), rgba(255,255,255,0.22), transparent 42%)",
                                            }}
                                        />

                                        <div className="absolute inset-0 overflow-hidden">
                                            <div
                                                ref={(el) => {
                                                    orbRefs.current[index] = el;
                                                }}
                                                className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/15 blur-3xl opacity-70"
                                            />
                                            <div className="absolute -right-10 bottom-12 h-40 w-40 rounded-full bg-white/10 blur-3xl opacity-60" />
                                        </div>

                                        <div className="absolute inset-px rounded-[31px] border border-white/10" />
                                        <div
                                            className={`absolute inset-0 rounded-[32px] ring-1 ring-white/0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
                                                }`}
                                            style={{
                                                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)",
                                            }}
                                        />

                                        <div className="relative z-10 flex h-full flex-col p-8 sm:p-10">
                                            <div className="mb-6 flex items-center justify-between">
                                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl">
                                                    <span className="text-white/80">0{index + 1}</span>
                                                    <span>/</span>
                                                    <span>{typedSkills.length}</span>
                                                </div>
                                                <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                                            </div>

                                            <div
                                                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${skill.iconBg ?? theme.iconBg
                                                    } text-2xl shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-transform duration-500 group-hover:scale-110`}
                                            >
                                                {skill.icon ?? <Sparkles className="h-6 w-6 text-white/90" />}
                                            </div>

                                            <h3 className="text-2xl font-semibold tracking-tight text-white">
                                                {skill.title}
                                            </h3>

                                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                                                {skill.description}
                                            </p>

                                            <div className="mt-auto pt-8">
                                                <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                                                    Tools & stack
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {skill.tools.map((tool) => (
                                                        <span
                                                            key={tool}
                                                            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[11px] text-white/70 backdrop-blur-xl"
                                                        >
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;