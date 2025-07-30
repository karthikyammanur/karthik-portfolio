"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

const typingPhrases = [
	"build AI tools, research space data, and code the future.",
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
				<h1 className="text-3xl sm:text-5xl font-bold mb-4">
					Hey, I’m Karthik.
				</h1>
				<TypingAnimation />
				<div className="flex gap-4 mt-8 flex-col sm:flex-row justify-center">
					<a
						href="#projects"
						className="rounded-full bg-primary text-white px-6 py-3 font-semibold shadow hover:bg-primary/90 transition-colors text-base"
					>
						View Projects
					</a>
					<a
						href="/resume"
						className="rounded-full border border-primary text-primary px-6 py-3 font-semibold shadow hover:bg-primary hover:text-white transition-colors text-base"
					>
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
