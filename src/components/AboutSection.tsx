"use client";
import { motion } from "framer-motion";
import { Brain, Code, Cpu, Database, Sparkles, Github as GitHubIcon, Linkedin, Mail } from "lucide-react";
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDatabase } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFastapi, SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs } from "react-icons/si";
import Card from "./Card";

const skills = [
  { name: "Python", icon: <FaPython className="text-yellow-400" /> },
  { name: "C++", icon: <SiCplusplus className="text-blue-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
  { name: "FastAPI", icon: <SiFastapi className="text-green-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "GitHub", icon: <FaGithub className="text-gray-300" /> },
  { name: "Database", icon: <FaDatabase className="text-purple-400" /> },
];

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-white" />
          About Me
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
          I&apos;m a Computer Engineering student at UT Dallas focused on building impactful tools with AI. I&apos;ve worked on research projects involving generative models like VAEs and VQGANs, energy optimization systems using LSTM networks, and AI summarization pipelines using Gemini and FastAPI. Whether it&apos;s decoding space data or building usable dashboards, I love blending logic with creativity.
        </p>
        
        {/* Social Links - Hidden on Home Page */}
        <div className="hidden lg:hidden mb-6 justify-center gap-6">
          <motion.a
            href="mailto:karthikyam2006@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/karthikyammanur"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <GitHubIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/karthik-yammanur/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
        </div>
        
        <h3 className="font-semibold text-white mb-6 flex items-center justify-center gap-2">
          <Code className="w-5 h-5 text-white" />
          Skills & Technologies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.15 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group"
            >
              <motion.span 
                className="text-2xl sm:text-3xl transition-transform duration-200 group-hover:scale-110"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 + 0.1 }}
              >
                {skill.icon}
              </motion.span>
              <span className="text-xs sm:text-sm text-gray-300 font-medium text-center leading-tight">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
