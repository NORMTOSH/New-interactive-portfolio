import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Palette,
  Brain,
  Link,
  Sparkles,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import TextReveal from "./TextReveal";
import ExperienceModal from "./ExperienceModal";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const title = titleRef.current;
    const photo = photoRef.current;
    const bio = bioRef.current;
    const glowA = glowARef.current;
    const glowB = glowBRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      if (badge) {
        gsap.fromTo(
          badge,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (title) {
        gsap.fromTo(
          title,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      if (photo) {
        gsap.fromTo(
          photo,
          { x: -60, opacity: 0, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
              once: true,
            },
          }
        );
      }

      if (bio) {
        gsap.fromTo(
          bio,
          { x: 60, opacity: 0, y: 10 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
              once: true,
            },
          }
        );
      }

      if (glowA) {
        gsap.to(glowA, {
          yPercent: -40,
          xPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (glowB) {
        gsap.to(glowB, {
          yPercent: 32,
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".about-highlight",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
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
      className="section-padding noise-bg relative min-h-screen overflow-hidden"
    >
      <ExperienceModal open={isResumeOpen} onOpenChange={setIsResumeOpen} />

      <div
        ref={glowARef}
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[170px] will-change-transform"
      />
      <div
        ref={glowBRef}
        className="absolute -bottom-36 -right-36 h-[440px] w-[440px] rounded-full bg-secondary/5 blur-[170px] will-change-transform"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={badgeRef}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
            About • Novalorx Labs
          </span>
        </div>

        <div ref={titleRef} className="mb-14 sm:mb-16">
          <TextReveal className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <TextReveal.Line>Who I Am</TextReveal.Line>
          </TextReveal>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Co-Founder at Novalorx Labs, building thoughtful digital products through code, design,
            and experimentation.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <div
            ref={photoRef}
            className="flex justify-center lg:col-span-2 lg:justify-start"
          >
            <div className="group relative w-full max-w-[380px]">
              <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-md opacity-80 transition-all duration-500 group-hover:opacity-100" />
              <div className="relative rounded-[2.2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.03))]">
                  <img
                    src="/profile.jpeg"
                    alt="Profile portrait"
                    className="h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/75">
                        Co-Founder • Novalorx Labs
                      </span>
                    </div>

                    {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                      <Palette className="h-3.5 w-3.5 text-secondary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/75">
                        UI Designed by Me
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={bioRef} className="space-y-6 lg:col-span-3">
            <div className="space-y-5">
              <p className="max-w-3xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
                I am a multidisciplinary builder and co-founder of{" "}
                <span className="font-medium text-primary">Novalorx Labs</span>, working at the
                intersection of <span className="font-medium text-primary">engineering</span>,{" "}
                <span className="font-medium text-secondary">design</span>, and{" "}
                <span className="font-medium text-accent">emerging technology</span>. I turn ambitious
                ideas into polished, usable products.
              </p>

              <p className="max-w-3xl leading-relaxed text-muted-foreground">
                My process blends technical depth with a strong visual instinct. I also designed this UI,
                and that same attention to detail guides everything I build — from product systems and
                interfaces to performance and clarity.
              </p>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="about-highlight flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                    <Icon className="h-4.5 w-4.5 shrink-0 text-primary" />
                  </div>
                  <span className="font-mono text-xs tracking-wide text-muted-foreground sm:text-[13px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="about-highlight mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs tracking-wide text-white/65 backdrop-blur-md">
                Based in Kenya
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs tracking-wide text-white/65 backdrop-blur-md">
                Open to collaborations
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs tracking-wide text-white/65 backdrop-blur-md">
                Available for freelance
              </div>
            </div>

            <div className="about-highlight pt-2 flex flex-wrap gap-3">
              <Button
                onClick={() => setIsResumeOpen(true)}
                className="rounded-full px-6"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button asChild variant="outline" className="rounded-full hover:text-cyan-200 px-6 bg-slate-400/40 hover:bg-slate-400/50 border-slate-400/50 hover:border-cyan-400/70">
                <a
                  href="https://novalorxlabs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Novalorx Labs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;