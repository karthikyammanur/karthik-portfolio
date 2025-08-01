"use client";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDatabase, FaQuoteLeft } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFastapi, SiTypescript, SiTailwindcss } from "react-icons/si";
import Card, { FeatureCard } from "@/components/Card";

const skills = [
	{ name: "Python", icon: <FaPython className="text-yellow-400" /> },
	{ name: "C++", icon: <SiCplusplus className="text-blue-400" /> },
	{ name: "React", icon: <FaReact className="text-cyan-400" /> },
	{ name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
	{ name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
	{ name: "FastAPI", icon: <SiFastapi className="text-green-400" /> },
	{ name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
	{ name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
	{ name: "GitHub", icon: <FaGithub className="text-white" /> },
	{ name: "DB", icon: <FaDatabase className="text-purple-400" /> },
];

export default function About() {
	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className="text-4xl font-bold mb-4 text-center glitch-hover"
			>
				Karthik Yammanur
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.2 }}
				className="max-w-2xl text-lg text-gray-300 mb-8 text-center"
			>
				I'm a Computer Engineering student at UT Dallas focused on building impactful tools with AI. I've worked on
				research projects involving generative models like VAEs and VQGANs, energy optimization systems using LSTM
				networks, and AI summarization pipelines using Gemini and FastAPI. Whether it's decoding space data or
				building usable dashboards, I love blending logic with creativity.
			</motion.p>
			<Card className="w-full max-w-4xl mb-10">
				<h2 className="text-2xl font-semibold mb-6 text-center">Skills & Technologies</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
					{skills.map((skill, index) => (
						<motion.div 
							key={skill.name} 
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.1 * index }}
							className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
						>
							<span className="text-3xl">{skill.icon}</span>
							<span className="text-sm text-gray-300 font-medium">{skill.name}</span>
						</motion.div>
					))}
				</div>
			</Card>
			<Card className="mt-8" animate={false}>
				<div className="flex items-center gap-4 text-lg text-primary font-semibold justify-center">
					<FaQuoteLeft className="text-primary/80 text-2xl flex-shrink-0" />
					<span className="text-center">"The best way to predict the future is to invent it."</span>
				</div>
			</Card>
		</div>
	);
}