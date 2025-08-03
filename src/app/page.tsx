"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

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
			}, 40);
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
			<motion.section
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="min-h-[90vh] w-full px-4 py-16 flex items-center justify-center"
			>
				<div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Column - Main Title and CTA */}
					<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
						<h1 className="text-3xl sm:text-5xl font-bold mb-4 glitch-subtle flex items-center justify-center lg:justify-start gap-3">
							I&apos;m Karthik Yammanur
							<Rocket className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
						</h1>
						<TypingAnimation />
					</div>
					
					{/* Right Column - About Section */}
					<div className="w-full">
						<AboutSection />
					</div>
				</div>
			</motion.section>
			<section className="py-20 px-6">
				<ProjectsSection />
			</section>
		</>
	);
}
