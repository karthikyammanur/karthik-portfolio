"use client";

import { useEffect, useState } from "react";
import { Sparkles, Github, Linkedin, Mail } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Link from "next/link";
import Image from "next/image";

	const typingPhrases = [
		"computer engineering @ ut dallas • aspiring AI/ML researcher",
	];function TypingAnimation() {
	const [displayed, setDisplayed] = useState("");
	const [index, setIndex] = useState(0);
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (index < typingPhrases[0].length) {
			timeout = setTimeout(() => {
				setDisplayed((prev) => prev + typingPhrases[0][index]);
				setIndex(index + 1);
			}, 25);
		}
		return () => clearTimeout(timeout);
	}, [index]);
	return (
		<span className="text-lg sm:text-2xl font-mono text-white min-h-[2.5rem] inline-block">
			{displayed}
			<span className="animate-pulse">|</span>
		</span>
	);
}

export default function Home() {
	return (
		<>
			<section className="min-h-[90vh] w-full px-4 py-16 flex items-center justify-center">
				<div className="w-full max-w-[95vw] flex flex-col lg:flex-row gap-8 items-center">
			{/* Left Column - Name, Title, and Links (Compact) */}
			<div className="lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left">
				{/* Name with Portrait Icon */}
				<div className="flex items-center gap-4 mb-4">
					{/* Portrait Image - Icon Size */}
					<div className="relative flex-shrink-0">
						<div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden neon-border-subtle shadow-[0_0_20px_rgba(255,0,0,0.3)]">
							<Image
								src="/portrait_image.png"
								alt="Karthik Yammanur"
								fill
								className="object-cover"
								priority
							/>
						</div>
						{/* Glow effect */}
						<div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-lg -z-10"></div>
					</div>
					
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
						I&apos;m Karthik Yammanur
					</h1>
				</div>						<TypingAnimation />
						
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
						</div>
					</div>
					
					{/* Right Column - Large Möbius Strip (Takes up most of the space) */}
					<div className="lg:w-[65%] w-full">
						<AboutSection />
					</div>
				</div>
			</section>
			<section className="py-20 px-6">
				<ProjectsSection />
			</section>
			<section className="py-20 px-6">
				<ExperienceSection />
			</section>
		</>
	);
}
