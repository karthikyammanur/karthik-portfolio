"use client";
import ProjectCard from "./ProjectCard";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

const projects = [
	{
    title: "AgentFlow",
    description:
      "Full-stack AI agent deployment platform currently in development, featuring secure sandboxed execution with VM2 and child processes, real-time monitoring, and one-click deployments. Architected with Next.js, Prisma ORM, and GitHub OAuth, implementing strict timeouts, memory limits, and security scanning to safely run untrusted JavaScript and Python code. Built responsive dashboard with Gemini AI chat integration achieving 3-8s response times and modular component architecture for scalable agent management.",
    techStack: ["Next.js", "TypeScript", "Prisma", "NextAuth.js", "Gemini API", "VM2"],
    imageSrc: "/agentflow_image.png",
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
			<div className="text-center mb-16">
				<div className="inline-flex items-center gap-4 glass-card neon-border-subtle rounded-3xl px-8 py-4 mb-6">
					<FaCode className="neon-text-subtle text-2xl" />
					<h2 className="neon-text-subtle text-2xl sm:text-3xl lg:text-4xl font-bold">Top Projects</h2>
				</div>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
					Explore my latest work in AI, web development, and innovative technology solutions
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
				{projects.map((project) => (
					<div key={project.title}>
						<ProjectCard {...project} />
					</div>
				))}
			</div>

			{/* View All Projects Button */}
			<div className="text-center mt-16">
				<Link
					href="/projects"
					className="glossy-button inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-base"
				>
					View All Projects
				</Link>
			</div>
		</section>
	);
}
