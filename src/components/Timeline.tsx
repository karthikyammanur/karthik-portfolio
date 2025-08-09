"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Briefcase, Calendar, MapPin } from "lucide-react";
import Card from "./Card";

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "University of Texas at Dallas",
    role: "Neuroscience Research Student",
    period: "May 2025 - Present",
    summary: "Currently engaged in undergraduate research under Dr. Zirong Gu, contributing to a project that applies advanced machine learning techniques to analyze neural and muscle activity data.",
    highlights: [
      "Will be leveraging semi-supervised and unsupervised learning methods to uncover patterns in electrophysiology and EMG recordings",
      "Will focus on understanding how basal ganglia output influences complex action sequences",
      "Will handle data preprocessing and feature extraction for neural activity datasets",
      "Will contribute to model training and results interpretation for neuroscience investigations",
      "Will apply advanced ML techniques to analyze complex neural and muscle activity patterns"
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "Electrophysiology", "EMG"]
  },
  {
    id: 2,
    company: "Cohort Science",
    role: "Software Engineering Intern",
    period: " March 2025 - May 2025",
    summary: "Prototyped a dashboard UI to visualize ANN-generated research insights from UTD.",
    highlights: [
      "Built a modular FilterSearch component with React Hooks, Next.js, and Chart.js for dynamic filtering",
      "Implemented responsive layouts and state management with useState",
      "Styled using CSS Modules for modularity",
      "Integrated multiple Chart.js visualizations for interactive research data display",
      "Delivered a functional prototype ready for future scaling"
    ],
    technologies: ["React", "Next.js", "Chart.js", "CSS Modules", "TypeScript"]
  },
  {
    id: 3,
    company: "ACM Research at UTD",
    role: "Machine Learning Researcher",
    period: "January 2025 - May 2025",
    summary: "Developed AI models to generate synthetic astronomical images to address data scarcity.",
    highlights: [
      "Built VAE and VQGAN models from scratch using TensorFlow, NumPy, and Matplotlib",
      "Trained models for low reconstruction loss and high visual fidelity",
      "Compared performance of DCGAN, StyleGAN, VAE, VQGAN to evaluate trade-offs",
      "Proposed integration of YOLO-ET and Random Forest for anomaly detection in future work"
    ],
    technologies: ["TensorFlow", "Python", "NumPy", "Matplotlib", "Deep Learning"]
  },
  {
    id: 4,
    company: "UT-Design Research Lab - UT Dallas",
    role: "Undergraduate Student Researcher",
    period: "October 2024- May 2025",
    summary: "Analyzed student-drawn concept maps to measure engineering identity - Worked under Dr. Pavan Kumar and Dr. Joshua Summers",
    highlights: [
      "Processed 500+ hand-drawn maps into a clean, structured dataset",
      "Extracted graph features such as node count, edge density, and clustering coefficients",
      "Prepared data for ANN training and analysis",
      "Work contributed to Cohort Science's partnership"
    ],
    technologies: ["Python", "Data Analysis", "Graph Theory", "Machine Learning"]
  },
  {
    id: 5,
    company: "Emergence AI",
    role: "AI Research Intern",
    period: "Sept 2023- April 2024",
    summary: "Evaluated GPT-3.5 and GPT-4 for data analysis capabilities on large tabular datasets.",
    highlights: [
      "Designed evaluation prompts and test datasets up to 3,900 rows",
      "Implemented chunking mechanism to bypass token limits",
      "Measured accuracy in trend identification, statistical analysis, and anomaly detection",
      "Diagnosed LLM failure modes (hallucinations, memory leaks, schema errors)",
      "Presented weekly findings and recommended workflow improvements to supervisors"
    ],
    technologies: ["GPT-3.5", "GPT-4", "Python", "Data Analysis", "LLM Evaluation"]
  }
];

interface ExperienceCardProps {
  experience: Experience;
  isLeft: boolean;
  index: number;
}

function ExperienceCard({ experience, isLeft, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`relative w-full lg:w-5/12 ${isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}
    >
      {/* Timeline connector line - Desktop */}
      <div className={`hidden lg:block absolute top-6 w-8 h-0.5 bg-primary ${
        isLeft ? 'right-0 translate-x-8' : 'left-0 -translate-x-8'
      }`} />
      
      {/* Timeline connector line - Mobile */}
      <div className="lg:hidden absolute left-4 top-6 w-8 h-0.5 bg-primary" />

      <Card className="hover:border-primary/30 transition-all duration-300">
        <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{experience.role}</h3>
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Briefcase className="w-4 h-4" />
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {experience.summary}
          </p>

          {experience.technologies && (
            <div className="flex flex-wrap gap-2 mb-3">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3">Key Highlights:</h4>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, highlightIndex) => (
                <motion.li
                  key={highlightIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  transition={{ duration: 0.15, delay: highlightIndex * 0.03 }}
                  className="text-sm text-gray-300 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      {/* Timeline line - Desktop */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      
      {/* Timeline line - Mobile */}
      <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      <div className="space-y-12 lg:space-y-16">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative">
            {/* Timeline circle marker - Desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="w-4 h-4 bg-primary rounded-full border-4 border-black"
              />
            </div>
            
            {/* Timeline circle marker - Mobile */}
            <div className="lg:hidden absolute left-6 transform -translate-x-1/2 top-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="w-4 h-4 bg-primary rounded-full border-4 border-black"
              />
            </div>

            {/* Experience card */}
            <div className="ml-12 lg:ml-0 lg:flex lg:justify-center">
              <ExperienceCard 
                experience={experience} 
                isLeft={index % 2 === 0}
                index={index}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
