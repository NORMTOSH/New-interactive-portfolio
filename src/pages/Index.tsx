// src/pages/Index.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  PhoneCall,
  MessageCircleMore,
  Linkedin,
  Github,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Scroll3DObject from "@/components/Scroll3DObject";
import ScrollProgress from "@/components/ScrollProgress";
import NightSkyBackground from "@/components/NightSkyBG";

const socialLinks = [
  {
    label: "Phone",
    href: "tel:+254700000000",
    icon: PhoneCall,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254700000000",
    icon: MessageCircleMore,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    icon: Github,
  },
];

const Index = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const leftNameRef = useRef<HTMLSpanElement>(null);
  const rightNameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });

      gsap.set(introRef.current, { xPercent: 0, autoAlpha: 1 });
      gsap.set([labelRef.current, lineRef.current, leftNameRef.current, rightNameRef.current], {
        autoAlpha: 0,
      });

      tl.fromTo(
        introRef.current,
        { autoAlpha: 0, scale: 1.02 },
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          labelRef.current,
          { y: 14, autoAlpha: 0, letterSpacing: "0.35em" },
          { y: 0, autoAlpha: 1, letterSpacing: "0.28em", duration: 0.7 },
          "+=0.15"
        )
        .fromTo(
          leftNameRef.current,
          { xPercent: -120, autoAlpha: 0, filter: "blur(10px)" },
          { xPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.05 },
          "-=0.1"
        )
        .fromTo(
          rightNameRef.current,
          { xPercent: 120, autoAlpha: 0, filter: "blur(10px)" },
          { xPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.05 },
          "<"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 0.65, ease: "power2.out" },
          "-=0.55"
        )
        .to([leftNameRef.current, rightNameRef.current], {
          scale: 1.03,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(
          [leftNameRef.current, rightNameRef.current],
          {
            textShadow: "0 0 24px rgba(255,255,255,0.22)",
            duration: 0.35,
          },
          "<"
        )
        .to(
          [labelRef.current, lineRef.current],
          {
            autoAlpha: 0,
            duration: 0.25,
          },
          "+=0.25"
        )
        .to(
          [leftNameRef.current, rightNameRef.current],
          {
            y: -18,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.in",
          },
          "<"
        )
        .to(
          introRef.current,
          {
            xPercent: -100,
            yPercent: -8,
            rotate: -1.5,
            duration: 1.05,
            ease: "power4.inOut",
          },
          "+=0.05"
        );
    }, introRef);

    return () => {
      document.body.style.overflow = "auto";
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <NightSkyBackground className="z-0" />

      <div
        ref={introRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-950 will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_35%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0 border border-white/5" />

        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <span
            ref={labelRef}
            className="mb-6 font-mono text-[11px] tracking-[0.28em] text-white/55 uppercase"
          >
            Portfolio / 2026
          </span>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              ref={leftNameRef}
              className="will-change-transform text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-[-0.05em]"
            >
              Norman
            </span>

            <span
              ref={lineRef}
              className="origin-center h-px w-10 sm:w-16 md:w-20 bg-white/40 will-change-transform"
            />

            <span
              ref={rightNameRef}
              className="will-change-transform text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-[-0.05em]"
            >
              Gitonga
            </span>
          </div>
        </div>
      </div>

      <Scroll3DObject />

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            title={label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]"
          >
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Index;