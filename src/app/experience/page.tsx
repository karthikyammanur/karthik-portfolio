"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock } from "lucide-react";
import { FaCode } from "react-icons/fa";
import Timeline from "@/components/Timeline";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center px-4 py-20 lg:py-32"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-full px-8 py-4 mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold"
          >
            <FaCode className="text-primary text-2xl sm:text-3xl" />
            <span className="text-primary">Experience</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            My journey through software engineering, AI research, and data analysis. 
            Click on any experience card to explore the details.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-6 text-primary"
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">2023 - Present</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pb-20"
      >
        <Timeline />
      </motion.section>
    </div>
  );
}
