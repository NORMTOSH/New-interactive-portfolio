import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

const Footer = () => {
  return (
    <footer id="footer" className="relative h-screen overflow-hidden border-t border-border/40 bg-card/60">
      <style>{`
        @keyframes driftGlow {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: .28; }
          50% { transform: translate3d(3%, -2%, 0) scale(1.12); opacity: .5; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: .28; }
        }

        @keyframes scanlineMove {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(220%); }
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: .18; }
          50% { opacity: .4; }
        }

        @keyframes glitchShift {
          0%, 100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); opacity: .65; }
          20% { transform: translate(-1px, 0); clip-path: inset(15% 0 65% 0); opacity: .45; }
          40% { transform: translate(1px, -1px); clip-path: inset(45% 0 35% 0); opacity: .55; }
          60% { transform: translate(-1px, 1px); clip-path: inset(70% 0 10% 0); opacity: .35; }
          80% { transform: translate(1px, 0); clip-path: inset(8% 0 72% 0); opacity: .5; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.18))]" />

      <div
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[180px]"
        style={{ animation: "driftGlow 10s ease-in-out infinite" }}
      />

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-xl"
          style={{ animation: "scanlineMove 8s linear infinite" }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center px-6 md:px-12">
          <div className="relative text-center">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl"
              style={{ animation: "subtlePulse 6s ease-in-out infinite" }}
            />

            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.5em] text-muted-foreground/70">
              Closing Window
            </p>

            <div className="relative inline-block">
              <h2 className="text-5xl font-bold tracking-[0.22em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                NORMAN
              </h2>
              <h2
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 text-5xl font-bold tracking-[0.22em] text-gray-700/40 blur-[1px] sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ animation: "glitchShift 0.1s infinite" }}
              >
                NORMAN
              </h2>
            </div>

            <div className="relative mt-3 inline-block">
              <h2 className="text-5xl font-bold tracking-[0.22em] text-gradient-primary sm:text-6xl md:text-7xl lg:text-8xl">
                GITONGA
              </h2>
              <h2
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 text-5xl font-bold tracking-[0.22em] text-gray-700/40 blur-[1px] sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ animation: "glitchShift 0.1s infinite reverse" }}
              >
                GITONGA
              </h2>
            </div>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              Full stack developer, blockchain engineer, designer & ML enthusiast —
              building at the intersection of code and creativity.
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 px-6 py-6 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} NORMAN GITONGA — All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative rounded-full border border-border/40 bg-muted/20 p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  <s.icon size={18} />
                  <ArrowUpRight
                    size={10}
                    className="absolute right-1.5 top-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primary"
                  />
                </a>
              ))}
            </div>

            <p className="font-mono text-xs text-muted-foreground/60">
              Crafted with precision & passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;