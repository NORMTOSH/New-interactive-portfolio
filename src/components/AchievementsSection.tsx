import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { achievements } from "@/data/Milestones";

gsap.registerPlugin(ScrollTrigger);

const colorMap: Record<string, { border: string; text: string; bg: string; glow: string }> = {
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      if (scrollRef.current) {
        const cardElements = Array.from(scrollRef.current.children) as HTMLElement[];
        const totalWidth = cardElements.reduce((acc, el) => acc + el.offsetWidth + 24, 0);
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, totalWidth - viewportWidth + 96);

        // Set cards to initial hidden state
        gsap.set(cardElements, { opacity: 0, y: 60, scale: 0.92, rotateY: 12 });

        // Animate each card in as it enters the viewport during horizontal scroll
        cardElements.forEach((card, i) => {
          const cardLeft = card.offsetLeft;
          // Calculate what scroll progress brings this card into view
          const enterProgress = Math.max(0, (cardLeft - viewportWidth * 0.7) / scrollDistance);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              // Card should animate in when scroll progress passes its enter point
              const cardProgress = Math.min(1, Math.max(0, (progress - enterProgress) / 0.12));
              gsap.to(card, {
                opacity: cardProgress,
                y: 60 * (1 - cardProgress),
                scale: 0.92 + 0.08 * cardProgress,
                rotateY: 12 * (1 - cardProgress),
                duration: 0.1,
                overwrite: "auto",
              });
            },
          });
        });

        // Make first 2 cards visible immediately (already in viewport)
        gsap.to(cardElements.slice(0, 2), {
          opacity: 1, y: 0, scale: 1, rotateY: 0,
          duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
        });

        gsap.to(scrollRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    // Delay refresh to let other sections mount
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="section-padding noise-bg relative overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-secondary mb-3">
            Milestones
          </p>
          <TextReveal className="text-4xl md:text-6xl font-bold tracking-tight">
            <TextReveal.Line>Key <span className="text-gradient-warm">Achievements</span></TextReveal.Line>
          </TextReveal>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 px-6 md:px-12 lg:px-24 pb-4"
        style={{ scrollBehavior: "auto", perspective: "1000px" }}
      >
        {achievements.map((item, i) => {
          const colors = colorMap[item.color];
          return (
            <div
              key={i}
              className={`group flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-2xl bg-card border ${colors.border} card-hover ${colors.glow} transition-shadow duration-500`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs tracking-wider text-muted-foreground">
                  {item.year}
                </span>
                <div className={`px-4 py-2 rounded-lg ${colors.bg}`}>
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {item.metric}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {item.metricLabel}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;
