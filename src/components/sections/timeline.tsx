"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Code } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const timelineEvents = [
  {
    year: "Present",
    title: "Full Stack Developer",
    subtitle: "Building Scalable Applications",
    description: "Developing modern MERN stack applications, integrating AI capabilities, and building robust backend architectures.",
    icon: <Code className="w-5 h-5 text-indigo-400" />,
  },
  {
    year: "2023 - Present",
    title: "Computer Science Engineering",
    subtitle: "Undergraduate Degree",
    description: "Pursuing B.Tech in Computer Science, focusing on algorithms, software engineering, and modern web technologies.",
    icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
  },
  {
    year: "2022",
    title: "Foundation",
    subtitle: "Early Technical Growth",
    description: "Started the journey into programming, mastering C++, Python, and core computational logic.",
    icon: <Briefcase className="w-5 h-5 text-blue-400" />,
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500" 
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center md:justify-between flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Icon Node */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full glass border border-indigo-500/30 flex items-center justify-center z-10 -translate-x-[18px] md:translate-x-0 shadow-[0_0_15px_rgba(99,102,241,0.2)] bg-zinc-950">
                    <div className="bg-indigo-500/20 p-2 rounded-full">
                      {event.icon}
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-[45%]" />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full pl-12 md:pl-0 md:w-[45%]"
                  >
                    <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-bold font-heading text-indigo-500">{event.year.split(" ")[0]}</span>
                      </div>
                      
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full mb-4 border border-indigo-500/20">
                          {event.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">{event.title}</h3>
                        <h4 className="text-zinc-400 font-medium mb-4">{event.subtitle}</h4>
                        <p className="text-zinc-500 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
