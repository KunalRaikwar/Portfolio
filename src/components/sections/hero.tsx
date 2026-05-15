"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, Download, Terminal, Code2, Database, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Problem Solver"
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && displayText === currentRole) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 500; // Pause before new word
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1))
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-medium text-indigo-300">Available for new opportunities</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-4"
          >
            Hi, I'm <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600">
              Kunal Raikwar
            </span>
          </motion.h1>

          {/* Typing Role */}
          <motion.div 
            variants={staggerItem}
            className="h-12 md:h-16 mb-6 flex items-center justify-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-zinc-300 flex items-center">
              <Terminal className="w-6 h-6 md:w-8 md:h-8 mr-3 text-indigo-400" />
              {displayText}
              <span className="w-[3px] h-[1em] bg-indigo-500 ml-1 animate-pulse" />
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p 
            variants={staggerItem}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
          >
            I build scalable, responsive, and user-first digital experiences with clean architecture and modern UI systems.
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#projects" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 h-14 text-lg font-medium group transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              View Projects
            </a>
            <a href="/resume.pdf" download className="inline-flex items-center justify-center bg-transparent border border-white/20 hover:bg-white/5 hover:text-white text-zinc-300 rounded-full px-8 py-6 h-14 text-lg font-medium group transition-all">
              <Download className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Icons (Decorative) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 opacity-20"
        >
          <Code2 size={64} className="text-indigo-400" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-1/6 opacity-20"
        >
          <Database size={48} className="text-purple-400" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 opacity-20"
        >
          <Layout size={56} className="text-blue-400" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors">
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
