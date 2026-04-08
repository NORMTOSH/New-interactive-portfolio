// src/components/ProjectsSection.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import ProjectModal, { type Project } from "./ProjectModal";
import { projects } from "@/data/Portfolio";

gsap.registerPlugin(ScrollTrigger);

const colorClasses: Record<
  string,
  { border: string; tag: string; cat: string; bar: string; glow: string }
> = {
  primary: {
    border: "border-primary/15",
    tag: "text-primary",
    cat: "text-primary",
    bar: "bg-primary/30",
    glow: "from-primary/10",
  },
  secondary: {
    border: "border-secondary/15",
    tag: "text-secondary",
    cat: "text-secondary",
    bar: "bg-secondary/30",
    glow: "from-secondary/10",
  },
  accent: {
    border: "border-accent/15",
    tag: "text-accent",
    cat: "text-accent",
    bar: "bg-accent/30",
    glow: "from-accent/10",
  },
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 90, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      gsap.to(glowRef.current, {
        yPercent: -60,
        xPercent: -30,
        scale: 1.25,
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

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding noise-bg relative overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[200px] will-change-transform"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Portfolio
          </p>

          <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl">
            <TextReveal.Line>
              Featured <span className="text-gradient-primary">Projects</span>
            </TextReveal.Line>
          </TextReveal>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A curated selection of work presented with clearer hierarchy, stronger
            project positioning, and a more polished card experience.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Projects
            </p>
            <p className="mt-2 text-2xl font-bold">{projects.length}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Categories
            </p>
            <p className="mt-2 text-2xl font-bold">
              {new Set(projects.map((project) => project.category)).size}
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Focus
            </p>
            <p className="mt-2 text-2xl font-bold">UI / Product / Brand</p>
          </div>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const colors = colorClasses[project.color] ?? colorClasses.primary;
            const isFeatured = index === 0;

            return (
              <button
                key={project.title}
                type="button"
                onClick={() => openProject(project as Project)}
                className={[
                  "group relative overflow-hidden rounded-[28px] border bg-card/80 p-7 text-left shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-sm",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.16)]",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40",
                  "cursor-pointer",
                  colors.border,
                  isFeatured ? "md:col-span-2 xl:col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-[3px] ${colors.bar} opacity-60`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/[0.02] to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 font-mono text-xs font-semibold text-muted-foreground">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.3em] ${colors.cat}`}
                      >
                        {project.category}
                      </span>
                    </div>

                    <div className="mt-1 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      Case Study
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold tracking-tight md:text-[2rem]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-[15px]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={[
                          "rounded-full border border-border/60 bg-muted/60 px-3 py-1",
                          "font-mono text-[11px] tracking-wide text-muted-foreground",
                          "transition-colors duration-200 group-hover:bg-background",
                        ].join(" ")}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {isFeatured ? "Featured project" : "Selected work"}
                    </span>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      View details
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectsSection;