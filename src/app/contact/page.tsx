"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, MessageSquare, Github, Linkedin, Send } from "lucide-react";
import { ContactCard } from "@/components/Card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-full px-8 py-4 mb-6"
      >
        <MessageSquare className="text-primary text-2xl" />
        <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold">Let&apos;s Connect</h1>
      </motion.div>
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
          <Mail />
        </a>
        <a
          href="https://github.com/karthikyammanur"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-2xl"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/karthik-yammanur/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-2xl"
        >
          <Linkedin />
        </a>
      </motion.div>
      <ContactCard className="w-full">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-5"
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
          <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4 text-white" />
            Name
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="Your full name"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Mail className="w-4 h-4 text-white" />
            Email
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="your.email@example.com"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-white" />
            Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
            placeholder="Tell me about your project or just say hello!"
          />
        </label>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#dc2626] hover:border-red-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </motion.button>
        </motion.form>
      </ContactCard>
    </div>
  );
}
