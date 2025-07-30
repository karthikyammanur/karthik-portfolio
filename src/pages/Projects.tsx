"use client";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
	{
		title: "Arkos",
		description:
			"AI-powered energy advisory tool combining LSTM forecasting with RAG document analysis.",
		techStack: [
			"React",
			"Flask",
			"Gemini API",
			"LSTM",
			"Chart.js",
		],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "#",
	},
	{
		title: "NEWT",
		description:
			"AI tech news summarizer using Gemini RAG, vector search, and user preferences.",
		techStack: [
			"React",
			"FastAPI",
			"Gemini API",
			"ChromaDB",
			"MongoDB",
		],
		githubLink: "https://github.com/karthikyammanur/newt",
		liveLink: "https://newt-ai.vercel.app",
	},
	{
		title: "AstroDash",
		description:
			"Space data dashboard for decoding and visualizing satellite telemetry using AI.",
		techStack: [
			"Next.js",
			"Python",
			"Tailwind",
			"VAE",
			"VQGAN",
		],
		githubLink: "https://github.com/karthikyammanur/astrodash",
		liveLink: "#",
	},
	// Add more projects as needed
];

export default function Projects() {
	return (
		<div className="min-h-screen bg-black text-white px-4 py-20">
			<h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
				Projects
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{projects.map((project, i) => (
					<motion.div
						key={project.title}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{
							duration: 0.6,
							delay: i * 0.1,
							ease: "easeOut",
						}}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</div>
		</div>
	);
}