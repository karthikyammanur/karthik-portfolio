"use client";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          title="Arkos"
          description="AI-powered energy advisory tool combining LSTM forecasting with RAG document analysis."
          techStack={["React", "Flask", "Gemini API", "LSTM", "Chart.js"]}
          githubLink="https://github.com/karthikyammanur/arkos"
          liveLink="#"
        />
        <ProjectCard
          title="NEWT"
          description="AI tech news summarizer using Gemini RAG, vector search, and user preferences."
          techStack={["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"]}
          githubLink="https://github.com/karthikyammanur/newt"
          liveLink="https://newt-ai.vercel.app"
        />
        <ProjectCard
          title="AstroDash"
          description="Space data dashboard for decoding and visualizing satellite telemetry using AI."
          techStack={["Next.js", "Python", "Tailwind", "VAE", "VQGAN"]}
          githubLink="https://github.com/karthikyammanur/astrodash"
          liveLink="#"
        />
        {/* Add more <ProjectCard />s as needed */}
      </div>
    </section>
  );
}
