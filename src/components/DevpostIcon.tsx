import React from "react";

export default function DevpostIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			role="img"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			{...props}
		>
			<title>Devpost</title>
			<path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zM10.77 8.44v6.853h1.408c1.692 0 2.968-.902 2.968-3.326 0-2.315-1.12-3.527-2.932-3.527z" />
		</svg>
	);
}
