"use client";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDatabase, FaQuoteLeft } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFastapi, SiTypescript, SiTailwindcss } from "react-icons/si";

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
				className="text-4xl font-bold mb-4 text-center"
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
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.4 }}
				className="w-full max-w-xl mb-10"
			>
				<h2 className="text-2xl font-semibold mb-4 text-center">Skills</h2>
				<div className="flex flex-wrap justify-center gap-4">
					{skills.map((skill) => (
						<div key={skill.name} className="flex flex-col items-center gap-1">
							<span className="text-3xl">{skill.icon}</span>
							<span className="text-xs text-gray-300">{skill.name}</span>
						</div>
					))}
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.6 }}
				className="mt-auto"
			>
				<div className="flex items-center gap-2 text-lg text-primary font-semibold justify-center">
					<FaQuoteLeft className="text-primary/80 text-2xl" />
					<span>"The best way to predict the future is to invent it."</span>
				</div>
			</motion.div>
		</div>
	);
}