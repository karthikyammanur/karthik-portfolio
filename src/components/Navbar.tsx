"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderOpen, Mail, Menu, Code, Briefcase } from "lucide-react";

const navLinks = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "Projects", href: "/projects", icon: FolderOpen },
	{ name: "Experience", href: "/experience", icon: Briefcase },
	{ name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl glass-card rounded-2xl px-8 py-4 flex justify-between items-center">
			{/* Logo/Name */}
			<Link
				href="/"
				className="neon-text-subtle font-mono text-xl font-bold tracking-wider select-none uppercase flex items-center gap-3 transition-all duration-300 hover:neon-text"
			>
				<Code className="w-7 h-7" />
				Karthik Yammanur
			</Link>
			{/* Desktop nav */}
			<ul className="hidden md:flex gap-8 font-mono text-base">
				{navLinks.map((link) => {
					const IconComponent = link.icon;
					const isActive = pathname === link.href;
					return (
						<li key={link.name}>
							<Link
								href={link.href}
								className={`uppercase tracking-wide transition-all duration-300 flex items-center gap-2 py-2 ${
									isActive
										? "text-primary neon-text-subtle"
										: "text-gray-300 hover:text-primary hover:neon-text-subtle"
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
				className="md:hidden p-3 rounded transition-all duration-300 hover:text-primary focus:outline-none neon-border-subtle"
				onClick={() => setMenuOpen((v) => !v)}
				aria-label="Toggle menu"
			>
				<Menu className="w-6 h-6 text-white" />
			</button>
			
			{/* Mobile menu dropdown */}
			{menuOpen && (
				<div className="absolute top-full left-0 right-0 mt-2 md:hidden">
					<div className="glass-card rounded-2xl mx-4 py-6">
						{navLinks.map((link) => {
							const IconComponent = link.icon;
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`block px-8 py-3 font-mono text-base uppercase tracking-wide transition-all duration-300 flex items-center gap-3 ${
										isActive
											? "text-primary neon-text-subtle"
											: "text-gray-300 hover:text-primary hover:neon-text-subtle"
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
