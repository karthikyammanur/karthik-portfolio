"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { allProjects } from "@/data/projects";

export default function ProjectsSection() {
	return (
		<div className="text-white relative">
			<div className="px-4 sm:px-6 lg:px-8 pb-4 lg:pb-6 relative z-10 max-w-[90rem] mx-auto">
				<div className="flex items-center gap-4 sm:gap-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">// 02</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Projects</h2>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
			</div>

			<div className="w-full max-w-[90rem] mx-auto px-4 py-6 sm:py-8 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
					{allProjects.map((project) => (
						<div key={project.title}>
							<ProjectCard {...project} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
