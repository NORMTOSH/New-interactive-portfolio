// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow || "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );

    gsap.fromTo(
      linkRefs.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.05,
      }
    );
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setMobileOpen(false);
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3 shadow-[0_8px_32px_hsl(var(--primary)/0.08)] backdrop-blur-2xl md:px-6">
        <a href="#" className="shrink-0 text-lg font-bold tracking-tight">
          <span className="text-gradient-primary">dev</span>
          <span className="text-foreground">.folio</span>
        </a>

        <div className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`relative rounded-lg px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                  }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-primary"
            aria-label="Toggle theme"
            type="button"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="rounded-lg p-2 text-foreground transition-colors md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={menuRef}
        className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          } bg-background/95 backdrop-blur-xl transition-all duration-300`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
          {links.map((link, i) => {
            const active = isActive(link.href);

            return (
              <a
                key={link.label}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`font-mono text-sm uppercase tracking-wider transition-colors duration-300 ${active ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;