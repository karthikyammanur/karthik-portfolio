"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Github, Linkedin, Mail, Send, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "@/components/Card";

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
          href="https://linkedin.com/in/karthikyammanur"
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
          <span className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-white" />
            Name
          </span>
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
          <span className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-white" />
            Email
          </span>
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
          <span className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-white" />
            Message
          </span>
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
          className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#dc2626] hover:border-red-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
        </motion.form>
      </ContactCard>
    </div>
  );
}
