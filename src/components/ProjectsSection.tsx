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
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="m28.547 23.8l-4.367-.863c-.467-.092-.848.215-.848.682v3.09c0 .467.381.924.848 1.016l4.367.861c.467.092.85-.215.85-.682v-3.09c-.001-.467-.383-.922-.85-1.014" /><path fill="currentColor" d="m61.77 8.201l-.001-.004l-.001-.002l-.002-.004l-.006-.008c-.276-.51-.735-.863-1.264-.969L34.468 2.017a.9.9 0 0 0-.459.029l-20.685 6.87l-.023.008l-.098.033c-.013.003-.021.012-.033.016a1.53 1.53 0 0 0-.988 1.456v25.304l-4.271-1.452l-.638 4.845l-3.418-.683C2.835 38.246 2 38.991 2 39.975v16.059c0 .863.66 1.67 1.504 1.838l20.514 4.097q.167.03.324.031c.859 0 1.532-.687 1.532-1.563v-.065l4.881-2.223c3.615.723 6.948 1.392 8.958 1.806c.835.171 1.346.2 2.546-.239c4.358-1.598 16.996-6.203 16.996-6.203c1.828-.699 2.747-1.884 2.73-3.512L62 9.052c0-.286-.076-.564-.23-.851M9.422 36.737l11.656 3.964l-5.418.101l-6.6-1.318zM17.46 33.3l-1.831 3.606l-.03-.01l-.189-3.819zm-.703-3.418v-15.72l20.238 4.066v15.719zm2.248 4.402l7.894 6.31l-.405.007l-9.12-3.102zm5.052 25.815L3.818 56.033v-15.72l20.238 4.065zm3.214-5.929l-1.396.125v-9.916c0-.874-.646-1.664-1.505-1.838l-.273-.055l2.939-.055l3.031 10.465zm1.58-12.018l3 2.399l-1.878 1.479zm3.136 8.703l-.66-.148l-.805-2.777l1.592-1.254zm.254-8.336l-11.022-8.81l11.254 1.223zm7.511 15.567l-6.15-1.234l3.112-1.418l.418.084c.426.084.772-.196.772-.626V38.831c0-.43-.347-.849-.772-.933l-2.912-.582l.062-2.034l2.676.535q.166.032.323.032c.859 0 1.532-.686 1.532-1.562V18.229c0-.874-.646-1.665-1.505-1.84l-20.513-4.097c-1.021-.198-1.856.548-1.856 1.531v16.059c0 .521.232 1.008.599 1.356L14 31.071V10.866l25.753 5.07zm1.547-43.888L17.268 9.543L34.35 3.871l23.683 4.77zM60.167 50.01c.006.585-.174 1.252-1.541 1.776l-16.356 5.97V15.813l17.912-5.95z" /><path fill="currentColor" d="m9.947 56.135l4.367.863c.467.092.85-.215.85-.682v-3.09c0-.467-.383-.924-.85-1.016l-4.367-.86c-.467-.092-.85.213-.85.68v3.092c.001.464.383.921.85 1.013" /></svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
              Portfolio
            </span>
          </div>

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