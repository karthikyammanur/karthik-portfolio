export const allProjects = [
	{
		title: "Pondr (1st Place @ HackAI 2026)",
		shortDescription: "AI-powered adaptive learning platform utilizing a dynamically evolving knowledge graph to model and personalize user competency.",
		description:
			"AI-powered adaptive learning platform that models user knowledge as a live graph of 15–25 concept nodes, integrating 6 AI/ML systems (Gemini, XGBoost, YouTube API, Tavily, ElevenLabs, Google Calendar) to deliver personalized learning paths. Trained an XGBoost retention model on 1,000 synthetic learner profiles achieving 67% personalization lift over baseline (RMSE: 0.0524), predicting per-concept memory decay using 10 engineered behavioral features and personalized Ebbinghaus forgetting curves. Architected a full-stack app (React, FastAPI, MongoDB) with 35+ REST endpoints, a YouTube snippet pipeline that extracts precise video segments via transcript analysis, and 5 AI learning modes (Feynman, Socratic, adaptive quiz).",
		techStack: ["React", "FastAPI", "MongoDB", "Gemini", "XGBoost", "ElevenLabs", "Tavily", "YouTube API", "Google Calendar"],
		githubLink: "https://github.com/aarohCodes/HackAI2026",
		liveLink: "https://www.youtube.com/watch?v=tXF55DuBK8k",
		imageSrc: "/pondr.jpg",
		award: "1st Place @ HackAI 2026",
	},
	{
		title: "AutoPM (2nd Place @ HackUTD 2025)",
		shortDescription: "A multi-agent Product Management copilot built to automate workflows from idea generation to ticket creation.",
		description:
			"AI-powered Product Management copilot built at HackUTD 2025 that automates end-to-end PM workflows through specialized LangGraph agents. Features 8 intelligent agents powered by Gemini 2.0 Flash for idea generation with data-backed research, user story creation with acceptance criteria, market research and competitor analysis, RICE prioritization, OKR alignment via PDF ingestion, automated stakeholder emails through Gmail API, interactive wireframe generation, and Jira ticket creation. Implementing type-safe state management with Zod validation and context-aware AI assistance that leverages project history for strategic decision-making. Bagged 2ND PLACE among 1200+ participants.",
		techStack: ["LangGraph", "LangChain", "Gemini 2.0", "Next.js", "TypeScript", "MongoDB", "Tailwind", "Auth0", "Jira API", "Gmail API"],
		githubLink: "https://github.com/karthikyammanur/auto-pm-hackutd-2025",
		liveLink: "https://www.youtube.com/watch?v=sNpusFMyFoI",
		imageSrc: "/autopm_image.jpg",
		award: "2nd Place @ HackUTD 2025",
	},
	{
		title: "Matcha (Hacks for Hackers 2026)",
		shortDescription: "An AI-powered matchmaking platform designed to help hackathon participants quickly find their ideal teammates.",
		description:
			"AI-powered hackathon teammate matching platform that helps participants form high-impact teams in minutes. Users paste a Devpost or hackathon link, and Matcha analyzes the event and recommends the most compatible teammates using a hybrid matching system combining algorithmic pre-filtering with Google Gemini reasoning — reducing AI processing by ~95% while preserving match quality. Features in-app chat, hackathon portfolio tracking, and an AI idea generator that proposes demo-ready ideas with scope, feasibility, and skill coverage scores.",
		techStack: ["React", "Flask", "Express", "Gemini", "MongoDB", "Selenium", "BeautifulSoup", "Tailwind"],
		githubLink: "https://github.com/Siriapps/Matcha",
		liveLink: "https://www.youtube.com/watch?v=bx2dYwqAUJI",
		imageSrc: "/matcha.jpg",
	},
	{
		title: "AgentFlow",
		shortDescription: "A secure, scalable deployment platform handling containerized AI agents securely through sandboxing and real-time monitoring.",
		description:
			"Full-stack AI agent deployment platform currently in development, featuring secure sandboxed execution with VM2 and child processes, real-time monitoring, and one-click deployments. Architected with Next.js, Prisma ORM, and GitHub OAuth, implementing strict timeouts, memory limits, and security scanning to safely run untrusted JavaScript and Python code. Built responsive dashboard with Gemini AI chat integration achieving 3-8s response times and modular component architecture for scalable agent management.",
		techStack: ["Next.js", "TypeScript", "Prisma", "NextAuth.js", "Gemini API", "VM2"],
		githubLink: "https://github.com/karthikyammanur/agentflow",
		imageSrc: "/agentflow_image.png",
	},
	{
		title: "EduTube (HackRice 2025)",
		shortDescription: "Interactive study companion extracting semantic questions, timestamps, and notes directly from lecture video content.",
		description:
			"AI-powered lecture companion built at HackRice 2025 that transforms video lectures into interactive study materials. Features semantic search through video content, auto-generated study notes, quiz questions and flashcards, and timestamp navigation. Built with React, Fastify, TwelveLabs for video understanding, and Gemini for content generation, enabling students to efficiently learn from any lecture video.",
		techStack: ["React", "Vite", "TypeScript", "Fastify", "TwelveLabs", "Gemini API", "Google Cloud"],
		githubLink: "https://github.com/karthikyammanur/edutube-hackrice-2025",
		liveLink: "https://www.youtube.com/watch?v=-R1D8gmRfco",
		imageSrc: "/edutube_image.png",
	},
	{
		title: "NEWT",
		shortDescription: "A personalized tech news aggregation platform filtering feeds dynamically with an intelligent RAG generation pipeline.",
		description:
			"Created a personalized tech news summarization platform powered by a Gemini-based RAG pipeline. Engineered a FastAPI backend with ChromaDB vector search and MongoDB, enabling dynamic topic feeds and summary generation. Designed a modern React frontend with user authentication, likes, and topic filtering for personalized engagement.",
		techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
		githubLink: "https://github.com/karthikyammanur/newt",
		imageSrc: "/newt_image.png",
	},
	{
		title: "ACM Research at UTD",
		shortDescription: "Implementation of Generative AI (VAEs and VQGANs) to reliably synthesize low-availability astronomical image data.",
		description:
			"Researched and implemented VAE and VQGAN models to generate synthetic images of rare astronomical phenomena using the Multimodal Universe dataset. Leveraged TensorFlow, NumPy, and Matplotlib to achieve low reconstruction loss and high visual quality, and compared performance across generative models including DCGAN and StyleGAN to evaluate trade-offs in quality and efficiency.",
		techStack: ["Python", "Google Colab", "TensorFlow", "VAE", "VQGAN"],
		githubLink: "https://github.com/karthikyammanur/acm-celestAI-vae-vqgan",
		imageSrc: "/celestai_image.png",
	},
	{
		title: "Arkos (HackAI 2025, UT Dallas)",
		shortDescription: "AI energy advisory system merging document-grounded insights with LSTM modeling to forecast demand effectively.",
		description:
			"Developed an AI-powered energy advisory platform featuring an LSTM model for demand forecasting and a RAG system for document-grounded insights. Integrated Gemini API, PyMuPDF, and ChromaDB within a Flask backend, and built a responsive React frontend with Chart.js visualizations and AI-generated energy recommendations.",
		techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
		githubLink: "https://github.com/karthikyammanur/arkos",
		liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
		imageSrc: "/arkos_image.jpg",
	},
	{
		title: "Pocket Secretary",
		shortDescription: "A streamlined scheduling assistant built in Flutter that digests casual text and images into structured timeline events.",
		description:
			"Pocket Secretary is an AI-powered scheduling assistant that converts casual text or image-based inputs into structured calendar events. Co-developed with a focus on accessibility and ease of use, building a responsive chatbot interface using Figma and Flutter. The assistant leverages Google's Gemini API to intelligently interpret slang, typos, and natural language. Integrated Supabase for real-time data storage and event syncing across user devices.",
		techStack: ["Flutter", "Figma", "Gemini API", "Supabase", "Dart"],
		githubLink: "https://github.com/karthikyammanur/PocketSecretary",
		liveLink: "https://youtu.be/HN1H2H2MC2E",
		imageSrc: "/psecretary_image.jpg",
	},
	{
		title: "Sai Meghna Dance School Website",
		shortDescription: "A complete MERN-stack promotional website constructed for a local dance school featuring responsive booking and routing integration.",
		description:
			"This is a custom-built full-stack website created for my mom's Kuchipudi dance school using the MERN stack. The frontend was developed in React and styled with Tailwind CSS, enhanced by animations from Framer Motion and AOS. It includes features like a testimonial carousel, dynamic routing, and a floating chat modal. On the backend, Express and MongoDB handle form submissions and data management. The site is fully mobile-responsive and branded with Indian cultural motifs to reflect the school's identity.",
		techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "Framer Motion"],
		githubLink: "https://github.com/karthikyammanur/sai-meghna-dance-school",
		imageSrc: "/dance_school_image.jpg",
	},
	{
		title: "SignLang AI (HackUTD 2024)",
		shortDescription: "A browser-integrated computer vision tool translating real-time ASL signs straight from your webcam.",
		description:
			"SignLang AI is a real-time American Sign Language (ASL) translator built for HackUTD 2024. Using TensorFlow and OpenCV, it recognizes all 26 alphabet signs from live webcam input and translates them directly in the browser. The model achieves high accuracy and runs seamlessly within a custom UI, making it accessible for real-time communication and educational use.",
		techStack: ["TensorFlow", "OpenCV", "JavaScript", "Python", "HTML/CSS"],
		githubLink: "https://github.com/Traman2/SignlangAI",
		liveLink: "https://www.youtube.com/watch?v=QW0eGGjECCA&t=13s",
		imageSrc: "/signlang_image.png",
	},
];
