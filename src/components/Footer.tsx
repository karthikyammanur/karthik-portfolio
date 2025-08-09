"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";
import Card from "./Card";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-4">Karthik Yammanur</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Computer Engineering student at UT Dallas, building AI-powered solutions 
              and innovative web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Projects
              </Link>
              <Link href="/experience" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Experience
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <motion.a
                href="mailto:karthikyam2006@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/karthikyammanur"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/karthik-yammanur/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Credit Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Card className="text-center py-4">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              © {new Date().getFullYear()} Website developed by Karthik Yammanur
            </p>
          </Card>
        </motion.div>
      </div>
    </footer>
  );
}
