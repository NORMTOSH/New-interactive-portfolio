// src/components/ExpertiseSection.tsx
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers3, Sparkles } from "lucide-react";
import TextReveal from "./TextReveal";
import { mainskills } from "@/data/Expertise";
import type { MainSkill } from "@/data/Expertise";
import ExpertiseModal from "./ExpertiseModal";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

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

    const typedMainSkills: MainSkill[] = mainskills;

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
                    filter: i === 0 ? "blur(0px)" : "blur(0.45px)",
                    willChange: "transform, opacity, filter",
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (cards.length + 1.4)}`,
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
                        z: 140 - i * 18,
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
                            z: -340 - i * 24,
                            y: -120 - i * 14,
                            scale: 0.92 - i * 0.015,
                            opacity: 0.1,
                            filter: "blur(0.7px)",
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
    }, [typedMainSkills.length]);

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
            <ExpertiseModal open={isExpertiseOpen} onOpenChange={setIsExpertiseOpen} />

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="M60.066 28.001C56.193 19.43 46.561 12.712 49.358 2L11.703 6.717a22 22 0 0 0-.403 1.882l-1.358.119a23 23 0 0 0-.808 4.11l-.963.085c-.942 3.221-.993 6.183-.49 8.981L2 23.583c1.645.97 3.23 1.993 4.689 3.089a22.4 22.4 0 0 1-1.004 4.646l5.045-1.137a81 81 0 0 0 2.497 4.346l-5.048 2.94c1.5.459 2.967.972 4.342 1.571A19 19 0 0 1 12.542 43l4.442-2.205c3.109 5.564 5.284 11.4 3.216 18.476c1.467-.759 2.953-1.491 4.438-2.228a22.8 22.8 0 0 1-.871 4.956c11.373-5.881 23.222-11.164 34.594-17.045c.44-1.506.568-3.021.512-4.508c.908-.483 1.83-.952 2.733-1.441c1.028-3.925-.121-7.863-1.54-11.004M9.487 21.357a17.5 17.5 0 0 1-.237-3.083q.219 1.512.617 2.971zm1.56-8.714c.104 2.731.769 5.284 1.798 7.719l-1.17.348c-.699-2.567-.978-5.231-.628-8.067m3.802 20.942a86 86 0 0 1-2.223-3.831l.798-.18a99 99 0 0 0 2.104 3.615zm7.937 22.267c.624-5.968-1.43-11.077-4.116-15.894l.736-.365c2.79 4.808 5.088 9.759 5.273 15.325c-.631.31-1.264.617-1.893.934m33.969-12.179c-5.432 2.792-25.748 12.56-30.354 14.879c1.176-9.347-3.454-16.869-7.949-24.174c-1.081-1.757-2.145-3.492-3.122-5.233l2.283-.515c5.873 8.509 13.112 16.578 10.148 27.927c9.596-5.208 19.547-10.026 29.242-15.122c-.024.769-.091 1.522-.248 2.238m3.206-5.909c-5.309 2.865-25.198 12.942-29.704 15.328c.739-8.897-4.2-15.821-8.998-22.545c-4.976-6.974-9.688-13.578-8.021-22.133l33.82-4.236c-.709 6.833 3.023 12.063 6.646 17.141c1.801 2.523 3.502 4.907 4.653 7.454c1.547 3.422 2.075 6.373 1.604 8.991" /><path fill="currentColor" d="m44.347 8.539l-28.466 5.129q.15 1.103.416 2.169l28.38-5.583a16 16 0 0 1-.33-1.715m1.345 4.671L17.58 19.574q.442 1.012.958 1.998l27.911-6.784a25 25 0 0 1-.757-1.578M20.584 25.064a71 71 0 0 0 1.261 1.898l27.166-7.896a62 62 0 0 1-.998-1.502zm11.445 19.755q.256 1.07.394 2.177l12.479-6.039a17 17 0 0 0-.354-1.951z" /></svg>
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
                            A focused look at the strengths reflected in my CV: building dependable
                            digital products, working with data and intelligent systems, supporting
                            infrastructure, and shaping clean visual work.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                "Full stack delivery",
                                "AI & data work",
                                "Web3 & systems",
                                "Creative execution",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] tracking-[0.22em] text-white/70 backdrop-blur-xl"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Button onClick={() => setIsExpertiseOpen(true)} className="rounded-full px-5">
                                <Layers3 className="mr-2 h-4 w-4" />
                                View expertise
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-white/[0.03] blur-3xl" />

                        <div
                            ref={stackRef}
                            className="relative h-[clamp(26rem,52vw,34rem)] w-full max-w-[38rem] overflow-visible [perspective:1800px]"
                        >
                            {typedMainSkills.map((mainskill, index) => {
                                const theme = themes[index % themes.length];
                                const isActive = index === activeIndex;
                                const isPast = index < activeIndex;
                                const isFuture = index > activeIndex;

                                return (
                                    <div
                                        key={mainskill.title}
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
                                        className={`group absolute inset-0 overflow-hidden rounded-[32px] border ${mainskill.borderColor ?? theme.border
                                            } bg-gradient-to-br ${mainskill.gradient ?? theme.gradient
                                            } shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl [transform-style:preserve-3d] transition-all duration-500 ease-out ${isActive
                                                ? "scale-[1.01] opacity-100 shadow-[0_40px_120px_rgba(0,0,0,0.42)]"
                                                : isPast
                                                    ? "opacity-20"
                                                    : "opacity-30"
                                            }`}
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
                                            className="absolute inset-0 transition-opacity duration-500"
                                            style={{
                                                opacity: isActive ? 1 : 0,
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
                                            className={`absolute inset-0 rounded-[32px] ring-1 transition-opacity duration-500 ${isActive ? "opacity-100 ring-white/20" : "opacity-0 ring-white/0"
                                                }`}
                                            style={{
                                                boxShadow: isActive
                                                    ? "inset 0 0 0 1px rgba(255,255,255,0.18)"
                                                    : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                                            }}
                                        />

                                        <div className="relative z-10 flex h-full flex-col p-8 backdrop-blur-md sm:p-10">
                                            <div className="mb-6 flex items-center justify-between">
                                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl">
                                                    <span className="text-white/80">0{index + 1}</span>
                                                    <span>/</span>
                                                    <span>{typedMainSkills.length}</span>
                                                </div>
                                                <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                                            </div>

                                            <div
                                                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${mainskill.iconBg ?? theme.iconBg
                                                    } text-2xl shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-500 ${isActive ? "scale-110" : "scale-100"
                                                    }`}
                                            >
                                                <span className="text-white/90">
                                                    {index === 0 ? "</>" : index === 1 ? "📊" : index === 2 ? "⛓" : "🛠"}
                                                </span>
                                            </div>

                                            <div
                                                className={`rounded-3xl p-6 backdrop-blur-md transition-all duration-500 ${isActive ? "bg-black/40" : "bg-black/28"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                                                        {mainskill.title}
                                                    </h3>
                                                    {isActive && (
                                                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75">
                                                            Active
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                                                    {mainskill.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-8">
                                                <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                                                    Tools & stack
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {mainskill.tools.map((tool) => (
                                                        <span
                                                            key={tool}
                                                            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] backdrop-blur-xl transition-all duration-300 ${isActive
                                                                ? "border-white/15 bg-white/[0.08] text-white/80"
                                                                : "border-white/10 bg-white/[0.04] text-white/65"
                                                                }`}
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