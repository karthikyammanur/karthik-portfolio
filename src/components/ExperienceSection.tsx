"use client";
import React from "react";
import HUDExperience from "./HUDExperience";

export default function ExperienceSection() {
	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 01</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Experience</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>
			<div className="pb-8 relative z-10">
				<HUDExperience />
			</div>
		</div>
	);
}
