"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderOpen, Mail, Menu, Code } from "lucide-react";

const navLinks = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "Projects", href: "/projects", icon: FolderOpen },
	{ name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl flex justify-between items-center px-8 py-4 rounded-full bg-[#111]/30 backdrop-blur-md border border-white/10 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/30 hover:border-pink-400/40 transition-all duration-300">
			{/* Logo/Name */}
			<Link
				href="/"
				className="text-white font-mono text-xl font-bold tracking-wider select-none uppercase flex items-center gap-3"
			>
				<Code className="w-7 h-7 text-primary" />
				Karthik Yammanur
			</Link>
			{/* Desktop nav */}
			<ul className="hidden md:flex gap-8 text-gray-300 font-mono text-base">
				{navLinks.map((link) => {
					const IconComponent = link.icon;
					return (
						<li key={link.name}>
							<Link
								href={link.href}
								className={`uppercase tracking-wide transition-colors hover:text-primary flex items-center gap-2 py-2 ${
									pathname === link.href
										? "text-primary"
										: "text-gray-300"
								}`}
							>
								<IconComponent className="w-5 h-5" />
								{link.name}
							</Link>
						</li>
					);
				})}
			</ul>
			{/* Hamburger for mobile */}
			<button
				className="md:hidden p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
				onClick={() => setMenuOpen((v) => !v)}
				aria-label="Toggle menu"
			>
				<Menu className="w-6 h-6 text-white" />
			</button>
			
			{/* Mobile menu dropdown */}
			{menuOpen && (
				<div className="absolute top-full left-0 right-0 mt-2 md:hidden">
					<div className="bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-2xl mx-4 py-6 shadow-lg">
						{navLinks.map((link) => {
							const IconComponent = link.icon;
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`block px-8 py-3 font-mono text-base uppercase tracking-wide transition-colors hover:text-primary flex items-center gap-3 ${
										pathname === link.href
											? "text-primary"
											: "text-gray-300"
									}`}
									onClick={() => setMenuOpen(false)}
								>
									<IconComponent className="w-5 h-5" />
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
