"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { galleryImages, locations, locationTree, isGroup, type Location, type LocationItem } from "@/data/gallery";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Folder, FolderOpen, ChevronDown, ChevronRight as ChevronR } from "lucide-react";
import Link from "next/link";

// ── Boot Sequence ────────────────────────────────────────────────────────────

const bootLines = [
	"> ACCESSING RESTRICTED FILES...",
	"> AUTHORIZATION: ██████████",
	"> DECRYPTING PERSONNEL ARCHIVE...",
	"> STATUS: ACCESS GRANTED",
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
	const [visibleLines, setVisibleLines] = useState<string[]>([]);
	const [currentLine, setCurrentLine] = useState(0);
	const [currentChar, setCurrentChar] = useState(0);
	const [typing, setTyping] = useState("");

	useEffect(() => {
		if (currentLine >= bootLines.length) {
			const timeout = setTimeout(onComplete, 600);
			return () => clearTimeout(timeout);
		}

		const line = bootLines[currentLine];
		if (currentChar < line.length) {
			const timeout = setTimeout(() => {
				setTyping((prev) => prev + line[currentChar]);
				setCurrentChar((c) => c + 1);
			}, 20);
			return () => clearTimeout(timeout);
		} else {
			setVisibleLines((prev) => [...prev, line]);
			setTyping("");
			setCurrentChar(0);
			setCurrentLine((l) => l + 1);
		}
	}, [currentLine, currentChar, onComplete]);

	return (
		<div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
			<div className="font-mono text-sm sm:text-base space-y-2 px-6 max-w-lg">
				{visibleLines.map((line, i) => (
					<div
						key={i}
						className={
							line.includes("ACCESS GRANTED")
								? "text-red-500 neon-text-subtle"
								: "text-red-500/70"
						}
					>
						{line}
					</div>
				))}
				{currentLine < bootLines.length && (
					<div className="text-red-500/70">
						{typing}
						<span className="animate-pulse">▮</span>
					</div>
				)}
			</div>
		</div>
	);
}

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
	images,
	currentIndex,
	onClose,
	onNext,
	onPrev,
}: {
	images: typeof galleryImages;
	currentIndex: number;
	onClose: () => void;
	onNext: () => void;
	onPrev: () => void;
}) {
	const image = images[currentIndex];

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onNext();
			if (e.key === "ArrowLeft") onPrev();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [onClose, onNext, onPrev]);

	return (
		<div
			className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
			onClick={onClose}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/60 hover:text-red-500 transition-colors z-10"
			>
				<X className="w-6 h-6 sm:w-8 sm:h-8" />
			</button>

			<button
				onClick={(e) => { e.stopPropagation(); onPrev(); }}
				className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-500 transition-colors z-10"
			>
				<ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
			</button>

			<div
				className="max-w-[90vw] max-h-[85vh] relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={image.src}
					alt=""
					className="max-w-full max-h-[85vh] object-contain"
				/>
				<div className="absolute bottom-0 left-0 right-0 text-center py-3 font-mono text-xs text-white/40">
					{currentIndex + 1} / {images.length}
				</div>
			</div>

			<button
				onClick={(e) => { e.stopPropagation(); onNext(); }}
				className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-500 transition-colors z-10"
			>
				<ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
			</button>
		</div>
	);
}

// ── Gallery Image ────────────────────────────────────────────────────────────

function GalleryImage({ src, onClick }: { src: string; onClick: () => void }) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	return (
		<div
			className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer"
			onClick={onClick}
		>
			<div
				className={`relative overflow-hidden border border-red-500/10 transition-all duration-300 group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(255,0,0,0.15)] ${
					!loaded ? "bg-red-500/5 min-h-[200px]" : ""
				}`}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					ref={imgRef}
					src={src}
					alt=""
					loading="lazy"
					onLoad={() => setLoaded(true)}
					className={`w-full block transition-all duration-500 ${
						loaded ? "opacity-100" : "opacity-0"
					} group-hover:scale-[1.03] group-hover:brightness-110`}
				/>
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,0,0,0.03)_2px,rgba(255,0,0,0.03)_3px)]" />
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(255,0,0,0.08)_100%)]" />
			</div>
		</div>
	);
}

// ── Folder Sidebar ───────────────────────────────────────────────────────────

function FolderButton({
	label,
	count,
	isActive,
	indent,
	onClick,
}: {
	label: string;
	count: number;
	isActive: boolean;
	indent?: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2.5 py-2 sm:py-2.5 font-mono text-xs sm:text-sm transition-all duration-200 text-left w-full ${
				indent ? "px-6" : "px-3"
			} ${
				isActive
					? "text-red-500 bg-red-500/10 border-l-2 border-red-500 shadow-[inset_0_0_20px_rgba(255,0,0,0.05)]"
					: "text-white/40 border-l-2 border-transparent hover:text-white/70 hover:bg-white/[0.02] hover:border-red-500/30"
			}`}
		>
			{isActive ? (
				<FolderOpen className="w-4 h-4 flex-shrink-0" />
			) : (
				<Folder className="w-4 h-4 flex-shrink-0" />
			)}
			<span className="uppercase tracking-wider truncate">{label}</span>
			<span className="ml-auto text-[10px] opacity-40 flex-shrink-0">{count}</span>
		</button>
	);
}

function FolderSidebar({
	activeLocation,
	onSelect,
}: {
	activeLocation: Location;
	onSelect: (loc: Location) => void;
}) {
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ Texas: true });

	const toggleGroup = (group: string) =>
		setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));

	return (
		<div className="flex flex-col gap-0.5">
			<div className="font-mono text-[10px] sm:text-xs text-white/20 uppercase tracking-widest px-3 py-2 mb-1">
				FILE://ARCHIVE/
			</div>
			{locationTree.map((item) => {
				if (isGroup(item)) {
					const expanded = expandedGroups[item.group] ?? false;
					const groupCount = item.children.reduce(
						(sum, child) => sum + galleryImages.filter((img) => img.location === child.id).length,
						0
					);
					const hasActiveChild = item.children.some((c) => c.id === activeLocation);
					return (
						<div key={item.group}>
							<button
								onClick={() => toggleGroup(item.group)}
								className={`flex items-center gap-2.5 px-3 py-2 sm:py-2.5 font-mono text-xs sm:text-sm transition-all duration-200 text-left w-full border-l-2 ${
									hasActiveChild
										? "text-red-500/80 border-red-500/40"
										: "text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.02] hover:border-red-500/30"
								}`}
							>
								{expanded ? (
									<ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
								) : (
									<ChevronR className="w-3.5 h-3.5 flex-shrink-0" />
								)}
								<span className="uppercase tracking-wider truncate">{item.group}</span>
								<span className="ml-auto text-[10px] opacity-40 flex-shrink-0">{groupCount}</span>
							</button>
							{expanded &&
								item.children.map((child) => {
									const count = galleryImages.filter((img) => img.location === child.id).length;
									return (
										<FolderButton
											key={child.id}
											label={child.label}
											count={count}
											isActive={activeLocation === child.id}
											indent
											onClick={() => onSelect(child.id)}
										/>
									);
								})}
						</div>
					);
				}
				const count = galleryImages.filter((img) => img.location === item.id).length;
				return (
					<FolderButton
						key={item.id}
						label={item.label}
						count={count}
						isActive={activeLocation === item.id}
						onClick={() => onSelect(item.id)}
					/>
				);
			})}
		</div>
	);
}

// ── Mobile Folder Selector ───────────────────────────────────────────────────

function MobileFolderSelector({
	activeLocation,
	onSelect,
}: {
	activeLocation: Location;
	onSelect: (loc: Location) => void;
}) {
	const [expandedGroup, setExpandedGroup] = useState<string | null>("Texas");

	return (
		<div className="flex flex-col gap-2 pb-2">
			{locationTree.map((item) => {
				if (isGroup(item)) {
					const expanded = expandedGroup === item.group;
					const hasActiveChild = item.children.some((c) => c.id === activeLocation);
					return (
						<div key={item.group}>
							<button
								onClick={() => setExpandedGroup(expanded ? null : item.group)}
								className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border w-full text-left ${
									hasActiveChild
										? "border-red-500/40 text-red-500/80 bg-red-500/5"
										: "border-white/10 text-white/40 hover:border-red-500/30 hover:text-white/60"
								}`}
							>
								{expanded ? (
									<ChevronDown className="w-3.5 h-3.5" />
								) : (
									<ChevronR className="w-3.5 h-3.5" />
								)}
								{item.group}
							</button>
							{expanded && (
								<div className="flex gap-2 overflow-x-auto pb-1 pt-2 pl-4 scrollbar-none">
									{item.children.map((child) => {
										const isActive = activeLocation === child.id;
										const count = galleryImages.filter((img) => img.location === child.id).length;
										return (
											<button
												key={child.id}
												onClick={() => onSelect(child.id)}
												className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
													isActive
														? "border-red-500/60 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
														: "border-white/10 text-white/40 hover:border-red-500/30 hover:text-white/60"
												}`}
											>
												{isActive ? (
													<FolderOpen className="w-3.5 h-3.5" />
												) : (
													<Folder className="w-3.5 h-3.5" />
												)}
												{child.label}
												<span className="text-[10px] opacity-40">{count}</span>
											</button>
										);
									})}
								</div>
							)}
						</div>
					);
				}
				const isActive = activeLocation === item.id;
				const count = galleryImages.filter((img) => img.location === item.id).length;
				return (
					<button
						key={item.id}
						onClick={() => onSelect(item.id)}
						className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
							isActive
								? "border-red-500/60 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
								: "border-white/10 text-white/40 hover:border-red-500/30 hover:text-white/60"
						}`}
					>
						{isActive ? (
							<FolderOpen className="w-3.5 h-3.5" />
						) : (
							<Folder className="w-3.5 h-3.5" />
						)}
						{item.label}
						<span className="text-[10px] opacity-40">{count}</span>
					</button>
				);
			})}
		</div>
	);
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ClassifiedPage() {
	const [booted, setBooted] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const [activeLocation, setActiveLocation] = useState<Location>(locations[0].id);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	useEffect(() => {
		if (booted) {
			requestAnimationFrame(() => setFadeIn(true));
		}
	}, [booted]);

	const filteredImages = galleryImages.filter(
		(img) => img.location === activeLocation
	);

	const activeLabel = locations.find((l) => l.id === activeLocation)?.label ?? "";

	const openLightbox = useCallback((index: number) => {
		setLightboxIndex(index);
		document.body.style.overflow = "hidden";
	}, []);

	const closeLightbox = useCallback(() => {
		setLightboxIndex(null);
		document.body.style.overflow = "";
	}, []);

	const nextImage = useCallback(() => {
		setLightboxIndex((prev) =>
			prev !== null ? (prev + 1) % filteredImages.length : null
		);
	}, [filteredImages.length]);

	const prevImage = useCallback(() => {
		setLightboxIndex((prev) =>
			prev !== null
				? (prev - 1 + filteredImages.length) % filteredImages.length
				: null
		);
	}, [filteredImages.length]);

	useEffect(() => {
		if (sessionStorage.getItem("classified-booted")) {
			setBooted(true);
		}
	}, []);

	const handleBootComplete = useCallback(() => {
		sessionStorage.setItem("classified-booted", "true");
		setBooted(true);
	}, []);

	if (!booted) {
		return <BootSequence onComplete={handleBootComplete} />;
	}

	return (
		<div
			className={`min-h-screen transition-opacity duration-700 ${
				fadeIn ? "opacity-100" : "opacity-0"
			}`}
		>
			{/* Header */}
			<div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-red-500 transition-colors mb-6"
				>
					<ArrowLeft className="w-4 h-4" />
					RETURN TO MAIN TERMINAL
				</Link>

				<div className="flex items-center gap-4 sm:gap-6 mb-6">
					<span className="font-mono text-sm sm:text-base text-red-500/40 tracking-widest flex-shrink-0">//</span>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold neon-text-subtle flex-shrink-0">Personal Archive</h1>
					<div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent"></div>
				</div>
				<p className="text-sm sm:text-base text-red-200/50 font-mono tracking-tight mb-6">You just found a collection of my favourite pictures</p>
			</div>

			{/* Mobile folder selector */}
			<div className="lg:hidden max-w-[90rem] mx-auto px-4 sm:px-6 pb-4">
				<MobileFolderSelector
					activeLocation={activeLocation}
					onSelect={setActiveLocation}
				/>
			</div>

			{/* Main content: sidebar + gallery */}
			<div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				<div className="flex gap-6 lg:gap-8">
					{/* Sidebar - desktop only */}
					<aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 sticky top-24 self-start">
						<div className="glass-card neon-border-subtle p-2 sm:p-3">
							<FolderSidebar
								activeLocation={activeLocation}
								onSelect={setActiveLocation}
							/>
						</div>
					</aside>

					{/* Gallery area */}
					<div className="flex-1 min-w-0">
						{/* Breadcrumb / current folder */}
						<div className="flex items-center justify-between mb-4">
							<div className="font-mono text-xs text-white/30">
								<span className="text-white/15">ARCHIVE /</span>{" "}
								<span className="text-red-500/60">{activeLabel.toUpperCase()}</span>
							</div>
							<div className="font-mono text-xs text-white/20">
								{filteredImages.length} FILES
							</div>
						</div>

						{/* Masonry grid */}
						<div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
							{filteredImages.map((image, index) => (
								<GalleryImage
									key={image.src}
									src={image.src}
									onClick={() => openLightbox(index)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Lightbox — portaled to body so it escapes main/footer stacking context */}
			{lightboxIndex !== null &&
				createPortal(
					<Lightbox
						images={filteredImages}
						currentIndex={lightboxIndex}
						onClose={closeLightbox}
						onNext={nextImage}
						onPrev={prevImage}
					/>,
					document.body
				)}
		</div>
	);
}
