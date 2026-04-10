// src/components/SkillsSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import TextReveal from "./TextReveal";
import { lanes, skillStats } from "@/data/Skills";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lanesRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      if (lanesRef.current) {
        const laneRows = Array.from(lanesRef.current.querySelectorAll(".skill-lane"));
        gsap.fromTo(
          laneRows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: lanesRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        const laneCards = Array.from(lanesRef.current.querySelectorAll(".skill-pill"));
        gsap.fromTo(
          laneCards,
          { y: 18, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lanesRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      [glowARef, glowBRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          yPercent: i === 0 ? -40 : 35,
          xPercent: i === 0 ? 18 : -20,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding noise-bg relative overflow-hidden"
    >
      <div
        ref={glowARef}
        className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[180px] will-change-transform"
      />
      <div
        ref={glowBRef}
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[180px] will-change-transform"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={headingRef}
          className="mb-14 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-8"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
              Skill stack
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl">
                <TextReveal.Line>
                  Core <span className="text-gradient-accent">Skills</span>
                </TextReveal.Line>
              </TextReveal>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                A structured view of the tools and disciplines I use to build polished, modern digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {skillStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-md"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/45">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/85">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={lanesRef} className="space-y-5">
          {lanes.map((lane, index) => {
            const Icon = lane.icon;

            return (
              <div
                key={lane.title}
                className="skill-lane group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] md:p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.03] opacity-100" />

                <div className="relative grid gap-5 md:grid-cols-[220px_1fr] md:items-stretch">
                  <div className="relative flex items-start gap-4 md:flex-col md:gap-3 md:pt-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="md:pl-1">
                      <h3 className="text-lg font-semibold text-foreground md:text-xl">
                        {lane.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                        0{index + 1}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-[23px] top-[56px] hidden w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent md:block" />
                  </div>

                  <div className="relative overflow-x-auto pb-2">
                    <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 md:block" />

                    <div className="flex min-w-max gap-3 md:gap-4">
                      {lane.items.map((item, itemIndex) => (
                        <div
                          key={item}
                          className={`skill-pill relative min-w-[170px] rounded-2xl border border-white/10 bg-gradient-to-br ${lane.accent} px-4 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8`}
                        >
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                          <div className="relative">
                            <div className="mb-3 flex items-center gap-2">
                              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                                <span className="absolute h-3.5 w-3.5 rounded-full border border-primary/60 bg-primary/20" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                                0{itemIndex + 1}
                              </span>
                            </div>

                            <p className="text-sm font-medium text-foreground/90">
                              {item}
                            </p>

                            <div className="mt-3 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#expertise"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/75 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Explore expertise
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;