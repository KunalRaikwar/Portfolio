"use client";

import { motion } from "motion/react";
import { User, Code, GraduationCap, Briefcase, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function About() {
  const stats = [
    { icon: <Briefcase className="w-6 h-6 text-indigo-400" />, label: "Projects Built", value: "10+" },
    { icon: <Code className="w-6 h-6 text-purple-400" />, label: "Technologies", value: "15+" },
    { icon: <Award className="w-6 h-6 text-blue-400" />, label: "Certifications", value: "4+" },
    { icon: <User className="w-6 h-6 text-emerald-400" />, label: "Hackathons", value: "2+" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p variants={staggerItem} className="text-zinc-400 text-lg leading-relaxed">
              I am a passionate <span className="text-white font-medium">Full Stack Developer</span> and Computer Science Engineering student from Indore, India, specializing in modern MERN Stack applications.
            </motion.p>
            
            <motion.p variants={staggerItem} className="text-zinc-400 text-lg leading-relaxed">
              My focus lies in building scalable, responsive, and user-first digital experiences. I believe in clean architecture and leveraging modern UI systems to solve complex problems efficiently.
            </motion.p>

            <motion.div variants={staggerItem} className="pt-4 flex items-center gap-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Computer Science Engineering</h3>
                <p className="text-zinc-500">Student at Indore, Madhya Pradesh</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="glass-card border-none bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
