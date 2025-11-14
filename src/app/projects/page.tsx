"use client";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectListItem from "@/components/ProjectListItem";
import { FaCode, FaRocket, FaGithub, FaList, FaTh } from "react-icons/fa";
import Card from "@/components/Card";

// All projects including featured and additional ones
const allProjects = [
  // Featured Projects (from home page)
  {
    title: "AutoPM (2nd Place @ HackUTD 2025)",
    description:
      "AI-powered Product Management copilot built at HackUTD 2025 that automates end-to-end PM workflows through specialized LangGraph agents. Features 8 intelligent agents powered by Gemini 2.0 Flash for idea generation with data-backed research, user story creation with acceptance criteria, market research and competitor analysis, RICE prioritization, OKR alignment via PDF ingestion, automated stakeholder emails through Gmail API, interactive wireframe generation, and Jira ticket creation. Implementing type-safe state management with Zod validation and context-aware AI assistance that leverages project history for strategic decision-making. Bagged 2ND PLACE among 1200+ participants.",
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
    title: "EduTube (HackRice 2025)",
    description:
      "AI-powered lecture companion built at HackRice 2025 that transforms video lectures into interactive study materials. Features semantic search through video content, auto-generated study notes, quiz questions and flashcards, and timestamp navigation. Built with React, Fastify, TwelveLabs for video understanding, and Gemini for content generation, enabling students to efficiently learn from any lecture video.",
    techStack: ["React", "Vite", "TypeScript", "Fastify", "TwelveLabs", "Gemini API", "Google Cloud"],
    githubLink: "https://github.com/karthikyammanur/edutube-hackrice-2025",
    liveLink: "https://www.youtube.com/watch?v=-R1D8gmRfco",
    imageSrc: "/edutube_image.png",
  },
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
    title: "Arkos (HackAI 2025, UT Dallas)",
    description:
      "Developed an AI-powered energy advisory platform featuring an LSTM model for demand forecasting and a RAG system for document-grounded insights. Integrated Gemini API, PyMuPDF, and ChromaDB within a Flask backend, and built a responsive React frontend with Chart.js visualizations and AI-generated energy recommendations.",
    techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
    githubLink: "https://github.com/karthikyammanur/arkos",
    liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
    imageSrc: "/arkos_image.jpg",
  },
  
  // Additional Projects
  {
    title: "Pocket Secretary",
    description:
      "Pocket Secretary is an AI-powered scheduling assistant that converts casual text or image-based inputs into structured calendar events. Co-developed with a focus on accessibility and ease of use, building a responsive chatbot interface using Figma and Flutter. The assistant leverages Google's Gemini API to intelligently interpret slang, typos, and natural language. Integrated Supabase for real-time data storage and event syncing across user devices.",
    techStack: ["Flutter", "Figma", "Gemini API", "Supabase", "Dart"],
    githubLink: "https://github.com/karthikyammanur/PocketSecretary",
    liveLink: "https://youtu.be/HN1H2H2MC2E",
    imageSrc: "/psecretary_image.png",
  },
  {
    title: "Sai Meghna Dance School Website",
    description:
      "This is a custom-built full-stack website created for my mom's Kuchipudi dance school using the MERN stack. The frontend was developed in React and styled with Tailwind CSS, enhanced by animations from Framer Motion and AOS. It includes features like a testimonial carousel, dynamic routing, and a floating chat modal. On the backend, Express and MongoDB handle form submissions and data management. The site is fully mobile-responsive and branded with Indian cultural motifs to reflect the school's identity.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "Framer Motion"],
    githubLink: "https://github.com/karthikyammanur/sai-meghna-dance-school",
    imageSrc: "/dance_school_image.jpg",
  },
  {
    title: "SignLang AI (HackUTD 2024)",
    description:
      "SignLang AI is a real-time American Sign Language (ASL) translator built for HackUTD 2024. Using TensorFlow and OpenCV, it recognizes all 26 alphabet signs from live webcam input and translates them directly in the browser. The model achieves high accuracy and runs seamlessly within a custom UI, making it accessible for real-time communication and educational use.",
    techStack: ["TensorFlow", "OpenCV", "JavaScript", "Python", "HTML/CSS"],
    githubLink: "https://github.com/Traman2/SignlangAI",
    liveLink: "https://www.youtube.com/watch?v=QW0eGGjECCA&t=13s",
    imageSrc: "/signlang_image.png",
  },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");

  return (
    <div className="min-h-screen text-white">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-24 xl:py-32">
				<div className="text-center max-w-4xl mx-auto">
					<h1 className="inline-flex items-center gap-3 sm:gap-4 glass-card neon-border-subtle rounded-3xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 mb-6 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
						<FaCode className="neon-text-subtle text-xl sm:text-2xl lg:text-3xl" />
						<span className="neon-text-subtle">Project Showcase</span>
					</h1>
					
					<p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
						A collection of projects showcasing my expertise in AI, web development, 
						and full-stack solutions. From machine learning models to production applications.
					</p>          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaRocket className="text-white" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub className="text-white" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Actively Maintained</span>
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="w-full max-w-7xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="flex justify-center">
          <div className="glass-card neon-border-subtle rounded-2xl p-1 flex gap-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-red-500/20 neon-border text-white"
                  : "text-gray-400 hover:text-white hover:bg-red-500/10"
              }`}
            >
              <FaList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm lg:text-base font-medium">List</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 ${
                viewMode === "cards"
                  ? "bg-red-500/20 neon-border text-white"
                  : "text-gray-400 hover:text-white hover:bg-red-500/10"
              }`}
            >
              <FaTh className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm lg:text-base font-medium">Cards</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Display */}
      <section className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {viewMode === "list" ? (
          // List View
          <div className="flex flex-col gap-3 sm:gap-4">
            {allProjects.map((project) => (
              <ProjectListItem key={project.title} project={project} />
            ))}
          </div>
        ) : (
          // Card View
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {allProjects.map((project) => (
              <div key={project.title}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 neon-text-subtle">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Interested in collaborating on a project or discussing opportunities? 
              I&apos;m always excited to work on innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="glossy-button inline-flex items-center justify-center gap-2"
              >
                Get In Touch
                <FaRocket className="text-lg" />
              </a>
              <a
                href="https://github.com/karthikyammanur"
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-button inline-flex items-center justify-center gap-2"
              >
                View All Projects
                <FaGithub className="text-lg" />
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
