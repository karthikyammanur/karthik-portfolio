"use client";
import ProjectsSection from "@/components/ProjectsSection";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Projects() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
        <ProjectsSection />
      </main>
    </ParallaxProvider>
  );
}
