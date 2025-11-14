"use client";

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
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-20 sm:py-24">
      <div className="inline-flex items-center gap-3 sm:gap-4 glass-card neon-border-subtle rounded-3xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 mb-6">
        <MessageSquare className="neon-text-subtle text-xl sm:text-2xl" />
        <h1 className="neon-text-subtle text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Let&apos;s Connect</h1>
      </div>
      <div className="flex gap-6 mb-10">
        <a
          href="mailto:karthikyam2006@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
        >
          <Mail />
        </a>
        <a
          href="https://github.com/karthikyammanur"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/karthik-yammanur/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
        >
          <Linkedin />
        </a>
      </div>
      <ContactCard className="w-full">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
        {/* Success/Error Message */}
        {submitStatus !== "idle" && (
          <div
            className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
              submitStatus === "success" 
                ? "bg-green-900/50 text-green-300 border border-green-700" 
                : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
          >
            {submitStatus === "success" 
              ? "Thank you! Your message has been sent successfully." 
              : "Sorry, there was an error sending your message. Please try again."}
          </div>
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
            className="neon-input"
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
            className="neon-input"
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
            className="neon-input resize-none"
            placeholder="Tell me about your project or just say hello!"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="glossy-button inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </button>
        </form>
      </ContactCard>
    </div>
  );
}
