import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [breakpoint]);

  return isMobile;
}

const ScrollProgress = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const setDotState = useCallback((i: number, active: boolean) => {
    const dot = dotsRef.current[i];
    if (!dot) return;

    gsap.to(dot.querySelector(".dot-inner"), {
      scale: active ? 1 : 0.55,
      opacity: active ? 1 : 0.35,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(dot.querySelector(".dot-label"), {
      opacity: active ? 1 : 0,
      x: active ? 0 : -8,
      duration: 0.25,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0, scaleX: 0 },
          {
            scaleY: isMobile ? 1 : 0,
            scaleX: isMobile ? 0 : 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const updateActiveSection = () => {
        const probeY = window.innerHeight * 0.45;
        let current = 0;

        for (let i = 0; i < sections.length; i++) {
          const el = document.getElementById(sections[i].id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();

          // Section becomes active only after its top crosses the probe line.
          if (rect.top <= probeY) {
            current = i;
          }
        }

        setActiveIndex(current);
      };

      updateActiveSection();

      window.addEventListener("scroll", updateActiveSection, { passive: true });
      window.addEventListener("resize", updateActiveSection);

      ScrollTrigger.addEventListener("refresh", updateActiveSection);

      const refreshId = window.setTimeout(() => {
        ScrollTrigger.refresh();
        updateActiveSection();
      }, 100);

      return () => {
        window.clearTimeout(refreshId);
        window.removeEventListener("scroll", updateActiveSection);
        window.removeEventListener("resize", updateActiveSection);
        ScrollTrigger.removeEventListener("refresh", updateActiveSection);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    sections.forEach((_, i) => setDotState(i, i === activeIndex));
  }, [activeIndex, setDotState]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,420px)] -translate-x-1/2 pointer-events-auto"
        aria-label="Page progress navigation"
      >
        <div className="rounded-2xl border border-border/50 bg-background/80 px-3 py-3 shadow-lg backdrop-blur-md">
          <div className="relative mb-3 h-[2px] w-full rounded-full bg-border/30">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left rounded-full bg-primary"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="grid grid-cols-7 gap-1">
            {sections.map((section, i) => (
              <button
                key={section.id}
                type="button"
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                onClick={() => scrollTo(section.id)}
                className="group flex flex-col items-center gap-1 focus:outline-none"
                aria-label={`Scroll to ${section.label}`}
              >
                <div className="dot-inner h-2.5 w-2.5 rounded-full border-2 border-background bg-primary opacity-35 scale-50 shadow-sm" />
                <span className="dot-label max-w-full truncate text-[9px] font-mono uppercase tracking-[0.16em] text-primary/80 opacity-0 -translate-x-2">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 pointer-events-auto md:flex"
      aria-label="Page progress navigation"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="relative w-[2px] rounded-full bg-border/30"
          style={{ height: `${(sections.length - 1) * 40 + 12}px` }}
        >
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full origin-top rounded-full bg-primary"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="absolute top-0 left-1/2 flex -translate-x-1/2 flex-col" style={{ gap: "28px" }}>
          {sections.map((section, i) => (
            <button
              key={section.id}
              type="button"
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="group relative flex items-center focus:outline-none"
              onClick={() => scrollTo(section.id)}
              aria-label={`Scroll to ${section.label}`}
            >
              <div className="dot-inner h-3 w-3 rounded-full border-2 border-background bg-primary opacity-35 scale-50 shadow-sm transition-colors" />
              <span className="dot-label pointer-events-none absolute left-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-primary opacity-0 -translate-x-2">
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;