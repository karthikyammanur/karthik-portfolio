"use client";
import { motion } from "framer-motion";
import { Brain, Code, Cpu, Database, Sparkles } from "lucide-react";
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDatabase } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFastapi, SiTypescript, SiTailwindcss } from "react-icons/si";
import Card from "./Card";

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
  { name: "Database", icon: <FaDatabase className="text-purple-400" /> },
];

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-cyan-400" />
          About Me
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
          I&apos;m a Computer Engineering student at UT Dallas focused on building impactful tools with AI. I&apos;ve worked on research projects involving generative models like VAEs and VQGANs, energy optimization systems using LSTM networks, and AI summarization pipelines using Gemini and FastAPI. Whether it&apos;s decoding space data or building usable dashboards, I love blending logic with creativity.
        </p>
        <h3 className="font-semibold text-white mb-6 flex items-center justify-center gap-2">
          <Code className="w-5 h-5 text-cyan-400" />
          Skills & Technologies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="text-3xl">{skill.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
