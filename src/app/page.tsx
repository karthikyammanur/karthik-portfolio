"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import HUDExperience from "@/components/HUDExperience";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import Link from "next/link";

// ── Devpost Icon ─────────────────────────────────────────────────────────────

function DevpostIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			role="img"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			{...props}
		>
			<title>Devpost</title>
			<path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zM10.77 8.44v6.853h1.408c1.692 0 2.968-.902 2.968-3.326 0-2.315-1.12-3.527-2.932-3.527z" />
		</svg>
	);
}

// ── Typing Animation ─────────────────────────────────────────────────────────

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
			}, 25);
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

// ── Projects Data ────────────────────────────────────────────────────────────

const allProjects = [
	{
		title: "Pondr (1st Place @ HackAI 2026)",
		shortDescription: "AI-powered adaptive learning platform utilizing a dynamically evolving knowledge graph to model and personalize user competency.",
		description:
			"AI-powered adaptive learning platform that models user knowledge as a live graph of 15–25 concept nodes, integrating 6 AI/ML systems (Gemini, XGBoost, YouTube API, Tavily, ElevenLabs, Google Calendar) to deliver personalized learning paths. Trained an XGBoost retention model on 1,000 synthetic learner profiles achieving 67% personalization lift over baseline (RMSE: 0.0524), predicting per-concept memory decay using 10 engineered behavioral features and personalized Ebbinghaus forgetting curves. Architected a full-stack app (React, FastAPI, MongoDB) with 35+ REST endpoints, a YouTube snippet pipeline that extracts precise video segments via transcript analysis, and 5 AI learning modes (Feynman, Socratic, adaptive quiz).",
		techStack: ["React", "FastAPI", "MongoDB", "Gemini", "XGBoost", "ElevenLabs", "Tavily", "YouTube API", "Google Calendar"],
		githubLink: "https://github.com/aarohCodes/HackAI2026",
		liveLink: "https://www.youtube.com/watch?v=tXF55DuBK8k",
		imageSrc: "/pondr.jpg",
		award: "1st Place @ HackAI 2026",
	},
	{
		title: "AutoPM (2nd Place @ HackUTD 2025)",
		shortDescription: "A multi-agent Product Management copilot built to automate workflows from idea generation to ticket creation.",
		description:
			"AI-powered Product Management copilot built at HackUTD 2025 that automates end-to-end PM workflows through specialized LangGraph agents. Features 8 intelligent agents powered by Gemini 2.0 Flash for idea generation with data-backed research, user story creation with acceptance criteria, market research and competitor analysis, RICE prioritization, OKR alignment via PDF ingestion, automated stakeholder emails through Gmail API, interactive wireframe generation, and Jira ticket creation. Implementing type-safe state management with Zod validation and context-aware AI assistance that leverages project history for strategic decision-making. Bagged 2ND PLACE among 1200+ participants.",
		techStack: ["LangGraph", "LangChain", "Gemini 2.0", "Next.js", "TypeScript", "MongoDB", "Tailwind", "Auth0", "Jira API", "Gmail API"],
		githubLink: "https://github.com/karthikyammanur/auto-pm-hackutd-2025",
		liveLink: "https://www.youtube.com/watch?v=sNpusFMyFoI",
		imageSrc: "/autopm_image.jpg",
		award: "2nd Place @ HackUTD 2025",
	},
	{
		title: "Matcha (Hacks for Hackers 2026)",
		shortDescription: "An AI-powered matchmaking platform designed to help hackathon participants quickly find their ideal teammates.",
		description:
			"AI-powered hackathon teammate matching platform that helps participants form high-impact teams in minutes. Users paste a Devpost or hackathon link, and Matcha analyzes the event and recommends the most compatible teammates using a hybrid matching system combining algorithmic pre-filtering with Google Gemini reasoning — reducing AI processing by ~95% while preserving match quality. Features in-app chat, hackathon portfolio tracking, and an AI idea generator that proposes demo-ready ideas with scope, feasibility, and skill coverage scores.",
		techStack: ["React", "Flask", "Express", "Gemini", "MongoDB", "Selenium", "BeautifulSoup", "Tailwind"],
		githubLink: "https://github.com/Siriapps/Matcha",
		liveLink: "https://www.youtube.com/watch?v=bx2dYwqAUJI",
		imageSrc: "/matcha.jpg",
	},
	{
		title: "AgentFlow",
		shortDescription: "A secure, scalable deployment platform handling containerized AI agents securely through sandboxing and real-time monitoring.",
		description:
			"Full-stack AI agent deployment platform currently in development, featuring secure sandboxed execution with VM2 and child processes, real-time monitoring, and one-click deployments. Architected with Next.js, Prisma ORM, and GitHub OAuth, implementing strict timeouts, memory limits, and security scanning to safely run untrusted JavaScript and Python code. Built responsive dashboard with Gemini AI chat integration achieving 3-8s response times and modular component architecture for scalable agent management.",
		techStack: ["Next.js", "TypeScript", "Prisma", "NextAuth.js", "Gemini API", "VM2"],
		githubLink: "https://github.com/karthikyammanur/agentflow",
		imageSrc: "/agentflow_image.png",
	},
	{
		title: "EduTube (HackRice 2025)",
		shortDescription: "Interactive study companion extracting semantic questions, timestamps, and notes directly from lecture video content.",
		description:
			"AI-powered lecture companion built at HackRice 2025 that transforms video lectures into interactive study materials. Features semantic search through video content, auto-generated study notes, quiz questions and flashcards, and timestamp navigation. Built with React, Fastify, TwelveLabs for video understanding, and Gemini for content generation, enabling students to efficiently learn from any lecture video.",
		techStack: ["React", "Vite", "TypeScript", "Fastify", "TwelveLabs", "Gemini API", "Google Cloud"],
		githubLink: "https://github.com/karthikyammanur/edutube-hackrice-2025",
		liveLink: "https://www.youtube.com/watch?v=-R1D8gmRfco",
		imageSrc: "/edutube_image.png",
	},
	{
		title: "NEWT",
		shortDescription: "A personalized tech news aggregation platform filtering feeds dynamically with an intelligent RAG generation pipeline.",
		description:
			"Created a personalized tech news summarization platform powered by a Gemini-based RAG pipeline. Engineered a FastAPI backend with ChromaDB vector search and MongoDB, enabling dynamic topic feeds and summary generation. Designed a modern React frontend with user authentication, likes, and topic filtering for personalized engagement.",
		techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
		githubLink: "https://github.com/karthikyammanur/newt",
		imageSrc: "/newt_image.png",
	},
	{
		title: "ACM Research at UTD",
		shortDescription: "Implementation of Generative AI (VAEs and VQGANs) to reliably synthesize low-availability astronomical image data.",
		description:
			"Researched and implemented VAE and VQGAN models to generate synthetic images of rare astronomical phenomena using the Multimodal Universe dataset. Leveraged TensorFlow, NumPy, and Matplotlib to achieve low reconstruction loss and high visual quality, and compared performance across generative models including DCGAN and StyleGAN to evaluate trade-offs in quality and efficiency.",
		techStack: ["Python", "Google Colab", "TensorFlow", "VAE", "VQGAN"],
		githubLink: "https://github.com/karthikyammanur/acm-celestAI-vae-vqgan",
		imageSrc: "/celestai_image.png",
	},
	{
		title: "Arkos (HackAI 2025, UT Dallas)",
		shortDescription: "AI energy advisory system merging document-grounded insights with LSTM modeling to forecast demand effectively.",
		description:
			"Developed an AI-powered energy advisory platform featuring an LSTM model for demand forecasting and a RAG system for document-grounded insights. Integrated Gemini API, PyMuPDF, and ChromaDB within a Flask backend, and built a responsive React frontend with Chart.js visualizations and AI-generated energy recommendations.",
		techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
		imageSrc: "/arkos_image.jpg",
	},
	{
		title: "Pocket Secretary",
		shortDescription: "A streamlined scheduling assistant built in Flutter that digests casual text and images into structured timeline events.",
		description:
			"Pocket Secretary is an AI-powered scheduling assistant that converts casual text or image-based inputs into structured calendar events. Co-developed with a focus on accessibility and ease of use, building a responsive chatbot interface using Figma and Flutter. The assistant leverages Google's Gemini API to intelligently interpret slang, typos, and natural language. Integrated Supabase for real-time data storage and event syncing across user devices.",
		techStack: ["Flutter", "Figma", "Gemini API", "Supabase", "Dart"],
		githubLink: "https://github.com/karthikyammanur/PocketSecretary",
		liveLink: "https://youtu.be/HN1H2H2MC2E",
		imageSrc: "/psecretary_image.jpg",
	},
	{
		title: "Sai Meghna Dance School Website",
		shortDescription: "A complete MERN-stack promotional website constructed for a local dance school featuring responsive booking and routing integration.",
		description:
			"This is a custom-built full-stack website created for my mom's Kuchipudi dance school using the MERN stack. The frontend was developed in React and styled with Tailwind CSS, enhanced by animations from Framer Motion and AOS. It includes features like a testimonial carousel, dynamic routing, and a floating chat modal. On the backend, Express and MongoDB handle form submissions and data management. The site is fully mobile-responsive and branded with Indian cultural motifs to reflect the school's identity.",
		techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "Framer Motion"],
		githubLink: "https://github.com/karthikyammanur/sai-meghna-dance-school",
		imageSrc: "/dance_school_image.jpg",
	},
	{
		title: "SignLang AI (HackUTD 2024)",
		shortDescription: "A browser-integrated computer vision tool translating real-time ASL signs straight from your webcam.",
		description:
			"SignLang AI is a real-time American Sign Language (ASL) translator built for HackUTD 2024. Using TensorFlow and OpenCV, it recognizes all 26 alphabet signs from live webcam input and translates them directly in the browser. The model achieves high accuracy and runs seamlessly within a custom UI, making it accessible for real-time communication and educational use.",
		techStack: ["TensorFlow", "OpenCV", "JavaScript", "Python", "HTML/CSS"],
		githubLink: "https://github.com/Traman2/SignlangAI",
		liveLink: "https://www.youtube.com/watch?v=QW0eGGjECCA&t=13s",
		imageSrc: "/signlang_image.png",
	},
];

// ── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const result = await response.json();
			if (result.success) {
				setSubmitStatus("success");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus("idle"), 3000);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 03</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Let&apos;s Connect</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

					{/* Left — Info Panel */}
					<div className="lg:col-span-2 flex flex-col gap-5">
						{/* Description card */}
						<div className="glass-card neon-border-subtle p-5 sm:p-6">
							<div className="font-mono text-[10px] text-red-500/40 tracking-widest mb-3">TRANSMISSION CHANNEL</div>
							<p className="text-sm text-white/50 leading-relaxed" style={{ textTransform: "none" }}>
								Open to collaborations, research opportunities, and interesting conversations. Drop a message or reach out directly.
							</p>
						</div>

						{/* Social links */}
						<div className="grid grid-cols-2 gap-3">
							{[
								{ href: "mailto:karthikyam2006@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
								{ href: "https://github.com/karthikyammanur", icon: <Github className="w-5 h-5" />, label: "GitHub" },
								{ href: "https://www.linkedin.com/in/karthik-yammanur/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
								{ href: "https://devpost.com/karthikyam2006", icon: <DevpostIcon className="w-5 h-5" />, label: "Devpost" },
							].map((link) => (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 p-3 border border-white/5 bg-white/[0.02] hover:border-red-500/30 hover:bg-red-500/[0.05] transition-all duration-300"
								>
									<span className="text-white/30 group-hover:text-red-500 transition-colors duration-300">{link.icon}</span>
									<span className="font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors duration-300" style={{ textTransform: "none" }}>{link.label}</span>
								</a>
							))}
						</div>

						{/* Status indicator */}
						<div className="flex items-center gap-2 px-1">
							<div className="relative">
								<div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
								<div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30" />
							</div>
							<span className="font-mono text-[10px] text-white/25 tracking-wider">ACCEPTING TRANSMISSIONS</span>
						</div>
					</div>

					{/* Right — Form */}
					<div className="lg:col-span-3">
						<div className="glass-card neon-border-subtle p-5 sm:p-6 relative">
							{/* HUD corners */}
							<div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-500/30" />
							<div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/30" />
							<div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/30" />
							<div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500/30" />

							<div className="font-mono text-[10px] text-red-500/40 tracking-widest mb-5">NEW TRANSMISSION</div>

							<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
								{submitStatus !== "idle" && (
									<div
										className={`p-3 font-mono text-xs text-center transition-all duration-300 ${
											submitStatus === "success"
												? "bg-green-500/10 text-green-400 border border-green-500/30"
												: "bg-red-500/10 text-red-400 border border-red-500/30"
										}`}
									>
										{submitStatus === "success"
											? "> TRANSMISSION SENT SUCCESSFULLY"
											: "> TRANSMISSION FAILED — RETRY"}
									</div>
								)}

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> IDENTIFIER
									</span>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className="neon-input no-glow-input"
										placeholder="Your name"
									/>
								</label>

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> RETURN CHANNEL
									</span>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="neon-input no-glow-input"
										placeholder="your.email@example.com"
									/>
								</label>

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> MESSAGE BODY
									</span>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={5}
										className="neon-input no-glow-input resize-none"
										placeholder="Tell me about yourself or say hello!"
									/>
								</label>

								<button
									type="submit"
									disabled={isSubmitting}
									className="glossy-button no-glow-button inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
								>
									{isSubmitting ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
											Transmitting...
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											Send Transmission
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// ── Projects Section ─────────────────────────────────────────────────────────

function ProjectsFullSection() {
	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 02</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Projects</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>

			{/* Projects Display */}
			<div className="w-full max-w-[90rem] mx-auto px-4 py-6 sm:py-8 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
					{allProjects.map((project) => (
						<div key={project.title}>
							<ProjectCard {...project} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ── Experience Section ───────────────────────────────────────────────────────

function ExperienceFullSection() {
	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 01</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Experience</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>
			<div className="pb-8 relative z-10">
				<HUDExperience />
			</div>
		</div>
	);
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section id="hero" className="h-screen w-full px-4 overflow-hidden flex items-center">
				<div className="w-full max-w-[95vw] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center pt-16 lg:pt-0 lg:-mt-16">
					{/* Left Column - Name, Title, and Links */}
					<div className="lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left w-full">
						{/* Name with Portrait Icon */}
						<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 w-full">
							{/* Portrait Image - Easter Egg to /classified */}
							<Link href="/classified" className="relative flex-shrink-0 group/portrait">
								<div className="relative w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 overflow-hidden neon-border-subtle portrait-pulsate transition-all duration-300 group-hover/portrait:shadow-[0_0_30px_rgba(255,0,0,0.6)]">
									<Image
										src="/portrait_image.png"
										alt="Karthik Yammanur"
										fill
										className="object-cover"
										priority
									/>
									{/* Persistent scanline overlay */}
									<div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,0,0,0.06)_2px,rgba(255,0,0,0.06)_3px)]" />
								</div>
								{/* "CLASSIFIED" label — always visible, subtle */}
								<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-[10px] text-red-500/50 tracking-widest whitespace-nowrap">
									CLASSIFIED
								</div>
							</Link>

							<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold break-words">
								Karthik Yammanur
							</h1>
						</div>
						<TypingAnimation />

						{/* Social Links */}
						<div className="flex justify-center lg:justify-start gap-6 mt-6">
							<a
								href="mailto:karthikyam2006@gmail.com"
								className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
							>
								<Mail className="w-6 h-6" />
							</a>
							<a
								href="https://github.com/karthikyammanur"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
							>
								<Github className="w-6 h-6" />
							</a>
							<a
								href="https://www.linkedin.com/in/karthik-yammanur/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
							>
								<Linkedin className="w-6 h-6" />
							</a>
							<a
								href="https://devpost.com/karthikyam2006"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
							>
								<DevpostIcon className="w-6 h-6" />
							</a>
						</div>
					</div>

					{/* Right Column - Large Möbius Strip */}
					<div className="lg:w-[60%] w-full h-[50vh] sm:h-[55vh] lg:h-[80vh]">
						<AboutSection />
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
				<ExperienceFullSection />
			</section>

			{/* Projects Section */}
			<section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
				<ProjectsFullSection />
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
				<ContactSection />
			</section>
		</>
	);
}
