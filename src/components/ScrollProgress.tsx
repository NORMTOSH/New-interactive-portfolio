// src/components/ScrollProgress.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "milestones", label: "Milestones" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const ScrollProgress = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Overall progress bar
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Highlight dots as sections enter
    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el || !dotsRef.current[i]) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => activateDot(i),
        onEnterBack: () => activateDot(i),
        onLeave: () => deactivateDot(i),
        onLeaveBack: () => deactivateDot(i),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const activateDot = (i: number) => {
    const dot = dotsRef.current[i];
    if (!dot) return;
    gsap.to(dot.querySelector(".dot-inner"), { scale: 1, opacity: 1, duration: 0.3 });
    gsap.to(dot.querySelector(".dot-label"), { opacity: 1, x: 0, duration: 0.3 });
  };

  const deactivateDot = (i: number) => {
    const dot = dotsRef.current[i];
    if (!dot) return;
    gsap.to(dot.querySelector(".dot-inner"), { scale: 0.5, opacity: 0.3, duration: 0.3 });
    gsap.to(dot.querySelector(".dot-label"), { opacity: 0, x: -8, duration: 0.3 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0"
    >
      {/* Track */}
      <div className="relative w-[2px] rounded-full bg-border/30" style={{ height: `${(sections.length - 1) * 40 + 12}px` }}>
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full rounded-full bg-primary origin-top"
          style={{ height: "100%", transform: "scaleY(0)" }}
        />
      </div>

      {/* Dots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col" style={{ gap: "28px" }}>
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={(el) => { dotsRef.current[i] = el; }}
            className="relative flex items-center cursor-pointer group"
            onClick={() => scrollTo(section.id)}
          >
            <div className="dot-inner w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm opacity-30 scale-50 transition-colors" />
            <span className="dot-label absolute left-6 font-mono text-[10px] tracking-widest uppercase text-primary opacity-0 -translate-x-2 whitespace-nowrap pointer-events-none">
              {section.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgress;
