"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const techColors: Record<string, string> = {
  Python: "bg-blue-500 text-white",
  "C++": "bg-blue-400 text-white",
  React: "bg-cyan-400 text-white",
  "Next.js": "bg-gray-800 text-white",
  Flask: "bg-green-700 text-white",
  "Gemini API": "bg-purple-500 text-white",
  LSTM: "bg-pink-500 text-white",
  "Chart.js": "bg-orange-400 text-white",
  FastAPI: "bg-green-500 text-white",
  ChromaDB: "bg-fuchsia-500 text-white",
  MongoDB: "bg-green-700 text-white",
  Tailwind: "bg-sky-400 text-white",
  VAE: "bg-yellow-400 text-black",
  VQGAN: "bg-indigo-500 text-white",
  JavaScript: "bg-yellow-400 text-black",
  TypeScript: "bg-blue-600 text-white",
  // Add more as needed
};

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imageSrc: string; // new prop for thumbnail
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  liveLink,
  imageSrc,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.03, y: -8, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20, delay: 0 }}
        className="bg-[#18181b] rounded-2xl p-0 flex flex-col gap-4 shadow-xl border border-white/10 w-full max-w-md mx-auto hover:shadow-primary/40 hover:border-primary/40 transition-all duration-150 overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative w-full h-48 bg-black flex items-center justify-center group overflow-hidden">
          <Image
            src={imageSrc}
            alt={title + " thumbnail"}
            fill
            className="object-cover object-center rounded-t-2xl transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`px-3 py-1 rounded-full text-xs font-medium ${techColors[tech] || "bg-primary/20 text-primary"}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto">
            {githubLink && (
              <motion.a
                whileHover={{ scale: 1.1, boxShadow: "0 0 8px #fff, 0 0 16px #6ee7b7" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-primary/80 hover:text-white transition-colors font-semibold text-sm"
                onClick={e => e.stopPropagation()}
              >
                <motion.span
                  whileHover={{ textShadow: "0 0 8px #6ee7b7, 0 0 16px #6ee7b7" }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <FaGithub className="w-4 h-4" />
                </motion.span>
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            )}
            {liveLink && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-semibold text-sm"
                onClick={e => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                <span className="hidden sm:inline">Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
      {/* Modal Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#18181b] rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-white/10 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={title + " thumbnail"}
                fill
                className="object-cover object-center rounded-xl"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <p className="text-gray-300 text-base mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${techColors[tech] || "bg-primary/20 text-primary"}`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              {githubLink && (
                <motion.a
                  whileHover={{ scale: 1.1, boxShadow: "0 0 8px #fff, 0 0 16px #6ee7b7" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-primary/80 hover:text-white transition-colors font-semibold text-sm"
                >
                  <motion.span
                    whileHover={{ textShadow: "0 0 8px #6ee7b7, 0 0 16px #6ee7b7" }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <FaGithub className="w-4 h-4" />
                  </motion.span>
                  <span className="hidden sm:inline">GitHub</span>
                </motion.a>
              )}
              {liveLink && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-semibold text-sm"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span className="hidden sm:inline">Live Demo</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
