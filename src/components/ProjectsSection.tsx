"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
	{
		title: "NEWT",
		description:
			"AI tech news summarizer using Gemini RAG, vector search, and user preferences.",
		techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
		githubLink: "https://github.com/karthikyammanur/newt",
		imageSrc: "/newt_image.jpg", 
	},
	{
		title: "Arkos",
		description:
			"AI-powered energy advisory tool combining LSTM forecasting with RAG document analysis.",
		techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
		imageSrc: "/arkos_image.jpg",
	},
	
	{
		title: "CelestAI",
		description:
			"Generative Models for Astronomical Image Synthesis and Analysis",
		techStack: ["Python", "Google Colab", "TensorFlow", "VAE", "VQGAN"],
		githubLink: "https://github.com/karthikyammanur/acm-celestAI-vae-vqgan",
		imageSrc: "/celestai_image.png",
	},
	// Add more projects as needed
];

export default function ProjectsSection() {
	return (
		<section className="w-full max-w-7xl mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.7 }}
				className="text-center mb-16"
			>
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
					Featured Projects
				</h2>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
					Explore my latest work in AI, web development, and innovative technology solutions
				</p>
			</motion.div>

			<motion.div 
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
			>
				{projects.map((project, index) => (
					<motion.div
						key={project.title}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ 
							duration: 0.6, 
							delay: index * 0.1,
							ease: "easeOut"
						}}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</motion.div>

			{/* Additional Projects Hint */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="text-center mt-16"
			>
				<div className="inline-flex items-center gap-2 text-gray-400 text-sm">
					<div className="w-1 h-1 bg-primary rounded-full"></div>
					<span>More projects available on GitHub</span>
					<div className="w-1 h-1 bg-primary rounded-full"></div>
				</div>
			</motion.div>
		</section>
	);
}
