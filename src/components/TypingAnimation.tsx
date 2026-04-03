"use client";
import { useEffect, useState } from "react";

const typingPhrases = [
	"computer engineering @ ut dallas • aspiring AI/ML researcher",
];

export default function TypingAnimation() {
	const [displayed, setDisplayed] = useState("");
	const [index, setIndex] = useState(0);
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (index < typingPhrases[0].length) {
			timeout = setTimeout(() => {
				setDisplayed((prev) => prev + typingPhrases[0][index]);
				setIndex(index + 1);
			}, 25);
		}
		return () => clearTimeout(timeout);
	}, [index]);
	return (
		<span className="text-lg sm:text-2xl font-mono text-white min-h-[2.5rem] inline-block">
			{displayed}
			<span className="animate-pulse">|</span>
		</span>
	);
}
