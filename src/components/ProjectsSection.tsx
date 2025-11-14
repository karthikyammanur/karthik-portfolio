"use client";
import ProjectCard from "./ProjectCard";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

const projects = [
	{
    title: "AutoPM (2nd Place @ HackUTD 2025)",
    description:
      "AI-powered Product Management copilot built at HackUTD 2025 that automates end-to-end PM workflows through specialized LangGraph agents. Features 8 intelligent agents powered by Gemini 2.0 Flash for idea generation with data-backed research, user story creation with acceptance criteria, market research and competitor analysis, RICE prioritization, OKR alignment via PDF ingestion, automated stakeholder emails through Gmail API, interactive wireframe generation, and Jira ticket creation. Implementing type-safe state management with Zod validation and context-aware AI assistance that leverages project history for strategic decision-making. Bagged 2ND PLACE among 1200+ participants",
    techStack: ["LangGraph", "LangChain", "Gemini 2.0", "Next.js", "TypeScript", "MongoDB", "Tailwind", "Auth0", "Jira API", "Gmail API"],
    githubLink: "https://github.com/karthikyammanur/auto-pm-hackutd-2025",
    liveLink: "https://www.youtube.com/watch?v=sNpusFMyFoI",
    imageSrc: "/autopm_image.png",
  	},
	{
    title: "AgentFlow",
    description:
      "Full-stack AI agent deployment platform currently in development, featuring secure sandboxed execution with VM2 and child processes, real-time monitoring, and one-click deployments. Architected with Next.js, Prisma ORM, and GitHub OAuth, implementing strict timeouts, memory limits, and security scanning to safely run untrusted JavaScript and Python code. Built responsive dashboard with Gemini AI chat integration achieving 3-8s response times and modular component architecture for scalable agent management.",
    techStack: ["Next.js", "TypeScript", "Prisma", "NextAuth.js", "Gemini API", "VM2"],
    githubLink: "https://github.com/karthikyammanur/agentflow",
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
