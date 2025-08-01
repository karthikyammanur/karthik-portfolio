"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderOpen, Mail, Menu, Code } from "lucide-react";

const navLinks = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "About", href: "/about", icon: User },
	{ name: "Projects", href: "/projects", icon: FolderOpen },
	{ name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl flex justify-between items-center px-6 py-2 rounded-full bg-[#111]/30 backdrop-blur-md border border-white/10 shadow-lg">
			{/* Logo/Name */}
			<Link
				href="/"
				className="text-white font-mono text-lg font-bold tracking-wider select-none uppercase flex items-center gap-2"
			>
				<Code className="w-6 h-6 text-cyan-400" />
				Karthik
			</Link>
			{/* Desktop nav */}
			<ul className="hidden md:flex gap-6 text-gray-300 font-mono text-sm">
				{navLinks.map((link) => {
					const IconComponent = link.icon;
					return (
						<li key={link.name}>
							<Link
								href={link.href}
								className={`uppercase tracking-wide transition-colors hover:text-cyan-400 flex items-center gap-2 ${
									pathname === link.href
										? "text-cyan-400"
										: "text-gray-300"
								}`}
							>
								<IconComponent className="w-4 h-4" />
								{link.name}
							</Link>
						</li>
					);
				})}
			</ul>
			{/* Hamburger for mobile */}
			<button
				className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
				onClick={() => setMenuOpen((v) => !v)}
				aria-label="Toggle menu"
			>
				<Menu className="w-5 h-5 text-white" />
			</button>
			
			{/* Mobile menu dropdown */}
			{menuOpen && (
				<div className="absolute top-full left-0 right-0 mt-2 md:hidden">
					<div className="bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-2xl mx-4 py-4 shadow-lg">
						{navLinks.map((link) => {
							const IconComponent = link.icon;
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`block px-6 py-2 font-mono text-sm uppercase tracking-wide transition-colors hover:text-cyan-400 flex items-center gap-3 ${
										pathname === link.href
											? "text-cyan-400"
											: "text-gray-300"
									}`}
									onClick={() => setMenuOpen(false)}
								>
									<IconComponent className="w-4 h-4" />
									{link.name}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</nav>
	);
}
