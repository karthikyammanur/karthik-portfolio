"use client";
import { motion } from "framer-motion";

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
      className="w-full px-4 py-16 flex justify-center bg-white dark:bg-black"
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">About Me</h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
          I'm a Computer Engineering student at UT Dallas focused on building impactful tools with AI. I've worked on research projects involving generative models like VAEs and VQGANs, energy optimization systems using LSTM networks, and AI summarization pipelines using Gemini and FastAPI. Whether it's decoding space data or building usable dashboards, I love blending logic with creativity.
        </p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Skills & Tools:</h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
