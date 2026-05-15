"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  link?: string;
  github?: string;
  accentColor: "indigo" | "purple" | "blue" | "emerald";
}

const accentColors = {
  indigo: "from-indigo-500/20 to-indigo-500/0 border-indigo-500/20 group-hover:border-indigo-500/50",
  purple: "from-purple-500/20 to-purple-500/0 border-purple-500/20 group-hover:border-purple-500/50",
  blue: "from-blue-500/20 to-blue-500/0 border-blue-500/20 group-hover:border-blue-500/50",
  emerald: "from-emerald-500/20 to-emerald-500/0 border-emerald-500/20 group-hover:border-emerald-500/50",
};

const badgeColors = {
  indigo: "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/20",
  purple: "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/20",
};

export function ProjectCard({ 
  title, 
  description, 
  features, 
  techStack, 
  link, 
  github,
  accentColor 
}: ProjectCardProps) {
  // 3D Tilt Effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => link && link !== "#" && window.open(link, "_blank")}
      className={`glass-card rounded-2xl p-8 relative group transition-colors duration-500 border bg-gradient-to-br ${accentColors[accentColor]} ${link && link !== "#" ? "cursor-pointer" : ""}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" 
        style={{ transform: "translateZ(20px)" }}
      />
      
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          <div className="flex gap-3 relative z-20">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-400 hover:text-white transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-zinc-400 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="mb-6 space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
              <span className="text-zinc-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
          {techStack.map((tech, i) => (
            <Badge key={i} variant="outline" className={`${badgeColors[accentColor]}`}>
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
