"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Card from "./Card";

const featuredExperiences = [
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
  {
    company: "ACM Research at UTD",
    role: "Machine Learning Researcher",
    period: "Jan 2025 - May 2025",
    summary: "Developed AI models (VAE and VQGAN) to generate synthetic astronomical images to address data scarcity in space research.",
    technologies: ["TensorFlow", "Python", "Deep Learning"]
  }
];

export default function ExperienceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"
        >
          <Briefcase className="w-8 h-8 text-primary" />
          Experience Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          From neuroscience research to software engineering, exploring the intersection of AI and real-world applications
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredExperiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{experience.role}</h3>
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
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
                    className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary"
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
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-center"
      >
        <Link
          href="/experience"
          className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-full px-8 py-4 text-primary font-semibold transition-all duration-300 hover:scale-105"
        >
          <span>View All Experiences</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
