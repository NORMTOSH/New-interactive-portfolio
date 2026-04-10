// src/components/AchievementsSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Trophy, TrendingUp, Star } from "lucide-react";
import TextReveal from "./TextReveal";
import { achievements } from "@/data/Achievement";

gsap.registerPlugin(ScrollTrigger);

const colorMap: Record<
  string,
  { border: string; text: string; bg: string; glow: string; dot: string }
> = {
  primary: {
    border: "border-primary/25",
    text: "text-primary",
    bg: "bg-primary/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(175_85%_55%/0.16)]",
    dot: "bg-primary",
  },
  secondary: {
    border: "border-secondary/25",
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(35_95%_60%/0.16)]",
    dot: "bg-secondary",
  },
  accent: {
    border: "border-accent/25",
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(280_70%_65%/0.16)]",
    dot: "bg-accent",
  },
};

const stats = [
  { icon: Trophy, label: "Milestones", value: "Featured wins" },
  { icon: TrendingUp, label: "Growth", value: "Consistent progress" },
  { icon: Star, label: "Impact", value: "Measured outcomes" },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timers: number[] = [];

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;

      const updateCardStates = () => {
        const viewportRect = viewport.getBoundingClientRect();
        const viewportCenterX = viewportRect.left + viewportRect.width / 2;
        const maxDistance = viewportRect.width * 0.5;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(viewportCenterX - cardCenterX);

          const progress = gsap.utils.clamp(0, 1, 1 - distance / maxDistance);

          gsap.to(card, {
            opacity: gsap.utils.interpolate(0.25, 1, progress),
            scale: gsap.utils.interpolate(0.92, 1.06, progress),
            y: gsap.utils.interpolate(18, 0, progress),
            rotateY: gsap.utils.interpolate(12, 0, progress),
            filter: `blur(${gsap.utils.interpolate(0.6, 0, progress)}px)`,
            boxShadow:
              progress > 0.82
                ? "0 30px 90px rgba(0,0,0,0.28)"
                : "0 18px 50px rgba(0,0,0,0.12)",
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const getCenterX = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return rect.left + rect.width / 2;
      };

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenterX = viewportRect.left + viewportRect.width / 2;

      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      const initialX = viewportCenterX - getCenterX(firstCard);
      const finalX = viewportCenterX - getCenterX(lastCard);

      gsap.set(track, {
        x: initialX,
        willChange: "transform",
      });

      gsap.set(cards, {
        opacity: 0.35,
        y: 24,
        scale: 0.92,
        rotateY: 10,
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      updateCardStates();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(finalX - initialX) + window.innerHeight * 0.85}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateCardStates,
          onRefresh: updateCardStates,
        },
      });

      tl.to(track, {
        x: finalX,
        ease: "none",
        duration: 1,
      });

      timers.push(
        window.setTimeout(() => {
          ScrollTrigger.refresh();
          updateCardStates();
        }, 160)
      );

      return () => {
        timers.forEach((t) => window.clearTimeout(t));
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-padding noise-bg relative min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[180px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-[520px] w-[520px] rounded-full bg-secondary/5 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl md:mb-14 md:p-8"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
              Achievements
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl">
                <TextReveal.Line>
                  Key <span className="text-gradient-warm">Achievements</span>
                </TextReveal.Line>
              </TextReveal>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                A curated look at the outcomes, milestones, and progress markers that show the direction of the work.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.24em] text-white/45">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/85">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mx-auto w-full max-w-7xl overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 pb-8 md:gap-6 md:px-12 lg:px-24"
          style={{ perspective: "1200px" }}
        >
          {achievements.map((item, i) => {
            const colors = colorMap[item.color] ?? colorMap.primary;

            return (
              <article
                key={`${item.year}-${i}`}
                className={`group relative flex-shrink-0 w-[clamp(290px,24vw,430px)] overflow-hidden rounded-[2rem] border ${colors.border} bg-card/90 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] ${colors.glow}`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.03]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.28em] text-muted-foreground">
                      {item.year}
                    </span>

                    <div className={`rounded-2xl border border-white/10 px-4 py-3 ${colors.bg}`}>
                      <span className={`block text-2xl font-bold ${colors.text}`}>
                        {item.metric}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                      Milestone
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold tracking-tight md:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
      </div>
    </section>
  );
};

export default AchievementsSection;