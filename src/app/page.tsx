"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Link from "next/link";

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
				<div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
					{/* Left Column - Main Content */}
					<div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
						<div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 w-full">
							{/* Title and Typing Animation */}
							<div className="flex-1 flex flex-col items-center lg:items-start">
								<h1 className="text-3xl sm:text-5xl font-bold mb-4 glitch-subtle flex items-center justify-center lg:justify-start gap-3">
									I&apos;m Karthik Yammanur
									<Rocket className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
								</h1>
								
								{/* Portrait Image - Mobile */}
								<div className="relative w-40 h-40 mb-4 lg:hidden">
									<motion.div
										whileHover={{ scale: 1.05 }}
										className="w-full h-full rounded-full overflow-hidden border-2 border-primary relative group"
									>
										<Image 
											src="/portrait_image.jpg" 
											alt="Karthik Yammanur" 
											fill
											style={{ objectFit: 'cover' }}
											className="rounded-full"
										/>
										<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</motion.div>
									<div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-full blur-sm -z-10"></div>
								</div>
								
								<TypingAnimation />
								
								{/* Social Links */}
								<div className="flex justify-center lg:justify-start gap-6 mt-4">
									<motion.a
										href="mailto:karthikyam2006@gmail.com"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="text-gray-400 hover:text-primary transition-colors"
									>
										<Mail className="w-6 h-6" />
									</motion.a>
									<motion.a
										href="https://github.com/karthikyammanur"
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="text-gray-400 hover:text-primary transition-colors"
									>
										<Github className="w-6 h-6" />
									</motion.a>
									<motion.a
										href="https://www.linkedin.com/in/karthik-yammanur/"
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="text-gray-400 hover:text-primary transition-colors"
									>
										<Linkedin className="w-6 h-6" />
									</motion.a>
								</div>
							</div>
							
							{/* Portrait Image - Desktop (Side by side with title) */}
							<div className="relative w-48 h-48 flex-shrink-0 hidden lg:block">
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="w-full h-full rounded-full overflow-hidden border-2 border-primary relative group"
								>
									<Image 
										src="/portrait_image.jpg" 
										alt="Karthik Yammanur" 
										fill
										style={{ objectFit: 'cover' }}
										className="rounded-full"
									/>
									<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</motion.div>
								<div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-full blur-sm -z-10"></div>
							</div>
						</div>
					</div>
					
					{/* Right Column - About Section */}
					<div className="flex-1 w-full">
						<AboutSection />
					</div>
				</div>
			</motion.section>
			<section className="py-20 px-6">
				<ProjectsSection />
			</section>
			<section className="py-20 px-6">
				<ExperienceSection />
			</section>
		</>
	);
}
