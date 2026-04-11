// src/components/SkillsSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
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
      if (headingRef.current) {
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
      }

      if (lanesRef.current) {
        const laneRows = Array.from(
          lanesRef.current.querySelectorAll(".skill-lane")
        );
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

        const laneCards = Array.from(
          lanesRef.current.querySelectorAll(".skill-pill")
        );
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
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="m57.063 20.218l1.029-1.698s.906-1.502.906-3.519c0-4.886-4.662-4.757-4.662-4.757L44.179 7.479L38.638 2l-7.291 1.985l-2.391-.651l-1.817 1.797l-10.497 2.858s-4.04-.111-4.04 4.123c0 1.748.786 3.05.786 3.05l1.351 2.23l-1.187 1.172l-5.86 1.596s-4.662-.129-4.662 4.757a7.56 7.56 0 0 0 .779 3.281L2 29.987l.949.376c.021.051.029.108.07.149c1.835 1.839 1.684 4.309 1.422 5.643l-1.109 1.111l8.401 4.039L23.271 60.35c1.849 2.906 5.774 1.088 5.774 1.088l29.649-14.256l-1.109-1.111c-.262-1.334-.413-3.804 1.422-5.644c.041-.041.049-.098.07-.148l.949-.377l-5.513-5.45l6.33-3.043l-.961-.963c-.227-1.156-.358-3.297 1.233-4.891c.035-.036.041-.084.06-.129l.825-.327zm-5.685-8.835l-1.25 1.978l-3.234-3.198zM39.176 7.144l4.643 4.963l-16.789 6.067l-3.965-6.156zM15.744 19.052l11.457 18.911l-21.827-8.658zm-4.775 2.067l-1.345 1.33l-.538-.825zm-4.247 1.034l1.252 1.927l-2.713 2.682a5.6 5.6 0 0 1-.331-1.845c0-1.826.906-2.521 1.792-2.764M5.154 37.026l.015-.058l25.147 11.007l-24.95-11.894c.023-.135.041-.284.06-.434l19.533 8.18l-19.465-9.116a8 8 0 0 0-.086-1.245l18.079 7.445L5.165 32.4a6 6 0 0 0-.47-1.137l24.883 10.625l.566.934c1.167 1.834 3.284 1.495 4.351 1.177c1.475.728 4.119 2.412 3.442 4.893c-.357 1.312-1.142 1.948-2.399 1.948c-1.273 0-2.544-.666-2.557-.675zM30.2 50.185l-1.966.814l-1.67-2.563zm-7.614 5.381l-7.729-12.759l7.682 3.693l3.633 5.592c-1.465.626-3.102 2.055-3.586 3.474m34.033-12.184a8 8 0 0 0-.086 1.245l-19.465 9.116l19.533-8.18c.019.149.036.299.06.434l-24.95 11.895l25.147-11.007l.015.058L29.046 60.08c-.013.009-1.282.675-2.557.675c-1.258 0-2.042-.637-2.399-1.948c-.918-3.367 4.302-5.276 4.38-5.305l4.575-1.952c.491.209 3.994 1.584 5.711-1.115l1.083-1.786l17.494-7.47a6 6 0 0 0-.471 1.137L38.54 50.827zm.034-4.161l-14.825 6.144l4.114-6.791l6.767-3.253zm2.393-11.107a7 7 0 0 0-.075 1.079l-16.868 7.9l16.928-7.089c.017.129.031.26.052.376L37.459 40.688l21.794-9.539l.013.05l-24.117 11.387c-.011.007-1.112.585-2.216.585c-1.091 0-1.77-.553-2.079-1.689c-.796-2.918 3.728-4.572 3.796-4.597l25.014-10.68a5.3 5.3 0 0 0-.407.986l-15.88 7.376z" /></svg>
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
                A structured view of the tools and disciplines I use to build modern
                web products, intelligent systems, and polished visual experiences.
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
                  <p className="mt-2 text-sm font-medium text-white/85">
                    {item.value}
                  </p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.03]" />

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
                          className={`skill-pill relative min-w-[170px] rounded-2xl border border-white/10 bg-gradient-to-br ${lane.accent} px-4 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]`}
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