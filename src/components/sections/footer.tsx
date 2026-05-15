"use client";

import { Terminal, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-zinc-950/50 pt-16 pb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full mb-12 gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/30">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-white">
                KUNAL<span className="text-indigo-400">.DEV</span>
              </span>
            </a>
            <p className="text-zinc-500 text-sm">
              Building scalable, modern, and engaging web applications with cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12 md:gap-24">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-medium mb-2">Navigation</h4>
              <a href="#about" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">About</a>
              <a href="#skills" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">Skills</a>
              <a href="#projects" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">Projects</a>
              <a href="#contact" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">Contact</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-medium mb-2">Socials</h4>
              <a href="https://github.com/KunalRaikwar" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/kunal-raikwar-2813362a9/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">LinkedIn</a>
              <a href="mailto:kunalraikwar793@gmail.com" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors">Email</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-zinc-500 text-sm flex items-center gap-1.5">
            © {year} Kunal Raikwar. Built with <Heart className="w-4 h-4 text-red-500 inline fill-red-500/20" /> using Next.js
          </p>
          
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white/5 hover:bg-indigo-500/20 text-zinc-400 hover:text-indigo-400 rounded-full transition-colors border border-white/10 hover:border-indigo-500/50 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
