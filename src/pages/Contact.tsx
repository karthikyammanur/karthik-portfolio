"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl font-bold mb-6 text-center"
      >
        Let's connect
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex gap-6 mb-10"
      >
        <a
          href="mailto:karthikyam2006@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-2xl"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://github.com/karthikyammanur"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-2xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/karthikyammanur"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-2xl"
        >
          <FaLinkedin />
        </a>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-md bg-[#18181b] rounded-2xl p-8 shadow-xl border border-white/10 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent! (demo)");
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            required
            className="rounded bg-black border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            className="rounded bg-black border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Message</span>
          <textarea
            required
            rows={4}
            className="rounded bg-black border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-primary resize-none"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-primary text-white px-6 py-3 font-semibold shadow hover:bg-primary/90 transition-colors text-base"
        >
          Send Message
        </button>
      </motion.form>
    </div>
  );
}
