"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Projects", href: "/projects" },
	{ name: "Experience", href: "/experience" },
	{ name: "Resume", href: "/resume" },
	{ name: "Contact", href: "/contact" },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur sticky top-0">
			<div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
				{/* Logo/Name */}
				<Link
					href="/"
					className="font-bold text-lg tracking-tight flex items-center gap-2 select-none"
				>
					{/* i'll replace the image later */}
					<span className="text-primary">Karthik Yammanur</span>
				</Link>
				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`transition-colors font-medium hover:text-primary/80 ${
								pathname === link.href
									? "text-primary"
									: "text-gray-300"
							}`}
						>
							{link.name}
						</Link>
					))}
				</div>
				{/* Hamburger for mobile */}
				<button
					className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
					onClick={() => setMenuOpen((v) => !v)}
					aria-label="Toggle menu"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
			{/* Mobile menu dropdown */}
			<div
				className={`md:hidden transition-all duration-200 ease-in-out ${
					menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
				} overflow-hidden px-4`}
				style={{
					//animate height for dropdown
					transitionProperty: "max-height, opacity",
				}}
			>
				<div className="flex flex-col gap-2 bg-black/95 rounded shadow border border-white/10 py-2 mt-2">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`transition-colors font-medium px-2 py-2 rounded hover:bg-primary/10 ${
								pathname === link.href
									? "text-primary"
									: "text-gray-300"
							}`}
							onClick={() => setMenuOpen(false)}
						>
							{link.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
