"use client";
import { motion } from "framer-motion";
import { Brain, Code, Cpu, Database, Sparkles } from "lucide-react";
import Card from "./Card";

const skills = [
  "Python",
  "C++",
  "React",
  "TensorFlow",
  "Tailwind",
  "FastAPI",
  "Gemini",
  "LSTM",
  "VAE",
  "VQGAN",
  "Next.js",
  "TypeScript",
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full px-4 py-16 flex justify-center bg-black"
    >
      <div className="w-full max-w-4xl">
        <Card className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-cyan-400" />
            About Me
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            I'm a Computer Engineering student at UT Dallas focused on building impactful tools with AI. I've worked on research projects involving generative models like VAEs and VQGANs, energy optimization systems using LSTM networks, and AI summarization pipelines using Gemini and FastAPI. Whether it's decoding space data or building usable dashboards, I love blending logic with creativity.
          </p>
          <h3 className="font-semibold text-white mb-4 flex items-center justify-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Skills & Tools:
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="tech-badge bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 uppercase tracking-wider"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
