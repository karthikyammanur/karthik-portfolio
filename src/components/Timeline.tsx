"use client";

import { useState, useRef } from "react";
import { ChevronDown, Briefcase, Calendar } from "lucide-react";
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
    company: "Manada Technologies",
    role: "AI/ML & Full Stack Developer Intern",
    period: "September 2025 - December 2025",
    summary: "Developing an enterprise-grade Lending Bot with anti-hallucination validation for financial document processing using Azure OpenAI Assistants API and GPT-4o-mini.",
    highlights: [
      "Building a modular pipeline for intelligent financial data extraction with complete source traceability",
      "Designing validation logic and confidence scoring to raise compliance from 72.2% → 85%+",
      "Integrating LLM-powered document parsing and prompt engineering for accuracy and reliability",
      "Creating audit trail and traceability managers to ensure regulatory transparency",
      "Developing and deploying full stack components with CI/CD and Git version control"
    ],
    technologies: ["Python", "Azure Cloud", "React", "Node.js", "pdfplumber", "TensorFlow", "PyTorch"]
  },
  {
    id: 2,
    company: "University of Texas at Dallas",
    role: "Neuroscience Research Student",
    period: "May 2025 - Present",
    summary: "Currently engaged in undergraduate research under Dr. Zirong Gu, contributing to a project that applies advanced machine learning techniques to analyze neural and muscle activity data.",
    highlights: [
      "Leveraging semi-supervised and unsupervised learning methods to uncover patterns in electrophysiology and EMG recordings",
      "Investigating how basal ganglia output influences complex action sequences through computational analysis",
      "Performing data preprocessing and feature extraction on neural activity datasets",
      "Contributing to model training, validation, and results interpretation for neuroscience investigations",
      "Applying advanced ML techniques to identify patterns in complex neural and muscle activity signals"
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "Electrophysiology", "EMG"]
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
  experienceRef: (el: HTMLDivElement | null) => void;
}

function ExperienceCard({ experience, isLeft, experienceRef }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      ref={experienceRef}
      className={`relative w-full lg:w-6/12 ${isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}
    >
      {/* Timeline connector line - Desktop */}
      <div className={`hidden lg:block absolute top-6 w-8 h-0.5 neon-line ${
        isLeft ? 'right-0 translate-x-8' : 'left-0 -translate-x-8'
      }`} />
      
      {/* Timeline connector line - Mobile */}
      <div className="lg:hidden absolute left-4 top-6 w-8 h-0.5 neon-line" />

      <Card className="hover:border-primary/30 transition-all duration-300 p-8">
        <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 neon-text-subtle">{experience.role}</h3>
              <div className="flex items-center gap-2 text-primary font-semibold mb-3">
                <Briefcase className="w-5 h-5" />
                <span className="text-lg">{experience.company}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
              </div>
            </div>
            <div
              className="transition-transform duration-300"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-4">
            {experience.summary}
          </p>

          {experience.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1.5 neon-border-subtle rounded text-sm text-primary hover:shadow-neon transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ 
            height: isExpanded ? 'auto' : '0',
            opacity: isExpanded ? 1 : 0
          }}
        >
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-base font-semibold text-white mb-4">Key Highlights:</h4>
            <ul className="space-y-3">
              {experience.highlights.map((highlight, highlightIndex) => (
                <li
                  key={highlightIndex}
                  className="text-base text-gray-300 flex items-start gap-3"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 shadow-neon" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToExperience = (index: number) => {
    setActiveIndex(index);
    experienceRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex gap-8">
        {/* Quick Navigation - Left Side */}
        <div className="hidden xl:block fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 w-56 2xl:w-64 z-40">
          <div className="glass-card neon-border-subtle rounded-2xl p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-white">Quick Navigation</h3>
            </div>
            <div className="flex flex-col gap-2">
              {experiences.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => scrollToExperience(index)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 text-left ${
                    activeIndex === index
                      ? 'bg-red-500/30 neon-border text-white shadow-neon'
                      : 'bg-red-500/10 border border-red-500/30 text-gray-300 hover:bg-red-500/20 hover:border-red-500/50'
                  }`}
                >
                  <div className="font-semibold">{exp.company}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{exp.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 relative">
          {/* Timeline line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 timeline-line" />
          
          {/* Timeline line - Mobile */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 timeline-line" />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline circle marker - Desktop */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6">
                  <div className="timeline-dot" />
                </div>
                
                {/* Timeline circle marker - Mobile */}
                <div className="lg:hidden absolute left-6 transform -translate-x-1/2 top-6">
                  <div className="timeline-dot" />
                </div>

                {/* Experience card */}
                <div className="ml-12 lg:ml-0 lg:flex lg:justify-center">
                  <ExperienceCard 
                    experience={experience} 
                    isLeft={index % 2 === 0}
                    experienceRef={(el) => {
                      experienceRefs.current[index] = el;
                      return el;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
