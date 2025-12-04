"use client";

import { Briefcase, ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Card from "./Card";

const featuredExperiences = [
  {
    company: "Manada Technologies",
    role: "Software Engineering Intern",
    period: "September 2025 - December 2025",
    summary: "Developing an enterprise-grade Lending Bot with anti-hallucination validation for financial document processing ",
    technologies: ["Python", "Azure Cloud", "React", "Node.js", "pdfplumber", "TensorFlow", "PyTorch"]
  },
  {
    company: "University of Texas at Dallas",
    role: "Neuroscience Research Student",
    period: "May 2025 - Present",
    summary: "Currently engaged in undergraduate research under Dr. Zirong Gu, applying advanced machine learning techniques to analyze neural and muscle activity data.",
    technologies: ["Python", "Machine Learning", "Electrophysiology", "EMG"]
  },
  {
    company: "Cohort Science",
    role: "Software Engineering Intern",
    period: "March 2025 - May 2025",
    summary: "Prototyped a dashboard UI to visualize ANN-generated research insights from UTD using React, Next.js, and Chart.js.",
    technologies: ["React", "Next.js", "Chart.js", "TypeScript"]
  },
  
];

export default function ExperienceSection() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 neon-text-subtle" />
          <span className="neon-text-subtle">Experience Journey</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          From neuroscience research to software engineering, exploring the intersection of AI and real-world applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredExperiences.map((experience) => (
          <div key={experience.company}>
            <Card className="h-full hover:shadow-neon transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{experience.role}</h3>
                  <div className="flex items-center gap-2 neon-text-subtle font-semibold mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{experience.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {experience.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="neon-border-subtle px-2 py-1 rounded text-xs hover:shadow-neon transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {experience.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-600/20 border border-gray-500/20 rounded text-xs text-gray-400">
                    +{experience.technologies.length - 3} more
                  </span>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/experience"
          className="glossy-button inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold"
        >
          <span>View All Experiences</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
