"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
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
        onSubmit={handleSubmit}
      >
        {/* Success/Error Message */}
        {submitStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg text-center text-sm font-medium ${
              submitStatus === "success" 
                ? "bg-green-900/50 text-green-300 border border-green-700" 
                : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
          >
            {submitStatus === "success" 
              ? "Thank you! Your message has been sent successfully." 
              : "Sorry, there was an error sending your message. Please try again."}
          </motion.div>
        )}

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-lg bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Your full name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-lg bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="your.email@example.com"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="rounded-lg bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-colors"
            placeholder="Type in your message here!"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-full bg-primary text-white px-6 py-3 font-semibold shadow hover:bg-primary/90 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </motion.form>
    </div>
  );
}
