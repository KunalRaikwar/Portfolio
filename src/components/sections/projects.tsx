"use client";

import { motion } from "motion/react";
import { ProjectCard } from "@/components/ui/project-card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "GeniusCV — AI Resume Builder",
    description: "Modern AI-powered resume builder using MERN stack with real-time preview and responsive PDF generation.",
    features: [
      "Real-time editing and dynamic templates",
      "Mobile-responsive PDF export",
      "Clean, premium UI and seamless user experience"
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    accentColor: "indigo" as const,
    github: "https://github.com/KunalRaikwar/Genius_CV",
    link: "https://genius-cv-pi.vercel.app"
  },
  {
    title: "College Event Management System",
    description: "Centralized event management platform for workshops, hackathons, and institutional activities.",
    features: [
      "Streamlined event registration process",
      "Dynamic event dashboard for organizers",
      "Comprehensive backend management"
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    accentColor: "indigo" as const,
    github: "#",
    link: "https://college-event-management-system-eight.vercel.app"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 perspect"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={staggerItem}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <a href="https://github.com/KunalRaikwar" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-lg group">
            View All Projects on GitHub
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
