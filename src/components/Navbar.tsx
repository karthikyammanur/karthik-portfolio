"use client";
import { useState, useEffect } from "react";
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
	const [dark, setDark] = useState(false);
	const pathname = usePathname();

	// Set initial dark mode based on system/user preference
	useEffect(() => {
		if (typeof window !== "undefined") {
			const isDark =
				localStorage.getItem("theme") === "dark" ||
				(!localStorage.getItem("theme") &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);
			setDark(isDark);
			document.documentElement.classList.toggle("dark", isDark);
		}
	}, []);

	// Toggle dark mode
	const toggleDark = () => {
		setDark((prev) => {
			const newDark = !prev;
			if (typeof window !== "undefined") {
				document.documentElement.classList.toggle("dark", newDark);
				localStorage.setItem("theme", newDark ? "dark" : "light");
			}
			return newDark;
		});
	};

	return (
		<nav className="w-full z-50 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur sticky top-0">
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
									: "text-gray-700 dark:text-gray-300"
							}`}
						>
							{link.name}
						</Link>
					))}
					<button
						aria-label="Toggle dark mode"
						onClick={toggleDark}
						className="ml-2 p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
					>
						{dark ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5A4.5 4.5 0 1112 16.5a4.5 4.5 0 010-9z"
								/>
							</svg>
						)}
					</button>
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
				<div className="flex flex-col gap-2 bg-white/95 dark:bg-black/95 rounded shadow border border-black/10 dark:border-white/10 py-2 mt-2">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`transition-colors font-medium px-2 py-2 rounded hover:bg-primary/10 ${
								pathname === link.href
									? "text-primary"
									: "text-gray-700 dark:text-gray-300"
							}`}
							onClick={() => setMenuOpen(false)}
						>
							{link.name}
						</Link>
					))}
					<button
						aria-label="Toggle dark mode"
						onClick={toggleDark}
						className="mt-2 p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors self-start"
					>
						{dark ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5A4.5 4.5 0 1112 16.5a4.5 4.5 0 010-9z"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
		</nav>
	);
}
