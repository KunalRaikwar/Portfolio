"use client";

import { motion } from "motion/react";
import { Award, Trophy, Cloud, Database, FileSpreadsheet, Mic } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  {
    title: "AWS Cloud Foundations",
    description: "Certified in core AWS services, cloud concepts, security, architecture, and pricing.",
    icon: <Cloud className="w-8 h-8 text-orange-400" />,
    color: "from-orange-500/20 to-red-500/0 border-orange-500/20 group-hover:border-orange-500/50"
  },
  {
    title: "SQL Fundamentals",
    description: "Demonstrated proficiency in database queries, relational design, and data manipulation.",
    icon: <Database className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/0 border-blue-500/20 group-hover:border-blue-500/50"
  },
  {
    title: "Advanced Excel",
    description: "Mastered data analysis, complex formulas, macros, and financial modeling tools.",
    icon: <FileSpreadsheet className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-green-500/0 border-emerald-500/20 group-hover:border-emerald-500/50"
  },
  {
    title: "Public Speaking",
    description: "Active participant in technical presentations and institutional public speaking events.",
    icon: <Mic className="w-8 h-8 text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/0 border-purple-500/20 group-hover:border-purple-500/50"
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative bg-zinc-950/50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div key={index} variants={staggerItem} className="h-full">
              <Card className={`glass-card h-full border bg-gradient-to-br ${achievement.color} group transition-all duration-300 hover:-translate-y-2`}>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mt-auto">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
