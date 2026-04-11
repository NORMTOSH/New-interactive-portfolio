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
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="M39.195 37.311c-4.338-2.949-9.924-3.91-15.049-2.584c-1.35.365-.359 3.523.904 3.201c4.719-1.201 9.277.141 12.143 2.084c1.065.75 3.073-1.955 2.002-2.701m10.49-20.273l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.152.202a8.2 8.2 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268s8.27-3.709 8.27-8.268a8.25 8.25 0 0 0-1.393-4.591m-6.878 11.358a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.73 6.73 0 0 1 1.006 3.55a6.776 6.776 0 0 1-6.769 6.768m-13.346-6.767a8.23 8.23 0 0 0-1.392-4.591l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.153.202a8.2 8.2 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56-.001 8.27-3.709 8.27-8.268m-8.27 6.767a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.73 6.73 0 0 1 1.006 3.55c.001 3.732-3.035 6.768-6.769 6.768" /><path fill="currentColor" d="M32 2C16.531 2 4 14.533 4 30a27.83 27.83 0 0 0 3.895 14.209c-.392.896-.744 1.848-.791 3.047q-.016.305-.037.654c-.135 2.057-.334 5.166 2.416 9.063c1.775 2.512 4.531 4.162 7.969 4.766c1.219.213 2.467.295 3.822.25c2.217-.076 3.773-.156 4.625-1.703c.722-1.309-.109-2.135.507-2.856A28 28 0 0 0 32 58c15.469 0 28-12.533 28-28S47.469 2 32 2m-6.989 55.969c.277 1.699-.689 3.305-7.216 2.127c-10.741-1.938-10.012-12.1-8.277-15.761c1.274-2.689 1.08-3.833.344-7.171c-.669-3.029 5.053-1.658 5.217 1.974c.121 2.694-.916 4.068.375 5.253c2.886 2.65 11.213 1.198 16.842.004c2.408-.511 3.646 1.931 1.861 3.175c-1.908 1.333-4.139 1.874-7.439 2.116c-1.723.125.221.68-.049 2.316c-.147.898-1.088.867-1.052 1.801c.019.497 1.044 1.02.347 2.27c-.207.373-1.133.801-.953 1.896M32 55.5c-1.536 0-3.037-.147-4.499-.41a2.7 2.7 0 0 0-.278-.83c-.377-.738 1.498-1.5.736-3.482c2.857-.469 4.982-1.02 6.951-2.139c2.117-1.203 2.188-2.514 2.043-3.188c-.246-1.123-1.404-2.049-2.887-2.309a4.2 4.2 0 0 0-1.686.037c-3.125.758-10.604 1.779-14.387 1.115c-1.063-.188-1.41-.441-1.508-.541c-.549-.551-.445-1.605-.176-3.785c.33-2.68-2.078-5.537-4.213-5.912l-.137-.023c-1.178-.148-2.229.191-2.883.934c-.732.826-.896 2.061-.453 3.383c.349 1.039.428 1.873.36 2.615A25.4 25.4 0 0 1 6.5 30c0-7.028 2.858-13.401 7.473-18.018c.079.022.152.022.213-.015a13.28 13.28 0 0 1 11.256-.983c.512.198 1.328-1.683.703-1.92a15.3 15.3 0 0 0-7.538-.752A25.34 25.34 0 0 1 32 4.5c7.063 0 13.464 2.889 18.087 7.544a15.33 15.33 0 0 0-12.929 1.157c-.572.342.557 2.049 1.029 1.768a13.28 13.28 0 0 1 11.256-.986c.429.167 1.06-1.114.89-1.68C54.765 16.893 57.5 23.131 57.5 30c0 14.061-11.439 25.5-25.5 25.5" /></svg>          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
            About Me
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