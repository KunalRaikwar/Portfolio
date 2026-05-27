import { Navbar } from "@/components/navbar";

import { CustomCursor } from "@/components/cursor";
import { Particles } from "@/components/particles";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>

      <CustomCursor />
      <Particles />
      <Navbar />
      
      <main className="flex flex-col relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Timeline />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
