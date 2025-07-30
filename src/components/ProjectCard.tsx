"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  liveLink,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-[#18181b] rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-white/10 w-full max-w-md mx-auto hover:shadow-primary/40 hover:border-primary/40 transition-all duration-300"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm mb-3">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-primary/80 hover:text-white transition-colors font-semibold text-sm"
        >
          <FaGithub className="w-4 h-4" /> GitHub
        </a>
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-semibold text-sm"
        >
          <FaExternalLinkAlt className="w-4 h-4" /> Live Demo
        </a>
      </div>
    </motion.div>
  );
}
