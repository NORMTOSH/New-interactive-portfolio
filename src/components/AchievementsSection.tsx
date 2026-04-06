// src/components/AchievementsSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { achievements } from "@/data/Milestones";

gsap.registerPlugin(ScrollTrigger);

const colorMap: Record<
  string,
  { border: string; text: string; bg: string; glow: string }
> = {
  primary: {
    border: "border-primary/30",
    text: "text-primary",
    bg: "bg-primary/10",
    glow: "group-hover:shadow-[0_0_40px_hsl(175_85%_55%/0.15)]",
  },
  secondary: {
    border: "border-secondary/30",
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "group-hover:shadow-[0_0_40px_hsl(35_95%_60%/0.15)]",
  },
  accent: {
    border: "border-accent/30",
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "group-hover:shadow-[0_0_40px_hsl(280_70%_65%/0.15)]",
  },
};

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
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

      const getScrollDistance = () => {
        const viewportWidth = viewport.offsetWidth;
        const totalWidth = track.scrollWidth;
        return Math.max(0, totalWidth - viewportWidth);
      };

      gsap.set(cards, {
        opacity: 0.2,
        y: 40,
        scale: 0.94,
        rotateY: 10,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.85}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        duration: 1,
      });

      cards.forEach((card, i) => {
        const t = i * 0.14;

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          t
        );

        tl.to(
          card,
          {
            opacity: i === cards.length - 1 ? 1 : 0.35,
            scale: 0.97,
            y: -8,
            duration: 0.35,
            ease: "power2.inOut",
          },
          t + 0.45
        );
      });

      const refresh = setTimeout(() => ScrollTrigger.refresh(), 150);
      return () => clearTimeout(refresh);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative min-h-screen overflow-hidden backdrop-blur-md section-padding noise-bg"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-10 md:mb-14">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-secondary">
            Milestones
          </p>
          <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl">
            <TextReveal.Line>
              Key{" "}
              <span className="text-gradient-warm">Achievements</span>
            </TextReveal.Line>
          </TextReveal>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mx-auto w-full max-w-none overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-6 pb-8 md:gap-6 md:px-12 lg:px-24"
          style={{ perspective: "1200px" }}
        >
          {achievements.map((item, i) => {
            const colors = colorMap[item.color] ?? colorMap.primary;

            return (
              <article
                key={`${item.year}-${i}`}
                className={`group relative flex-shrink-0 w-[clamp(280px,24vw,420px)] rounded-3xl border ${colors.border} bg-card/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-shadow duration-500 ${colors.glow}`}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.03] pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-wider text-muted-foreground">
                      {item.year}
                    </span>

                    <div className={`rounded-xl px-4 py-3 ${colors.bg}`}>
                      <span className={`block text-2xl font-bold ${colors.text}`}>
                        {item.metric}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-3 text-lg font-bold tracking-tight md:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;