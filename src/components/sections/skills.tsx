"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { 
  Monitor, Server, Database, Code2, Wrench, 
  Terminal, Layers, Blocks, Box, Settings
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Monitor className="w-5 h-5" />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ]
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
    ]
  },
  {
    id: "database",
    label: "Database",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ]
  },
  {
    id: "programming",
    label: "Programming",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      { name: "C++", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 85 },
    ]
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "AWS", level: 70 },
      { name: "VS Code", level: 95 },
    ]
  }
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  return (
    <section id="skills" className="py-24 relative bg-zinc-950">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-900/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === category.id
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory} // Force re-animation when category changes
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories
            .find((c) => c.id === activeCategory)
            ?.skills.map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <div className="glass p-6 rounded-2xl group hover:border-indigo-500/50 transition-colors duration-300 relative overflow-hidden">
                  {/* Hover glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-sm text-zinc-500">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
