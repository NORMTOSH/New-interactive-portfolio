import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 40;

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(titleRef.current, { y: 120, opacity: 0, duration: 1.2, skewY: 5 })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          tagsRef.current?.children ? Array.from(tagsRef.current.children) : [],
          { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        )
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
        .from(gridRef.current, { opacity: 0, scale: 0.95, duration: 1 }, "-=0.8");

      // Parallax on scroll
      const parallaxItems = [
        { el: titleRef.current, yPercent: -30 },
        { el: subtitleRef.current, yPercent: -50 },
        { el: glowARef.current, yPercent: 40, xPercent: 20 },
        { el: glowBRef.current, yPercent: -30, xPercent: -15 },
        { el: gridRef.current, yPercent: 20 },
      ];

      parallaxItems.forEach(({ el, yPercent, xPercent }) => {
        gsap.to(el, {
          yPercent,
          ...(xPercent !== undefined && { xPercent }),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Floating particles
      if (particlesRef.current) {
        Array.from(particlesRef.current.children).forEach((p) => {
          const el = p as HTMLElement;
          const speed = 20 + Math.random() * 40;
          const xRange = 30 + Math.random() * 60;

          gsap.to(el, {
            y: `-=${speed + 40}`,
            x: `+=${(Math.random() - 0.5) * xRange}`,
            opacity: 0,
            duration: speed / 6,
            repeat: -1,
            delay: Math.random() * 8,
            ease: "none",
            onRepeat() {
              gsap.set(el, {
                y: 0,
                x: 0,
                opacity: parseFloat(el.dataset.opacity || "0.3"),
              });
            },
          });
        });
      }

      // Ambient glow drift
      gsap.to(glowARef.current, { x: 30, y: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(glowBRef.current, { x: -25, y: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { label: "Full Stack Dev", color: "primary" },
    { label: "Blockchain", color: "secondary" },
    { label: "Graphic Design", color: "accent" },
    { label: "Machine Learning", color: "primary" },
  ];

  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const size = 1 + Math.random() * 3;
    const opacity = 0.15 + Math.random() * 0.4;
    const left = Math.random() * 100;
    const top = 20 + Math.random() * 80;
    const colorVar =
      i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--secondary))" : "hsl(var(--accent))";
    return { size, opacity, left, top, colorVar };
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center section-padding noise-bg overflow-hidden"
    >
      {/* Ambient glow – parallax layers */}
      <div
        ref={glowARef}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px] will-change-transform"
      />
      <div
        ref={glowBRef}
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[140px] will-change-transform"
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
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
              backgroundColor: p.colorVar,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.colorVar}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center lg:items-start">
        <div className="max-w-3xl">
          <p
            ref={subtitleRef}
            className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 will-change-transform"
          >
            Creative Technologist & Builder
          </p>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight mb-8 will-change-transform"
          >
            <span className="text-foreground">Crafting</span>
            <br />
            <span className="text-gradient-primary">Digital</span>
            <br />
            <span className="text-foreground">Experiences</span>
          </h1>

          <div ref={tagsRef} className="flex flex-wrap gap-3 mb-10">
            {skills.map((skill) => (
              <span
                key={skill.label}
                className={`font-mono text-xs tracking-wider px-4 py-2 rounded-full border border-${skill.color}/20 text-${skill.color} bg-${skill.color}/5`}
              >
                {skill.label}
              </span>
            ))}
          </div>

          <div ref={ctaRef} className="flex items-center gap-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[var(--glow-primary)] transition-all duration-300"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Decorative grid – parallax */}
      <div
        ref={gridRef}
        className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none hidden lg:block will-change-transform"
      >
        <div className="w-full h-full grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-foreground/30" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;