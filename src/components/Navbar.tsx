"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
	{ name: "Home", href: "#hero" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

function HUDCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
	const isTop = position.startsWith("t");
	const isLeft = position.endsWith("l");
	return (
		<div
			className="absolute w-3 h-3 pointer-events-none"
			style={{
				top: isTop ? 0 : undefined,
				bottom: !isTop ? 0 : undefined,
				left: isLeft ? 0 : undefined,
				right: !isLeft ? 0 : undefined,
				borderTop: isTop ? "1px solid rgba(255,0,0,0.5)" : "none",
				borderBottom: !isTop ? "1px solid rgba(255,0,0,0.5)" : "none",
				borderLeft: isLeft ? "1px solid rgba(255,0,0,0.5)" : "none",
				borderRight: !isLeft ? "1px solid rgba(255,0,0,0.5)" : "none",
			}}
		/>
	);
}

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const isHome = pathname === "/";

	useEffect(() => {
		if (!isHome) {
			setActiveSection("");
			return;
		}

		const handleScroll = () => {
			const scrollY = window.scrollY;
			const offset = window.innerHeight * 0.3;
			setScrolled(scrollY > 20);

			for (let i = navLinks.length - 1; i >= 0; i--) {
				const section = document.querySelector(navLinks[i].href) as HTMLElement;
				if (section && section.offsetTop - offset <= scrollY) {
					setActiveSection(navLinks[i].href.replace("#", ""));
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHome]);

	useEffect(() => {
		if (!isHome) {
			setScrolled(true);
		}
	}, [isHome]);

	const handleScrollTo = (e: React.MouseEvent, href: string) => {
		e.preventDefault();
		setMenuOpen(false);

		const targetUrl = href === "#hero" ? "/" : "/" + href;

		if (!isHome) {
			router.push(targetUrl);
			return;
		}

		window.history.pushState(null, "", targetUrl);
		setActiveSection(href.replace("#", ""));
		if (href === "#hero") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				scrolled
					? "bg-black/70 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,0,0.08)]"
					: "bg-transparent"
			}`}
		>
			{/* Bottom border line */}
			<div
				className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
					scrolled ? "opacity-100" : "opacity-0"
				}`}
				style={{
					background: "linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.4) 20%, rgba(255,0,0,0.4) 80%, transparent 100%)",
				}}
			/>

			<div className="px-5 sm:px-8 py-3 sm:py-4 flex items-center justify-between relative">
				{/* HUD corners */}
				<HUDCorner position="tl" />
				<HUDCorner position="tr" />
				<HUDCorner position="bl" />
				<HUDCorner position="br" />

				{/* Left — Monogram + status */}
				<a
					href="#hero"
					onClick={(e) => handleScrollTo(e, "#hero")}
					className="flex items-center gap-3 group"
				>
					{/* Status dot */}
					<div className="relative flex-shrink-0">
						<div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
						<div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-40" />
					</div>
					{/* Monogram */}
					<span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-red-500 transition-colors duration-300">
						KY
					</span>
					<span className="hidden sm:block font-mono text-[10px] text-white/20 tracking-widest">
						SYSTEMS ONLINE
					</span>
				</a>

				{/* Center — Desktop nav links */}
				<ul className="hidden md:flex items-center gap-1">
					{navLinks.map((link, i) => {
						const isActive = activeSection === link.href.replace("#", "");
						return (
							<li key={link.name} className="flex items-center">
								<a
									href={link.href}
									onClick={(e) => handleScrollTo(e, link.href)}
									className={`relative px-4 py-2 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
										isActive
											? "text-red-500"
											: "text-white/40 hover:text-white/80"
									}`}
								>
										<span className="relative flex items-center">
										<span className={`text-red-500/50 mr-1 transition-all duration-300 ${isActive ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden`}>{"//"}</span>
										{link.name}
									</span>
								</a>
								{/* Separator dot */}
								{i < navLinks.length - 1 && (
									<span className="text-red-500/15 mx-1 text-[8px]">&#9670;</span>
								)}
							</li>
						);
					})}
				</ul>

				{/* Right — HUD readout */}
				<div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-white/20 tracking-wider">
					<span className="flex items-center gap-1.5">
						<span className="inline-block w-1.5 h-1.5 bg-red-500/40 rounded-full" />
						SEC::CLEAR
					</span>
					<span className="text-red-500/15">|</span>
					<span>V.2.0</span>
				</div>

				{/* Mobile hamburger */}
				<button
					className="md:hidden p-2 transition-all duration-300 hover:text-primary focus:outline-none"
					onClick={() => setMenuOpen((v) => !v)}
					aria-label="Toggle menu"
				>
					{menuOpen ? (
						<X className="w-6 h-6 text-red-500" />
					) : (
						<Menu className="w-6 h-6 text-white" />
					)}
				</button>
			</div>

			{/* Mobile menu dropdown */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${
					menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="bg-black/90 backdrop-blur-md border-t border-red-500/10 py-2">
					{navLinks.map((link) => {
						const isActive = activeSection === link.href.replace("#", "");
						return (
							<a
								key={link.name}
								href={link.href}
								className={`flex items-center gap-3 px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-300 ${
									isActive
										? "text-red-500 bg-red-500/[0.05] border-l-2 border-red-500"
										: "text-white/40 border-l-2 border-transparent hover:text-white/70 hover:bg-white/[0.02]"
								}`}
								onClick={(e) => handleScrollTo(e, link.href)}
							>
								<span className={`text-red-500/50 transition-all duration-300 ${isActive ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden`}>{"//"}</span>
								{link.name}
							</a>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
