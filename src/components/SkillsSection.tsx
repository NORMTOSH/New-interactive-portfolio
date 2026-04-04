import { useEffect, useRef } from "react";
import gsap from "gsap";
import TechCubes from "./TechCubes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { skills } from "@/data/Expertise";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 100, opacity: 0, scale: 0.9, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "power4.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
          }
        );
      }

      // Parallax on background glow
      gsap.to(glowRef.current, {
        yPercent: -40,
        xPercent: 15,
        scale: 1.2,
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

  return (
    <section ref={sectionRef} id="skills" className="section-padding noise-bg relative">
      <div ref={glowRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[200px] will-change-transform" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Skill stack
          </p>
          <TextReveal className="text-4xl md:text-6xl font-bold tracking-tight">
            <TextReveal.Line>Core <span className="text-gradient-accent">Skills</span></TextReveal.Line>
          </TextReveal>
        </div>

        {/* Interactive 3D Tech Cubes */}
        <div className="w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden border border-border/20 bg-card/10 backdrop-blur-sm">
          <TechCubes />
        </div>

        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Expertise
          </p>
          <TextReveal className="text-4xl md:text-6xl font-bold tracking-tight">
            <TextReveal.Line>Core <span className="text-gradient-accent">Skills</span></TextReveal.Line>
          </TextReveal>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className={`group p-8 rounded-2xl bg-gradient-to-br ${skill.gradient} border ${skill.borderColor} card-hover cursor-default`}
            >
              <div className={`w-14 h-14 rounded-xl ${skill.iconBg} flex items-center justify-center text-2xl mb-6`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-muted text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
