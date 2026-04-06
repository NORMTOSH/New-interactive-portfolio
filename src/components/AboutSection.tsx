// src/components/AboutSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code, Palette, Brain, Link, Sparkles } from "lucide-react";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        photoRef.current,
        { x: -70, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        bioRef.current,
        { x: 70, opacity: 0, y: 10 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      [glowARef, glowBRef].forEach((ref, i) => {
        gsap.to(ref.current, {
          yPercent: i === 0 ? -45 : 35,
          xPercent: i === 0 ? 18 : -22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".about-highlight",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    { icon: Code, label: "Full-Stack Product Builder" },
    { icon: Link, label: "Web3 & DeFi Systems" },
    { icon: Palette, label: "UI/UX & Brand Design" },
    { icon: Brain, label: "ML & Data Exploration" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding noise-bg relative overflow-hidden min-h-screen"
    >
      <div
        ref={glowARef}
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[170px] will-change-transform"
      />
      <div
        ref={glowBRef}
        className="absolute -bottom-36 -right-36 w-[440px] h-[440px] rounded-full bg-secondary/5 blur-[170px] will-change-transform"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={badgeRef} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/70">
            About
          </span>
        </div>

        <div ref={titleRef} className="mb-14 sm:mb-16">
          <TextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            <TextReveal.Line>Who I Am</TextReveal.Line>
          </TextReveal>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            A creative engineer shaping thoughtful digital experiences through code, design, and experimentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div ref={photoRef} className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-md opacity-80 transition-all duration-500 group-hover:opacity-100" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.03))]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
                      <User className="h-12 w-12 text-white/35" strokeWidth={1.2} />
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/45">
                        your-photo.jpg
                      </p>
                      <p className="mt-2 text-sm text-white/55">
                        Add a portrait here for a stronger personal touch.
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          <div ref={bioRef} className="lg:col-span-3 space-y-6">
            <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-3xl">
              I am a multidisciplinary builder who enjoys working at the intersection of
              <span className="text-primary font-medium"> engineering</span>,
              <span className="text-secondary font-medium"> design</span>, and
              <span className="text-accent font-medium"> emerging technology</span>.
              I like turning ambitious ideas into polished, usable products.
            </p>

            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              My process blends technical depth with a strong visual instinct. Whether I am building interfaces,
              shaping product systems, or exploring new tools, I focus on clarity, performance, and thoughtful detail.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="about-highlight flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                    <Icon className="h-4.5 w-4.5 text-primary shrink-0" />
                  </div>
                  <span className="font-mono text-xs sm:text-[13px] text-muted-foreground tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="about-highlight mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono tracking-wide text-white/65 backdrop-blur-md">
                Based in Kenya
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono tracking-wide text-white/65 backdrop-blur-md">
                Open to collaborations
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono tracking-wide text-white/65 backdrop-blur-md">
                Available for freelance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;