import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { projects } from "@/data/Portfolio";

gsap.registerPlugin(ScrollTrigger);

const colorClasses: Record<string, { border: string; tag: string; cat: string }> = {
  primary: { border: "border-primary/15", tag: "text-primary", cat: "text-primary" },
  secondary: { border: "border-secondary/15", tag: "text-secondary", cat: "text-secondary" },
  accent: { border: "border-accent/15", tag: "text-accent", cat: "text-accent" },
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 100, opacity: 0, scale: 0.9, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
          }
        );
      }

      gsap.to(glowRef.current, {
        yPercent: -60,
        xPercent: -30,
        scale: 1.3,
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
    <section ref={sectionRef} id="projects" className="section-padding noise-bg relative overflow-hidden">
      <div ref={glowRef} className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[200px] will-change-transform" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-accent mb-3">
            Portfolio
          </p>
          <TextReveal className="text-4xl md:text-6xl font-bold tracking-tight">
            <TextReveal.Line>Featured <span className="text-gradient-primary">Projects</span></TextReveal.Line>
          </TextReveal>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const colors = colorClasses[project.color];
            return (
              <div
                key={project.title}
                className={`group p-8 rounded-2xl bg-card border ${colors.border} card-hover cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs tracking-wider uppercase ${colors.cat}`}>
                    {project.category}
                  </span>
                  <svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
