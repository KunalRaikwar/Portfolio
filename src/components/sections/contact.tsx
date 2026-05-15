"use client";

import { motion } from "motion/react";
import { Send, Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an API route or service like Formspree
    alert("Thanks for your message! This is a demo form.");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-indigo-900/10 rounded-[100%] blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Amazing</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Whether you have a project in mind, a question, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-2 space-y-6"
          >
            <motion.div variants={staggerItem}>
              <a 
                href="mailto:kunalraikwar793@gmail.com"
                className="flex items-center gap-4 p-6 rounded-2xl glass hover:border-indigo-500/30 transition-all group"
              >
                <div className="bg-indigo-500/10 p-4 rounded-xl group-hover:scale-110 transition-transform text-indigo-400 group-hover:text-indigo-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Email</p>
                  <p className="text-zinc-300 font-medium break-all">kunalraikwar793@gmail.com</p>
                </div>
              </a>
            </motion.div>

            <motion.div variants={staggerItem}>
              <a 
                href="https://www.linkedin.com/in/kunal-raikwar-2813362a9/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl glass hover:border-blue-500/30 transition-all group"
              >
                <div className="bg-blue-500/10 p-4 rounded-xl group-hover:scale-110 transition-transform text-blue-400 group-hover:text-blue-300">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">LinkedIn</p>
                  <p className="text-zinc-300 font-medium">Kunal Raikwar</p>
                </div>
              </a>
            </motion.div>

            <motion.div variants={staggerItem}>
              <a 
                href="https://github.com/KunalRaikwar"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl glass hover:border-purple-500/30 transition-all group"
              >
                <div className="bg-purple-500/10 p-4 rounded-xl group-hover:scale-110 transition-transform text-purple-400 group-hover:text-purple-300">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">GitHub</p>
                  <p className="text-zinc-300 font-medium">KunalRaikwar</p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6 relative group">
              {/* Form hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-white/5 border-white/10 focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600 h-12"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white/5 border-white/10 focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600 h-12"
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-zinc-400">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="Project Inquiry" 
                    className="bg-white/5 border-white/10 focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600 h-12"
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Hello Kunal, I'd like to talk about..." 
                    className="bg-white/5 border-white/10 focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600 min-h-[150px] resize-none"
                    required
                  />
                </div>
                <div className="col-span-2 pt-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg rounded-xl group transition-all"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
