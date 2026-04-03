"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Types ───────────────────────────────────────────────────────────────────────

type Category = "swe" | "research" | "ai";
type CategoryFilter = Category | "all";

interface Mission {
  id: string;
  category: Category;
  status: "active" | "complete";
  title: string;
  company: string;
  date: string;
  classification: string;
  description: string;
  systems: string[];
  image?: string;
  highlights?: string[];
  link?: string;
}

// ── Data ────────────────────────────────────────────────────────────────────────

const missions: Mission[] = [
  {
    id: "MSN-001",
    category: "research",
    status: "active",
    title: "ML Research Student",
    company: "BBS @ UTD (Neuroscience Lab - Dr. Gu)",
    date: "Jan 2025 — Present",
    classification: "Research",
    description:
      "Conducting pose estimation research for early Parkinson's detection using CV models wtih supervised and semi-supervised learning.",
    highlights: [
      "Building and iterating on supervised training pipelines by annotating mouse keypoints across multi-view camera data, training models, and evaluating output logs to determine optimal labeled frame thresholds for accurate pose estimation.",
      "Reviewing research papers on pose estimation architectures, model ensembling, and semi-supervised methods to inform data labeling and training strategy."
    ],
    systems: ["Python", "Machine Learning", "Data Analysis", "Computer Vision", "Pose Estimation"],
    image: "/bbs.jpg",
    link: "https://labs.utdallas.edu/ganglia-guardian-lab/",
  },
  {
    id: "MSN-002",
    category: "swe",
    status: "active",
    title: "Software Engineering Intern",
    company: "Nearly Human (Formerly Manada Technologies)",
    date: "Sep 2025 — Present",
    classification: "Software Engineering",
    description:
      "Built a financial document processing pipeline using GPT-4o that converts raw income statement PDFs into six-page Bedrock-standard compliance spreads (income statement, balance sheet, cash flow, UCA cash flow, financial ratios), mapping 140+ standardized fields with fuzzy matching across 97 field variations.",
    highlights: [
      "Engineered a zero-tolerance anti-hallucination validation system with source-truth cross-referencing, bounding-box-level PDF traceability, and confidence scoring for every extracted value, ensuring complete audit trails for regulatory review.",
      "Deployed the system as an MLflow-versioned model with Azure ML integration, semantic vector search with financial-domain query enhancement, and a 56-test validation suite across 12 test files covering unit, integration, and manual test categories."
    ],
    systems: ["Python", "Azure ML", "GPT-4o", "MLflow"],
    image: "/nearlyhuman.jpg",
    link: "https://nearlyhuman-gs.com/",
  },
  {
    id: "MSN-003",
    category: "swe",
    status: "complete",
    title: "Software Engineering Intern",
    company: "Cohort Science",
    date: "Mar 2025 — May 2025",
    classification: "Software Engineering",
    description:
      "Built a responsive dashboard UI to visualize ANN-generated research data from the UT-Design Research Lab, enabling data insights for 1000+ potential entries.",
    highlights: [
      "Enabled complex data filtering across 16+ categories by developing a scalable FilterSearch component in Next.js with React Hooks and Chart.js, supporting boolean logic for advanced query capabilities.",
      "Optimized component rendering and state management with useState and CSS Modules, reducing dashboard load time by 40% and filter query execution by 65% through memoization and efficient data structures."
    ],
    systems: ["React", "Next.js", "Chart.js", "CSS Modules", "TypeScript"],
    image: "/cohortscience.jpg",
    link: "https://cohortscience.com/",
  },
  {
    id: "MSN-004",
    category: "ai",
    status: "complete",
    title: "Machine Learning Researcher",
    company: "ACM Research at UTD",
    date: "Jan 2025 — May 2025",
    classification: "AI / ML",
    description:
      "Built and trained 4 generative CV models (DCGAN, StyleGAN, VAE, and VQGAN) using TensorFlow to synthesize rare astronomical images, augmenting a 17,736-image dataset to address data scarcity.",
    highlights: [
      "Improved rare event detection metrics by up to 15% Recall and 12% F1 score by integrating our models’ generated images."
    ],
    systems: ["TensorFlow", "Python", "NumPy", "Matplotlib", "Deep Learning", "Machine Learning"],
    image: "/acm.jpg",
    link: "https://acmutd.co/",
  },
  {
    id: "MSN-005",
    category: "research",
    status: "complete",
    title: "Undergraduate Student Researcher",
    company: "UT-Design Research Lab — UT Dallas",
    date: "Oct 2024 — May 2025",
    classification: "Research",
    description:
      "Analyzed student-drawn concept maps to measure engineering identity. Worked under Dr. Pavan Kumar and Dr. Joshua Summers.",
    highlights: [
      "Processed 500+ hand-drawn maps into a clean, structured dataset",
      "Extracted graph features such as node count, edge density, and clustering coefficients",
      "Prepared data for ANN training and analysis",
      "Work contributed to Cohort Science's partnership"
    ],
    systems: ["Python", "Data Analysis", "Graph Theory", "Machine Learning"],
    image: "/utdesignutd.jpg",
    link: "https://utdesign.utdallas.edu/",
  },
  {
    id: "MSN-006",
    category: "ai",
    status: "complete",
    title: "AI Research Intern",
    company: "Emergence AI",
    date: "Sep 2023 — Apr 2024",
    classification: "AI / ML",
    description:
      "Evaluated GPT-3.5 and GPT-4 for data analysis capabilities on large tabular datasets.",
    highlights: [
      "Designed evaluation prompts and test datasets up to 3,900 rows",
      "Implemented chunking mechanism to bypass token limits",
      "Measured accuracy in trend identification, statistical analysis, and anomaly detection",
      "Diagnosed LLM failure modes (hallucinations, memory leaks, schema errors)",
      "Presented weekly findings and recommended workflow improvements to supervisors"
    ],
    systems: ["GPT-3.5", "GPT-4", "Python", "Data Analysis", "LLM Evaluation"],
    image: "/emergence.jpg",
    link: "https://www.emergence.ai/",
  },
];

// ── Constants ───────────────────────────────────────────────────────────────────

const FILTER_BUTTONS: { label: string; value: CategoryFilter }[] = [
  { label: "ALL OPS", value: "all" },
  { label: "SWE", value: "swe" },
  { label: "RESEARCH", value: "research" },
  { label: "AI / ML", value: "ai" },
];

const reduceMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// ── Sub-components ──────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between flex-wrap gap-y-1 px-4 py-3"
      style={{
        fontSize: "0.85rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "rgba(255,0,0,0.5)",
        borderBottom: "4px solid rgba(255,0,0,0.15)",
        fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
      }}
    >
      <div className="flex items-center gap-0 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ff0000",
              animation: "hudPulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ animation: "hudPulse 2s ease-in-out infinite" }}>
            System Online
          </span>
        </span>
        <span className="mx-2" style={{ color: "rgba(255,0,0,0.25)" }}>|</span>
        <span>{missions.length} Missions Logged</span>
        <span className="mx-2" style={{ color: "rgba(255,0,0,0.25)" }}>|</span>
        <span>Clearance: Full</span>
      </div>
      <span className="hidden sm:inline" style={{ color: "rgba(255,0,0,0.35)" }}>
        ARES-EXP-v2.1
      </span>
    </motion.div>
  );
}

function CategoryFilterBar({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (v: CategoryFilter) => void;
}) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.15 }}
      className="flex flex-wrap gap-2 px-4 py-3"
    >
      {FILTER_BUTTONS.map((btn) => {
        const isActive = active === btn.value;
        return (
          <button
            key={btn.value}
            onClick={() => onChange(btn.value)}
            style={{
              fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "0.375rem 1rem",
              border: `4px solid ${isActive ? "#ff0000" : "rgba(255,0,0,0.2)"}`,
              color: isActive ? "#ff0000" : "rgba(255,0,0,0.45)",
              background: isActive ? "rgba(255,0,0,0.08)" : "transparent",
              boxShadow: isActive ? "0 0 12px rgba(255,0,0,0.1)" : "none",
              borderRadius: 0,
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(255,0,0,0.5)";
                e.currentTarget.style.color = "rgba(255,0,0,0.7)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(255,0,0,0.2)";
                e.currentTarget.style.color = "rgba(255,0,0,0.45)";
              }
            }}
          >
            {btn.label}
          </button>
        );
      })}
    </motion.div>
  );
}

function MissionPanel({
  mission,
  index,
  isSelected,
  onToggle,
}: {
  mission: Mission;
  index: number;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.1,
        layout: { duration: 0.3 },
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="relative cursor-pointer outline-none"
      style={{
        background: "rgba(8,0,0,0.9)",
        border: `4px solid ${
          isSelected
            ? "rgba(255,0,0,0.6)"
            : isHovered
            ? "rgba(255,0,0,0.3)"
            : "rgba(255,0,0,0.12)"
        }`,
        boxShadow: isSelected ? "0 0 20px rgba(255,0,0,0.1)" : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Top edge glow on hover/selected */}
      <div
        className="absolute top-0 left-0 right-0 h-[4px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,0,0,0.4), transparent)",
          opacity: isHovered || isSelected ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: "4px solid rgba(255,0,0,0.4)",
          borderLeft: "4px solid rgba(255,0,0,0.4)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: "4px solid rgba(255,0,0,0.4)",
          borderRight: "4px solid rgba(255,0,0,0.4)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderBottom: "4px solid rgba(255,0,0,0.4)",
          borderLeft: "4px solid rgba(255,0,0,0.4)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none"
        style={{
          borderBottom: "4px solid rgba(255,0,0,0.4)",
          borderRight: "4px solid rgba(255,0,0,0.4)",
        }}
      />

      {/* Crosshair overlay */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isHovered ? 0.15 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[4px]"
          style={{ background: "rgba(255,0,0,0.5)" }}
        />
        <div
          className="absolute top-1/2 left-0 right-0 h-[4px]"
          style={{ background: "rgba(255,0,0,0.5)" }}
        />
      </div>

      {/* Panel content */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        {/* Header row: mission ID + status */}
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,0,0,0.3)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
              animation: isSelected ? "hudPulse 2s ease-in-out infinite" : "none",
            }}
          >
            {mission.id}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.2rem 0.6rem",
              fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
              border:
                mission.status === "active"
                  ? "4px solid rgba(0,255,100,0.3)"
                  : "4px solid rgba(255,0,0,0.2)",
              color:
                mission.status === "active"
                  ? "rgba(0,255,100,0.7)"
                  : "rgba(255,0,0,0.35)",
            }}
          >
            {mission.status === "active" ? "ACTIVE" : "COMPLETE"}
          </span>
        </div>

        {/* Divider line */}
        <div
          className="mb-4"
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,0,0,0.05))",
          }}
        />

        {/* Role title */}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            lineHeight: 1.4,
            marginBottom: "1rem",
            fontFamily: "var(--font-tomorrow), 'Tomorrow', sans-serif",
          }}
        >
          {mission.title}
        </h3>

        {/* Metadata grid */}
        <div
          className="grid gap-y-1.5"
          style={{
            gridTemplateColumns: "3.5rem 1fr",
            fontSize: "0.9rem",
            fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
          }}
        >
          <span
            style={{
              color: "rgba(255,0,0,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ORG
          </span>
          <span style={{ color: "#ff3333" }}>{mission.company}</span>

          <span
            style={{
              color: "rgba(255,0,0,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            DATE
          </span>
          <span style={{ color: "rgba(255,150,150,0.65)" }}>{mission.date}</span>

          <span
            style={{
              color: "rgba(255,0,0,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            CLASS
          </span>
          <span style={{ color: "rgba(255,150,150,0.65)" }}>
            {mission.classification}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Detail Side Panel ────────────────────────────────────────────────────────────

function MissionDetailPanel({
  mission,
  onClose,
}: {
  mission: Mission;
  onClose: () => void;
}) {
  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-full w-full"
      style={{
        background: "rgba(8,0,0,0.9)",
        border: "4px solid rgba(255,0,0,0.3)",
        boxShadow: "0 0 20px rgba(255,0,0,0.1)",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.015) 3px, rgba(255,0,0,0.015) 4px)",
          zIndex: 1,
        }}
      />

      {/* Corner brackets — top-left */}
      <div
        className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
        style={{
          borderTop: "4px solid rgba(255,0,0,0.4)",
          borderLeft: "4px solid rgba(255,0,0,0.4)",
          zIndex: 2,
        }}
      />
      {/* Corner brackets — bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none"
        style={{
          borderBottom: "4px solid rgba(255,0,0,0.4)",
          borderLeft: "4px solid rgba(255,0,0,0.4)",
          zIndex: 2,
        }}
      />
      {/* Corner brackets — top-right */}
      <div
        className="absolute top-0 right-0 w-5 h-5 pointer-events-none"
        style={{
          borderTop: "4px solid rgba(255,0,0,0.4)",
          borderRight: "4px solid rgba(255,0,0,0.4)",
          zIndex: 2,
        }}
      />
      {/* Corner brackets — bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
        style={{
          borderBottom: "4px solid rgba(255,0,0,0.4)",
          borderRight: "4px solid rgba(255,0,0,0.4)",
          zIndex: 2,
        }}
      />

      {/* Panel content */}
      <div className="relative h-full overflow-y-auto" style={{ zIndex: 2 }}>
        {/* Header bar */}
        <div
          className="flex items-center justify-between sticky top-0 bg-[rgba(8,0,0,0.95)] z-10 backdrop-blur-sm"
          style={{
            padding: "12px 24px",
            borderBottom: "4px solid rgba(255,0,0,0.15)",
            fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          <span style={{ color: "rgba(255,0,0,0.5)" }}>{mission.id}</span>
          <span
            style={{
              padding: "0.15rem 0.5rem",
              border:
                mission.status === "active"
                  ? "4px solid rgba(0,255,100,0.3)"
                  : "4px solid rgba(255,0,0,0.2)",
              color:
                mission.status === "active"
                  ? "rgba(0,255,100,0.7)"
                  : "rgba(255,0,0,0.35)",
            }}
          >
            {mission.status === "active" ? "ACTIVE" : "COMPLETE"}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,0,0,0.5)",
              fontSize: "1.25rem",
              lineHeight: 1,
              cursor: "pointer",
              padding: "4px 8px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff0000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,0,0,0.5)";
            }}
            aria-label="Close panel"
          >
            &#215;
          </button>
        </div>

            {/* Content area with staggered fade-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ padding: "20px 24px 24px" }}
            >
              {/* Image section */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  background: "rgba(4,0,0,0.8)",
                  border: "4px solid rgba(255,0,0,0.12)",
                  borderBottom: "4px solid rgba(255,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {mission.image ? (
                  mission.link ? (
                    <Link href={mission.link} target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%", display: "block" }}>
                      <img
                        src={mission.image}
                        alt={`${mission.company} — ${mission.title}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={mission.image}
                      alt={`${mission.company} — ${mission.title}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )
                ) : (
                  <>
                    {/* Placeholder HUD display */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,0,0,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,0,0,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                        fontSize: "0.95rem",
                        color: "rgba(255,0,0,0.2)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      {mission.id}
                    </span>
                  </>
                )}
              </div>

              {/* Company & Role section */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                style={{ marginBottom: "20px" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#ff3333",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    lineHeight: 1.3,
                    marginBottom: "6px",
                  }}
                >
                  {mission.company}
                </h2>
                <h3
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    lineHeight: 1.3,
                    marginBottom: "8px",
                  }}
                >
                  {mission.title}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                    fontSize: "0.85rem",
                    color: "rgba(255,0,0,0.4)",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  {mission.date}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "0.2rem 0.6rem",
                    border: "4px solid rgba(255,0,0,0.2)",
                    color: "rgba(255,60,60,0.55)",
                    display: "inline-block",
                  }}
                >
                  {mission.classification}
                </span>
              </motion.div>

              {/* Divider */}
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,0,0,0.05))",
                  marginBottom: "20px",
                }}
              />

              {/* Mission Brief */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ marginBottom: "24px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(255,0,0,0.25)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  MISSION BRIEF
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                    fontSize: "0.95rem",
                    color: "rgba(255,180,180,0.6)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {mission.description}
                </p>
              </motion.div>

              {/* Divider */}
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,0,0,0.05))",
                  marginBottom: "20px",
                }}
              />

              {/* Systems Utilized */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                style={{ marginBottom: "24px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(255,0,0,0.25)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  SYSTEMS UTILIZED
                </div>
                <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                  {mission.systems.map((sys) => (
                    <span
                      key={sys}
                      className="hud-tag"
                      style={{
                        fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                        fontSize: "0.8rem",
                        padding: "0.3rem 0.8rem",
                        border: "4px solid rgba(255,0,0,0.15)",
                        color: "rgba(255,60,60,0.55)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Key Outcomes (future use) */}
              {mission.highlights && mission.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {/* Divider */}
                  <div
                    style={{
                      height: "2px",
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,0,0,0.05))",
                      marginBottom: "20px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                      fontSize: "0.7rem",
                      color: "rgba(255,0,0,0.25)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    KEY OUTCOMES
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {mission.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                          fontSize: "0.9rem",
                          color: "rgba(255,180,180,0.55)",
                          lineHeight: 1.7,
                          paddingLeft: "1rem",
                          position: "relative",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "rgba(255,0,0,0.35)",
                          }}
                        >
                          &rsaquo;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </div>
    </motion.div>
  );
}


// ── Main Component ──────────────────────────────────────────────────────────────

export default function HUDExperience() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? missions
        : missions.filter((m) => m.category === activeFilter),
    [activeFilter]
  );

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedMission(null);
  }, [activeFilter]);

  const handleToggle = useCallback((missionId: string) => {
    setSelectedMission((prev) => (prev === missionId ? null : missionId));
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedMission(null);
  }, []);

  const activeMission = useMemo(
    () => missions.find((m) => m.id === selectedMission) ?? null,
    [selectedMission]
  );
  
  useEffect(() => {
    if (selectedMission && panelRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // slight delay for layout render
    }
  }, [selectedMission]);

  return (
    <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.015) 3px, rgba(255,0,0,0.015) 4px)",
        }}
      />

      {/* Status bar */}
      <StatusBar />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row relative z-10 gap-6 mt-4 lg:items-stretch w-full">
        {/* Mission grid (Left side) */}
        <motion.div 
          layout
          className={`grid grid-cols-1 ${activeMission ? 'lg:grid-cols-1 xl:grid-cols-2 lg:gap-4' : 'md:grid-cols-2'} gap-[2px] w-full`}
          style={{ flex: 1 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((mission, i) => (
              <MissionPanel
                key={mission.id}
                mission={mission}
                index={i}
                isSelected={selectedMission === mission.id}
                onToggle={() => handleToggle(mission.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Side Detail Panel (Right side) */}
        <AnimatePresence mode="wait">
          {activeMission && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, width: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                width: "100%", 
                scale: 1,
                maxWidth: "550px" 
              }}
              exit={{ opacity: 0, width: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-first lg:order-last flex-shrink-0 w-full overflow-hidden origin-top flex flex-col"
            >
              <div className="w-full lg:w-[500px] xl:w-[550px] flex-1 min-h-[500px]">
                <MissionDetailPanel
                  key={activeMission.id}
                  mission={activeMission}
                  onClose={handleClosePanel}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Compact variant for home page ───────────────────────────────────────────────

export function HUDExperienceCompact() {
  const preview = missions.slice(0, 3);

  return (
    <div className="relative">
      {/* Mini status bar */}
      <div
        className="flex items-center gap-0 mb-3 px-1"
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,0,0,0.4)",
          fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
        }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ff0000",
              animation: "hudPulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ animation: "hudPulse 2s ease-in-out infinite" }}>
            Online
          </span>
        </span>
        <span className="mx-2" style={{ color: "rgba(255,0,0,0.2)" }}>|</span>
        <span>{missions.length} Missions</span>
      </div>

      {/* Compact mission panels */}
      <div className="grid gap-[2px]">
        {preview.map((mission) => (
          <div
            key={mission.id}
            className="relative"
            style={{
              background: "rgba(8,0,0,0.9)",
              border: "4px solid rgba(255,0,0,0.12)",
              padding: "0.75rem 1rem",
            }}
          >
            {/* Corner brackets */}
            <div
              className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none"
              style={{
                borderTop: "4px solid rgba(255,0,0,0.35)",
                borderLeft: "4px solid rgba(255,0,0,0.35)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none"
              style={{
                borderTop: "4px solid rgba(255,0,0,0.35)",
                borderRight: "4px solid rgba(255,0,0,0.35)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none"
              style={{
                borderBottom: "4px solid rgba(255,0,0,0.35)",
                borderLeft: "4px solid rgba(255,0,0,0.35)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none"
              style={{
                borderBottom: "4px solid rgba(255,0,0,0.35)",
                borderRight: "4px solid rgba(255,0,0,0.35)",
              }}
            />

            <div className="flex items-center justify-between mb-1">
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "rgba(255,0,0,0.25)",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                }}
              >
                {mission.id}
              </span>
              <span
                style={{
                  fontSize: "0.5625rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.125rem 0.4rem",
                  fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
                  border:
                    mission.status === "active"
                      ? "4px solid rgba(0,255,100,0.3)"
                      : "4px solid rgba(255,0,0,0.15)",
                  color:
                    mission.status === "active"
                      ? "rgba(0,255,100,0.6)"
                      : "rgba(255,0,0,0.3)",
                }}
              >
                {mission.status === "active" ? "ACTIVE" : "COMPLETE"}
              </span>
            </div>
            <h4
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                lineHeight: 1.3,
                marginBottom: "0.25rem",
                fontFamily: "var(--font-tomorrow), 'Tomorrow', sans-serif",
              }}
            >
              {mission.title}
            </h4>
            <div
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
              }}
            >
              <span style={{ color: "#ff3333" }}>{mission.company}</span>
              <span style={{ color: "rgba(255,0,0,0.2)", margin: "0 0.375rem" }}>|</span>
              <span style={{ color: "rgba(255,150,150,0.5)" }}>{mission.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <Link
        href="/experience"
        className="group flex items-center justify-center mt-3 py-2"
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(255,0,0,0.45)",
          border: "4px solid rgba(255,0,0,0.15)",
          fontFamily: "var(--font-tomorrow), 'Tomorrow', monospace",
          transition: "all 0.2s ease",
          background: "rgba(8,0,0,0.6)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,0,0,0.4)";
          e.currentTarget.style.color = "#ff0000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,0,0,0.15)";
          e.currentTarget.style.color = "rgba(255,0,0,0.45)";
        }}
      >
        VIEW ALL MISSIONS &rarr;
      </Link>
    </div>
  );
}
