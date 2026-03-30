import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: contentRef.current, start: "top 85%", once: true },
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
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Dribbble", href: "#" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-padding noise-bg relative overflow-hidden">
      <div ref={glowRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/3 rounded-full blur-[200px] will-change-transform" />
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto text-center relative z-10">
        <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
          Let's Connect
        </p>
        <TextReveal className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <TextReveal.Line>Ready to build</TextReveal.Line>
          <TextReveal.Line><span className="text-gradient-primary">something great?</span></TextReveal.Line>
        </TextReveal>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of something amazing.
        </p>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:shadow-[var(--glow-primary)] transition-all duration-300 mb-12"
        >
          Say Hello
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <div className="flex items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground">
            © 2024 — Designed & Built with passion
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
