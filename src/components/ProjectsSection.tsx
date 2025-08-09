"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

const projects = [
	{
		title: "NEWT",
		description:
			"Created a personalized tech news summarization platform powered by a Gemini-based RAG pipeline. Engineered a FastAPI backend with ChromaDB vector search and MongoDB, enabling dynamic topic feeds and summary generation. Designed a modern React frontend with user authentication, likes, and topic filtering for personalized engagement.",
		techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
		githubLink: "https://github.com/karthikyammanur/newt",
		imageSrc: "/newt_image.png", 
	},
	{
		title: "ACM Research at UTD",
		description:
			"Researched and implemented VAE and VQGAN models to generate synthetic images of rare astronomical phenomena using the Multimodal Universe dataset. Leveraged TensorFlow, NumPy, and Matplotlib to achieve low reconstruction loss and high visual quality, and compared performance across generative models including DCGAN and StyleGAN to evaluate trade-offs in quality and efficiency.",
		techStack: ["Python", "Google Colab", "TensorFlow", "VAE", "VQGAN"],
		githubLink: "https://github.com/karthikyammanur/acm-celestAI-vae-vqgan",
		imageSrc: "/celestai_image.png",
	},
	{
		title: "Arkos",
		description:
			"Developed an AI-powered energy advisory platform featuring an LSTM model for demand forecasting and a RAG system for document-grounded insights. Integrated Gemini API, PyMuPDF, and ChromaDB within a Flask backend, and built a responsive React frontend with Chart.js visualizations and AI-generated energy recommendations.",
		techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
		imageSrc: "/arkos_image.jpg",
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
				<div className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-full px-8 py-4 mb-6">
					<FaCode className="text-primary text-2xl" />
					<h2 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold">Portfolio Showcase</h2>
				</div>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
					Explore my latest work in AI, web development, and innovative technology solutions
				</p>
			</motion.div>

			<motion.div 
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
			>
				{projects.map((project, index) => (
					<motion.div
						key={project.title}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ 
							duration: 0.3, 
							delay: index * 0.05,
							ease: "easeOut"
						}}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</motion.div>

			{/* View All Projects Button */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className="text-center mt-16"
			>
				<Link
					href="/projects"
					className="group relative inline-flex items-center gap-2 rounded-full border border-primary text-primary px-8 py-3 font-semibold shadow transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-red-500/50 before:absolute before:inset-0 before:rounded-full before:bg-red-400/20 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 text-base"
				>
					View All Projects
				</Link>
			</motion.div>
		</section>
	);
}
