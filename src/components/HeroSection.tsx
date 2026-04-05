// src/components/HeroSection.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PHRASES = ["Digital", "Immersive", "Refined", "Premium"];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const runTyping = async () => {
      while (!cancelled) {
        const phrase = PHRASES[phraseIndex];

        for (let i = 1; i <= phrase.length; i += 1) {
          if (cancelled) return;
          setTypedText(phrase.slice(0, i));
          await sleep(85);
        }

        await sleep(1100);

        for (let i = phrase.length - 1; i >= 0; i -= 1) {
          if (cancelled) return;
          setTypedText(phrase.slice(0, i));
          await sleep(45);
        }

        await sleep(180);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    };

    runTyping();

    return () => {
      cancelled = true;
    };
  }, [phraseIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(subtitleRef.current, { y: 18, opacity: 0, duration: 0.7 })
        .from(
          titleRef.current?.children ? Array.from(titleRef.current.children) : [],
          { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.35"
        )
        .from(descriptionRef.current, { y: 18, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(
          chipsRef.current?.children ? Array.from(chipsRef.current.children) : [],
          { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 },
          "-=0.35"
        )
        .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.7 }, "-=0.35");

      gsap.to(glowRef.current, {
        x: 24,
        y: -18,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chips = ["Full Stack Dev", "Blockchain", "Graphic Design", "Machine Learning"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden section-padding noise-bg isolate"
    >
      {/* Premium ambient glow */}
      <div
        ref={glowRef}
        className="absolute left-[-120px] top-1/3 w-[520px] h-[520px] rounded-full bg-primary/12 blur-[140px] pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03)] mb-6">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
            <p
              ref={subtitleRef}
              className="font-mono text-[11px] sm:text-xs tracking-[0.34em] uppercase text-muted-foreground"
            >
              Creative Technologist & Builder
            </p>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.88] tracking-[-0.05em] mb-8"
            aria-label={`Crafting ${PHRASES[phraseIndex]} Experiences`}
          >
            <span className="block text-foreground">Crafting</span>

            <span className="block text-gradient-primary">
              <span>{typedText || "\u00A0"}</span>
              <span className="inline-block w-[0.08em] h-[0.92em] translate-y-[0.08em] ml-1 bg-current align-middle animate-pulse" />
            </span>

            <span className="block text-foreground">Experiences</span>
          </h1>

          <p
            ref={descriptionRef}
            className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-8 mb-10"
          >
            I design and build elegant digital experiences with a sharp eye for detail,
            motion, and performance.
          </p>

          <div ref={chipsRef} className="flex flex-wrap gap-3 mb-10">
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/80 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_hsl(var(--primary)/0.3)]"
            >
              View Projects
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="#contact"
              className="font-mono text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors underline underline-offset-8"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;