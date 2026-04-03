"use client";
import { Github, ExternalLink, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  shortDescription?: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imageSrc: string; // new prop for thumbnail
  award?: string;
}

export default function ProjectCard({
  title,
  description,
  shortDescription,
  techStack,
  githubLink,
  liveLink,
  imageSrc,
  award,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <div
        className="glass-card glossy-surface p-0 flex flex-col gap-4 w-full max-w-md mx-auto cursor-pointer h-full hover:scale-[1.03] hover:-translate-y-2 transition-all duration-300"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.97)' }}
        onClick={() => setOpen(true)}
      >
        <div className="relative w-full h-48 bg-black flex items-center justify-center group overflow-hidden">
          {award && (
            <div className="absolute top-2 right-2 z-10">
              <Crown className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
            </div>
          )}
          <Image
            src={imageSrc}
            alt={title + " thumbnail"}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 neon-text-subtle">{title}</h3>
            <p className="text-gray-300 text-sm mb-3">{shortDescription || description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="tech-badge px-3 py-1 text-xs font-medium uppercase tracking-wider neon-border-subtle hover:bg-red-500/10 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 transition-all duration-300 neon-border-subtle bg-white/10 text-white font-semibold text-sm hover:scale-105 hover:bg-red-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 transition-all duration-300 glossy-button text-white font-semibold text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Modal Popup */}
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div
            className="glass-card glossy-surface p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.97)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary hover:neon-text-subtle text-2xl font-bold z-10 transition-all duration-300"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-white mb-4 neon-text-subtle">{title}</h3>
            <div className="relative w-full mb-6 overflow-hidden neon-border-subtle">
              <Image
                src={imageSrc}
                alt={title + " thumbnail"}
                width={800}
                height={450}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <p className="text-gray-300 text-base mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="tech-badge px-3 py-1 text-xs font-medium uppercase tracking-wider neon-border-subtle hover:bg-red-500/10 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 transition-all duration-300 neon-border-subtle bg-white/10 text-white font-semibold text-sm hover:scale-105 hover:bg-red-500/10"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 transition-all duration-300 glossy-button text-white font-semibold text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
