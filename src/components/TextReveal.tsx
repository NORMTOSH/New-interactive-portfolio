import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
}

const TextReveal = ({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.08,
}: TextRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = el.querySelectorAll(".text-reveal-line > span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    // @ts-ignore
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

/** Wrap each line in reveal markup */
const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="text-reveal-line">
    <span>{children}</span>
  </span>
);

TextReveal.Line = Line;

export default TextReveal;
