"use client";

import { Briefcase, Clock } from "lucide-react";
import { FaCode } from "react-icons/fa";
import Timeline from "@/components/Timeline";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center px-4 pt-12 pb-4 lg:pt-16 lg:pb-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="inline-flex items-center gap-4 glass-card neon-border-subtle rounded-3xl px-8 py-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
            <FaCode className="neon-text-subtle text-2xl sm:text-3xl" />
            <span className="neon-text-subtle">Experience</span>
          </h1>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pb-20 relative z-10">
        <Timeline />
      </section>
    </div>
  );
}
