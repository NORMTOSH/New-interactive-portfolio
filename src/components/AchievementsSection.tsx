// src/components/AchievementsSection.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Trophy, TrendingUp, Star } from "lucide-react";
import TextReveal from "./TextReveal";
import { achievements } from "@/data/Achievement";

gsap.registerPlugin(ScrollTrigger);

const colorMap: Record<
  string,
  { border: string; text: string; bg: string; glow: string; dot: string }
> = {
  primary: {
    border: "border-primary/25",
    text: "text-primary",
    bg: "bg-primary/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(175_85%_55%/0.16)]",
    dot: "bg-primary",
  },
  secondary: {
    border: "border-secondary/25",
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(35_95%_60%/0.16)]",
    dot: "bg-secondary",
  },
  accent: {
    border: "border-accent/25",
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "group-hover:shadow-[0_0_50px_hsl(280_70%_65%/0.16)]",
    dot: "bg-accent",
  },
};

const stats = [
  { icon: Trophy, label: "Milestones", value: "Featured wins" },
  { icon: TrendingUp, label: "Growth", value: "Consistent progress" },
  { icon: Star, label: "Impact", value: "Measured outcomes" },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timers: number[] = [];

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;

      const updateCardStates = () => {
        const viewportRect = viewport.getBoundingClientRect();
        const viewportCenterX = viewportRect.left + viewportRect.width / 2;
        const maxDistance = viewportRect.width * 0.5;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(viewportCenterX - cardCenterX);

          const progress = gsap.utils.clamp(0, 1, 1 - distance / maxDistance);

          gsap.to(card, {
            opacity: gsap.utils.interpolate(0.25, 1, progress),
            scale: gsap.utils.interpolate(0.92, 1.06, progress),
            y: gsap.utils.interpolate(18, 0, progress),
            rotateY: gsap.utils.interpolate(12, 0, progress),
            filter: `blur(${gsap.utils.interpolate(0.6, 0, progress)}px)`,
            boxShadow:
              progress > 0.82
                ? "0 30px 90px rgba(0,0,0,0.28)"
                : "0 18px 50px rgba(0,0,0,0.12)",
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const getCenterX = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return rect.left + rect.width / 2;
      };

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenterX = viewportRect.left + viewportRect.width / 2;

      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      const initialX = viewportCenterX - getCenterX(firstCard);
      const finalX = viewportCenterX - getCenterX(lastCard);

      gsap.set(track, {
        x: initialX,
        willChange: "transform",
      });

      gsap.set(cards, {
        opacity: 0.35,
        y: 24,
        scale: 0.92,
        rotateY: 10,
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      });

      updateCardStates();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(finalX - initialX) + window.innerHeight * 0.85}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateCardStates,
          onRefresh: updateCardStates,
        },
      });

      tl.to(track, {
        x: finalX,
        ease: "none",
        duration: 1,
      });

      timers.push(
        window.setTimeout(() => {
          ScrollTrigger.refresh();
          updateCardStates();
        }, 160)
      );

      return () => {
        timers.forEach((t) => window.clearTimeout(t));
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-padding noise-bg relative min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[180px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-[520px] w-[520px] rounded-full bg-secondary/5 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl md:mb-14 md:p-8"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="M32 30.774s-1.712-10.722-1.712-11.469s.768-1.354 1.712-1.354s1.712.606 1.712 1.354S32 30.774 32 30.774m0 2.503s1.712 10.721 1.712 11.469S32.944 46.1 32 46.1s-1.712-.605-1.712-1.354S32 33.277 32 33.277m-1.252-1.252s-10.721 1.712-11.468 1.712c-.748 0-1.354-.767-1.354-1.712c0-.944.606-1.711 1.354-1.711c.747 0 11.468 1.711 11.468 1.711m2.504 0s10.721-1.711 11.469-1.711s1.354.767 1.354 1.711s-.606 1.712-1.354 1.712s-11.469-1.712-11.469-1.712m-2.138-.884s-8.791-6.37-9.318-6.899c-.529-.528-.416-1.499.253-2.167c.668-.668 1.638-.781 2.167-.253c.527.528 6.898 9.319 6.898 9.319m1.772 1.77s8.791 6.37 9.318 6.899c.529.529.416 1.499-.253 2.168c-.668.668-1.638.781-2.167.252c-.527-.529-6.898-9.319-6.898-9.319m-1.772 0s-6.371 8.79-6.898 9.319c-.529.529-1.499.416-2.167-.252c-.669-.669-.782-1.639-.253-2.168c.527-.529 9.318-6.899 9.318-6.899m1.772-1.77s6.371-8.791 6.898-9.319c.529-.528 1.499-.415 2.167.253c.669.668.782 1.639.253 2.167c-.527.529-9.318 6.899-9.318 6.899m-1.73-1.203s-8.815-17.252-9.319-18.5s-.203-2.546.673-2.9s1.995.371 2.499 1.619c.504 1.246 6.147 19.781 6.147 19.781m1.688 4.177s8.815 17.251 9.319 18.5c.504 1.247.203 2.545-.673 2.898c-.877.355-1.995-.369-2.499-1.617s-6.147-19.781-6.147-19.781m-2.933-1.245s-17.252 8.815-18.5 9.319s-2.546.203-2.9-.674c-.354-.875.371-1.995 1.619-2.499s19.781-6.146 19.781-6.146m4.178-1.688s17.252-8.815 18.5-9.319s2.546-.202 2.9.674s-.371 1.995-1.619 2.499c-1.247.503-19.781 6.146-19.781 6.146m-4.163-.036s-18.433-5.965-19.671-6.491s-1.943-1.656-1.574-2.527c.369-.869 1.674-1.148 2.912-.622c1.238.524 18.333 9.64 18.333 9.64m4.148 1.76s18.433 5.965 19.671 6.49s1.943 1.658 1.574 2.527c-.369.871-1.674 1.15-2.912.623c-1.238-.525-18.333-9.64-18.333-9.64M31.12 34.1s-5.965 18.433-6.491 19.672c-.526 1.238-1.657 1.943-2.527 1.574c-.87-.37-1.148-1.674-.624-2.912c.527-1.239 9.642-18.334 9.642-18.334m1.76-4.148s5.965-18.433 6.491-19.671c.526-1.239 1.657-1.943 2.527-1.574s1.149 1.672.624 2.911c-.527 1.239-9.642 18.334-9.642 18.334m-.874 17.116s1.714 12.484 1.714 13.354S32.954 62 32.009 62s-1.711-.705-1.711-1.576s1.708-13.356 1.708-13.356m-.011-31.113S30.28 4.287 30.28 3.474S31.046 2 31.991 2s1.711.659 1.711 1.473s-1.707 12.482-1.707 12.482M42.659 42.65s10.04 7.616 10.654 8.231c.617.616.574 1.656-.094 2.325c-.668.668-1.709.711-2.324.096c-.616-.614-8.236-10.652-8.236-10.652M20.651 20.658s-9.463-7.038-10.039-7.613c-.575-.576-.5-1.584.168-2.252c.668-.669 1.677-.744 2.252-.168c.576.574 7.619 10.033 7.619 10.033m22.008.691s7.62-10.036 8.236-10.651c.615-.616 1.656-.573 2.324.096s.711 1.709.094 2.324c-.614.614-10.654 8.231-10.654 8.231M20.651 43.341s-7.043 9.46-7.619 10.034c-.575.576-1.584.5-2.252-.168c-.668-.669-.743-1.677-.168-2.252c.576-.575 10.039-7.614 10.039-7.614m26.417-11.347s12.484-1.714 13.355-1.714c.871-.001 1.577.766 1.577 1.71c.001.945-.704 1.712-1.575 1.712c-.871.001-13.357-1.708-13.357-1.708m-31.112.012S4.286 33.719 3.474 33.72C2.659 33.72 2 32.953 2 32.009s.659-1.712 1.474-1.712c.812 0 12.482 1.709 12.482 1.709" /><circle cx="20.728" cy="5.096" r="1.84" fill="currentColor" /><circle cx="43.544" cy="5.096" r="1.84" fill="currentColor" /><circle cx="20.209" cy="59.025" r="1.841" fill="currentColor" /><circle cx="43.025" cy="59.025" r="1.841" fill="currentColor" /><circle cx="4.912" cy="43.209" r="1.84" fill="currentColor" /><circle cx="4.912" cy="20.393" r="1.84" fill="currentColor" /><circle cx="58.841" cy="43.728" r="1.841" fill="currentColor" /><circle cx="58.841" cy="20.912" r="1.84" fill="currentColor" /></svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
              Achievements
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <TextReveal className="text-4xl font-bold tracking-tight md:text-6xl">
                <TextReveal.Line>
                  Key <span className="text-gradient-warm">Achievements</span>
                </TextReveal.Line>
              </TextReveal>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                A curated look at the outcomes, milestones, and progress markers that show the direction of the work.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.24em] text-white/45">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/85">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mx-auto w-full max-w-7xl overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 pb-8 md:gap-6 md:px-12 lg:px-24"
          style={{ perspective: "1200px" }}
        >
          {achievements.map((item, i) => {
            const colors = colorMap[item.color] ?? colorMap.primary;

            return (
              <article
                key={`${item.year}-${i}`}
                className={`group relative flex-shrink-0 w-[clamp(290px,24vw,430px)] overflow-hidden rounded-[2rem] border ${colors.border} bg-card/90 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] ${colors.glow}`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.03]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.28em] text-muted-foreground">
                      {item.year}
                    </span>

                    <div className={`rounded-2xl border border-white/10 px-4 py-3 ${colors.bg}`}>
                      <span className={`block text-2xl font-bold ${colors.text}`}>
                        {item.metric}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                      Milestone
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold tracking-tight md:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
      </div>
    </section>
  );
};

export default AchievementsSection;