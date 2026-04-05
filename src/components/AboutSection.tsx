import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code, Palette, Brain, Link } from "lucide-react";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        bioRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Parallax on background glows
      [glowARef, glowBRef].forEach((ref, i) => {
        gsap.to(ref.current, {
          yPercent: i === 0 ? -50 : 40,
          xPercent: i === 0 ? 20 : -25,
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

  const highlights = [
    { icon: Code, label: "5+ Years Building Products" },
    { icon: Link, label: "Web3 & DeFi Architect" },
    { icon: Palette, label: "UI/UX & Brand Designer" },
    { icon: Brain, label: "ML & Data Enthusiast" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding noise-bg relative overflow-hidden h-screen"
    >
      <div ref={glowARef} className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[160px] will-change-transform" />
      <div ref={glowBRef} className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[160px] will-change-transform" />
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3">
          // About
        </p>
        <TextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-16 tracking-tight">
          <TextReveal.Line>Who I Am</TextReveal.Line>
        </TextReveal>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Profile photo placeholder */}
          <div ref={photoRef} className="md:col-span-2 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-card border border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <User className="w-16 h-16 text-muted-foreground/40" strokeWidth={1} />
                  <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                    your-photo.jpg
                  </span>
                </div>
              </div>
              {/* Decorative border glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 -z-10 blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="absolute -inset-3 rounded-3xl border border-primary/5 -z-20" />
            </div>
          </div>

          {/* Bio content */}
          <div ref={bioRef} className="md:col-span-3 space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm a multidisciplinary engineer who thrives at the intersection of
              <span className="text-primary font-medium"> code</span>,
              <span className="text-secondary font-medium"> design</span>, and
              <span className="text-accent font-medium"> emerging tech</span>.
              From architecting full-stack platforms to deploying smart contracts
              and training ML models, I bring ideas to life end-to-end.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My approach blends rigorous engineering with a designer's eye for
              detail. I believe the best digital products are built when
              technical depth meets creative vision — and I bring both to every
              project I take on.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card/50 border border-border/50"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono text-xs text-muted-foreground tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;