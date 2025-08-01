"use client";
import ProjectsSection from "@/components/ProjectsSection";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaGithub } from "react-icons/fa";
import Card from "@/components/Card";

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6"
          >
            <FaCode className="text-primary text-xl" />
            <span className="text-primary font-medium">Portfolio Showcase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent glitch-hover"
          >
            My Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            A collection of projects showcasing my expertise in AI, web development, 
            and full-stack solutions. From machine learning models to production applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FaRocket className="text-primary" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub className="text-primary" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Actively Maintained</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <ProjectsSection />
      </motion.div>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="px-4 py-20 lg:py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Interested in collaborating on a project or discussing opportunities? 
              I'm always excited to work on innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#ff00ff] hover:border-pink-400 hover:bg-white/10"
              >
                Get In Touch
                <FaRocket className="text-lg" />
              </motion.a>
              <motion.a
                href="https://github.com/karthikyammanur"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#ff00ff] hover:border-pink-400 hover:bg-white/10"
              >
                View All Projects
                <FaGithub className="text-lg" />
              </motion.a>
            </div>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
