"use client";
import React, { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import DevpostIcon from "./DevpostIcon";

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
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
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus("idle"), 3000);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 03</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Let&apos;s Connect</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

					{/* Left — Info Panel */}
					<div className="lg:col-span-2 flex flex-col gap-5">
						<div className="glass-card neon-border-subtle p-5 sm:p-6">
							<div className="font-mono text-[10px] text-red-500/40 tracking-widest mb-3">TRANSMISSION CHANNEL</div>
							<p className="text-sm text-white/50 leading-relaxed" style={{ textTransform: "none" }}>
								Open to collaborations, research opportunities, and interesting conversations. Drop a message or reach out directly.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{[
								{ href: "mailto:karthikyam2006@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
								{ href: "https://github.com/karthikyammanur", icon: <Github className="w-5 h-5" />, label: "GitHub" },
								{ href: "https://www.linkedin.com/in/karthik-yammanur/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
								{ href: "https://devpost.com/karthikyam2006", icon: <DevpostIcon className="w-5 h-5" />, label: "Devpost" },
							].map((link) => (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 p-3 border border-white/5 bg-white/[0.02] hover:border-red-500/30 hover:bg-red-500/[0.05] transition-all duration-300"
								>
									<span className="text-white/30 group-hover:text-red-500 transition-colors duration-300">{link.icon}</span>
									<span className="font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors duration-300" style={{ textTransform: "none" }}>{link.label}</span>
								</a>
							))}
						</div>

						<div className="flex items-center gap-2 px-1">
							<div className="relative">
								<div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
								<div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30" />
							</div>
							<span className="font-mono text-[10px] text-white/25 tracking-wider">ACCEPTING TRANSMISSIONS</span>
						</div>
					</div>

					{/* Right — Form */}
					<div className="lg:col-span-3">
						<div className="glass-card neon-border-subtle p-5 sm:p-6 relative">
							<div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-500/30" />
							<div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/30" />
							<div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/30" />
							<div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500/30" />

							<div className="font-mono text-[10px] text-red-500/40 tracking-widest mb-5">NEW TRANSMISSION</div>

							<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
								{submitStatus !== "idle" && (
									<div
										className={`p-3 font-mono text-xs text-center transition-all duration-300 ${
											submitStatus === "success"
												? "bg-green-500/10 text-green-400 border border-green-500/30"
												: "bg-red-500/10 text-red-400 border border-red-500/30"
										}`}
									>
										{submitStatus === "success"
											? "> TRANSMISSION SENT SUCCESSFULLY"
											: "> TRANSMISSION FAILED — RETRY"}
									</div>
								)}

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> IDENTIFIER
									</span>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className="neon-input no-glow-input"
										placeholder="Your name"
									/>
								</label>

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> RETURN CHANNEL
									</span>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="neon-input no-glow-input"
										placeholder="your.email@example.com"
									/>
								</label>

								<label className="flex flex-col gap-1.5">
									<span className="font-mono text-[11px] text-white/30 tracking-wider flex items-center gap-2">
										<span className="text-red-500/30">&#9656;</span> MESSAGE BODY
									</span>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={5}
										className="neon-input no-glow-input resize-none"
										placeholder="Tell me about yourself or say hello!"
									/>
								</label>

								<button
									type="submit"
									disabled={isSubmitting}
									className="glossy-button no-glow-button inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
								>
									{isSubmitting ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
											Transmitting...
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											Send Transmission
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
