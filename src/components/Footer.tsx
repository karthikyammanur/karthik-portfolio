"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DevpostIcon from "./DevpostIcon";
import Card from "./Card";

// ── Devpost Icon ─────────────────────────────────────────────────────────────



export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetUrl = href === "#hero" ? "/" : "/" + href;
    
    if (!isHome) {
      router.push(targetUrl);
      return;
    }
    
    window.history.pushState(null, "", targetUrl);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="w-full px-4 py-12 relative">
      <div className="absolute inset-0 grid-overlay opacity-30"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Neon divider line */}
        <div className="neon-line mb-12"></div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-4">Karthik Yammanur</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Computer Engineering at UT Dallas
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="/#hero" onClick={(e) => handleScrollTo(e, "#hero")} className="text-gray-400 hover:text-primary transition-colors text-sm">
                Home
              </a>
              <a href="/#projects" onClick={(e) => handleScrollTo(e, "#projects")} className="text-gray-400 hover:text-primary transition-colors text-sm">
                Projects
              </a>
              <a href="/#experience" onClick={(e) => handleScrollTo(e, "#experience")} className="text-gray-400 hover:text-primary transition-colors text-sm">
                Experience
              </a>
              <a href="/#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-gray-400 hover:text-primary transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4 neon-text-subtle">Connect</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="mailto:karthikyam2006@gmail.com"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 hover:bg-red-500/10"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/karthikyammanur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 hover:bg-red-500/10"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/karthik-yammanur/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 hover:bg-red-500/10"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://devpost.com/karthikyam2006"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 hover:bg-red-500/10"
              >
                <DevpostIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credit Card */}
        <div>
          <Card className="text-center py-4" hover={false}>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              Made by Karthik Yammanur | Inspired by TRON and Blade Runner
            </p>
          </Card>
          <p className="mt-3 text-center text-xs sm:text-sm text-red-200/55 font-mono tracking-wide">
            If you made it this far, try clicking on my picture at the top!
          </p>
        </div>
      </div>
    </footer>
  );
}


