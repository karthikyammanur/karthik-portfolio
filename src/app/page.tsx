"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Download, Sparkles } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

const typingPhrases = [
	"computer engineering @ ut dallas • aspiring AI/ML researcher",
];

function TypingAnimation() {
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
		<span className="text-lg sm:text-2xl font-mono text-primary/90 min-h-[2.5rem] inline-block">
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
				className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center"
			>
				<h1 className="text-3xl sm:text-5xl font-bold mb-4 glitch-subtle flex items-center justify-center gap-3">
					I'm Karthik Yammanur
					<Rocket className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
				</h1>
				<TypingAnimation />
				<div className="flex gap-4 mt-8 flex-col sm:flex-row justify-center">
					<a
						href="/resume"
						className="group relative rounded-full border border-primary text-primary px-6 py-3 font-semibold shadow transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-magenta-500/50 before:absolute before:inset-0 before:rounded-full before:bg-magenta-400/20 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 text-base flex items-center gap-2"
					>
						<Download className="w-5 h-5" />
						Download Resume
					</a>
				</div>
			</motion.section>
			<section className="py-20 px-6">
				<AboutSection />
			</section>
			<section className="py-20 px-6">
				<ProjectsSection />
			</section>
		</>
	);
}
