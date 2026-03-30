import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <a href="#" className="font-bold text-xl tracking-tight">
              <span className="text-gradient-primary">dev</span>
              <span className="text-foreground">.folio</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Full stack developer, blockchain engineer, designer & ML enthusiast — building at the intersection of code and creativity.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group relative p-3 rounded-xl border border-border/40 bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <s.icon size={18} />
                <ArrowUpRight
                  size={10}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} dev.folio — All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
