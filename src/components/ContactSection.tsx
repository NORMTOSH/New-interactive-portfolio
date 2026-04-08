// src/components/ContactSection.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import ContactForm from "./ContactForm";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Dribbble } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.to(glowRef.current, {
        yPercent: -35,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const links = [
    { label: "GitHub", href: "#", icon: Github },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Twitter / X", href: "#", icon: Twitter },
    { label: "Dribbble", href: "#", icon: Dribbble },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="section-padding noise-bg relative overflow-hidden"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[420px] w-[820px] rounded-full bg-primary/5 blur-[200px] will-change-transform" />
        </div>

        <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-primary">
              Let&apos;s Connect
            </p>

            <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <TextReveal.Line>Ready to build</TextReveal.Line>
              <TextReveal.Line>
                <span className="text-gradient-primary">something great?</span>
              </TextReveal.Line>
            </TextReveal>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              I&apos;m open to new projects, creative collaborations, and product ideas
              that need thoughtful design and strong execution.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-border/60 bg-card/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Available for
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                    Freelance, contract, and product collaborations
                  </h3>
                </div>

                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Open
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Response
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Fast and direct</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">UI / Brand / Web</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Remote / Global</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[var(--glow-primary)]"
                >
                  <Mail className="h-4 w-4" />
                  Say Hello
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card px-6 py-3.5 font-semibold text-foreground transition-colors duration-300 hover:bg-muted"
                >
                  View Projects
                </a>
              </div>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  What I usually help with
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Portfolio websites", "Product UI", "Brand systems", "Landing pages", "Dashboards"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-border/60 bg-card/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Social
                  </p>
                  <h3 className="mt-2 text-xl font-bold">Find me here</h3>
                </div>
              </div>

              <div className="grid gap-3">
                {links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-muted/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card">
                          <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                        </span>
                        <div>
                          <p className="font-medium text-foreground">{link.label}</p>
                          <p className="text-sm text-muted-foreground">Open profile</p>
                        </div>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-background/50 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Preferred contact
                </p>
                <a
                  href="mailto:hello@example.com"
                  className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary"
                >
                  hello@example.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-border/60 pt-8 text-center">
            <p className="font-mono text-xs text-muted-foreground">
              © 2024 — Designed & Built with passion
            </p>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default ContactSection;