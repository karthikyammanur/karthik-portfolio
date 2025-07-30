"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
	{
		title: "Arkos",
		description:
			"AI-powered energy advisory tool combining LSTM forecasting with RAG document analysis.",
		techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "#",
		imageSrc: "/vercel.svg", // Replace with real image path
	},
	{
		title: "NEWT",
		description:
			"AI tech news summarizer using Gemini RAG, vector search, and user preferences.",
		techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
		githubLink: "https://github.com/karthikyammanur/newt",
		liveLink: "https://newt-ai.vercel.app",
		imageSrc: "/next.svg", // Replace with real image path
	},
	{
		title: "AstroDash",
		description:
			"Space data dashboard for decoding and visualizing satellite telemetry using AI.",
		techStack: ["Next.js", "Python", "Tailwind", "VAE", "VQGAN"],
		githubLink: "https://github.com/karthikyammanur/astrodash",
		liveLink: "#",
		imageSrc: "/globe.svg", // Replace with real image path
	},
	// Add more projects as needed
];

export default function ProjectsSection() {
	return (
		<section className="w-full max-w-6xl mx-auto px-4 py-20">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className="text-2xl sm:text-3xl font-bold mb-10 text-white text-center"
			>
				Projects
			</motion.h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project) => (
					<ProjectCard key={project.title} {...project} />
				))}
			</div>
		</section>
	);
}
