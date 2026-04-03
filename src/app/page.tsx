"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AboutSection from "@/components/AboutSection";
import DevpostIcon from "@/components/DevpostIcon";
import TypingAnimation from "@/components/TypingAnimation";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
return (
<>
{/* Hero Section */}
<section id="hero" className="h-screen w-full px-4 overflow-hidden flex items-center">
<div className="w-full max-w-[95vw] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center pt-16 lg:pt-0 lg:-mt-16">
{/* Left Column - Name, Title, and Links */}
<div className="lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left w-full">
{/* Name with Portrait Icon */}
<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 w-full">
{/* Portrait Image - Easter Egg to /classified */}
<Link href="/classified" className="relative flex-shrink-0 group/portrait">
<div className="relative w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 overflow-hidden neon-border-subtle portrait-pulsate transition-all duration-300 group-hover/portrait:shadow-[0_0_30px_rgba(255,0,0,0.6)]">
<Image
src="/portrait_image.png"
alt="Karthik Yammanur"
fill
className="object-cover"
priority
/>
{/* Persistent scanline overlay */}
<div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,0,0,0.06)_2px,rgba(255,0,0,0.06)_3px)]" />
</div>
{/* "CLASSIFIED" label � always visible, subtle */}
<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-[10px] text-red-500/50 tracking-widest whitespace-nowrap">
CLASSIFIED
</div>
</Link>

<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold break-words">
Karthik Yammanur
</h1>
</div>
<TypingAnimation />

{/* Social Links */}
<div className="flex justify-center lg:justify-start gap-6 mt-6">
<a
href="mailto:karthikyam2006@gmail.com"
className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
>
<Mail className="w-6 h-6" />
</a>
<a
href="https://github.com/karthikyammanur"
target="_blank"
rel="noopener noreferrer"
className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
>
<Github className="w-6 h-6" />
</a>
<a
href="https://www.linkedin.com/in/karthik-yammanur/"
target="_blank"
rel="noopener noreferrer"
className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
>
<Linkedin className="w-6 h-6" />
</a>
<a
href="https://devpost.com/karthikyam2006"
target="_blank"
rel="noopener noreferrer"
className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
>
<DevpostIcon className="w-6 h-6" />
</a>
</div>
</div>

{/* Right Column - Large M�bius Strip */}
<div className="lg:w-[60%] w-full h-[50vh] sm:h-[55vh] lg:h-[80vh]">
<AboutSection />
</div>
</div>
</section>

{/* Experience Section */}
<section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
<ExperienceSection />
</section>

{/* Projects Section */}
<section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
<ProjectsSection />
</section>

{/* Contact Section */}
<section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
<ContactSection />
</section>
</>
);
}
