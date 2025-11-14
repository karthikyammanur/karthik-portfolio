"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imageSrc: string;
}

interface ProjectListItemProps {
  project: Project;
}

export default function ProjectListItem({ project }: ProjectListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full glass-card neon-border-subtle rounded-lg overflow-hidden transition-all duration-300 hover:neon-border">
      {/* Collapsed View - List Item */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 lg:gap-6 text-left hover:bg-red-500/5 transition-all duration-300"
      >
        {/* Thumbnail - Left */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden neon-border-subtle">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Project Title - Center */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold neon-text-subtle mb-1 truncate">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500/10 border border-red-500/30 rounded text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-400">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* GitHub Link - Right */}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:flex p-2 lg:p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 group"
          >
            <FaGithub className="w-5 h-5 lg:w-6 lg:h-6 text-red-500 group-hover:scale-110 transition-transform" />
          </a>
        )}

        {/* Expand Icon */}
        <div className="p-1 sm:p-2">
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          ) : (
            <FaChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-red-500/20"
          >
            <div className="p-3 sm:p-4 lg:p-6 flex flex-col md:flex-row gap-4 sm:gap-6">
              {/* Larger Thumbnail */}
              <div className="relative w-full md:w-64 lg:w-80 h-40 sm:h-48 rounded-lg overflow-hidden neon-border-subtle flex-shrink-0">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>

              {/* Project Details */}
              <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500/10 border border-red-500/30 rounded-full text-gray-300 hover:bg-red-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mt-auto">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 rounded-lg transition-all duration-300 group"
                    >
                      <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  )}
                  
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 rounded-lg transition-all duration-300 group"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
