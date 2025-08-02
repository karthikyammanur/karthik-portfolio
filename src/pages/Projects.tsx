"use client";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaGithub } from "react-icons/fa";
import Card from "@/components/Card";

// All projects including featured and additional ones
const allProjects = [
  // Featured Projects (from home page)
  {
    title: "NEWT",
    description:
      "Created a personalized tech news summarization platform powered by a Gemini-based RAG pipeline. Engineered a FastAPI backend with ChromaDB vector search and MongoDB, enabling dynamic topic feeds and summary generation. Designed a modern React frontend with user authentication, likes, and topic filtering for personalized engagement.",
    techStack: ["React", "FastAPI", "Gemini API", "ChromaDB", "MongoDB"],
    githubLink: "https://github.com/karthikyammanur/newt",
    imageSrc: "/newt_image.png",
  },
  {
    title: "ACM Research at UTD",
    description:
      "Researched and implemented VAE and VQGAN models to generate synthetic images of rare astronomical phenomena using the Multimodal Universe dataset. Leveraged TensorFlow, NumPy, and Matplotlib to achieve low reconstruction loss and high visual quality, and compared performance across generative models including DCGAN and StyleGAN to evaluate trade-offs in quality and efficiency.",
    techStack: ["Python", "Google Colab", "TensorFlow", "VAE", "VQGAN"],
    githubLink: "https://github.com/karthikyammanur/acm-celestAI-vae-vqgan",
    imageSrc: "/celestai_image.png",
  },
  {
    title: "Arkos",
    description:
      "Developed an AI-powered energy advisory platform featuring an LSTM model for demand forecasting and a RAG system for document-grounded insights. Integrated Gemini API, PyMuPDF, and ChromaDB within a Flask backend, and built a responsive React frontend with Chart.js visualizations and AI-generated energy recommendations.",
    techStack: ["React", "Flask", "Gemini API", "LSTM", "Chart.js"],
    githubLink: "https://github.com/karthikyammanur/arkos",
    liveLink: "https://www.youtube.com/watch?v=3TiOBKwIfVY",
    imageSrc: "/arkos_image.jpg",
  },
  
  // Additional Projects
  {
    title: "Pocket Secretary",
    description:
      "Pocket Secretary is an AI-powered scheduling assistant that converts casual text or image-based inputs into structured calendar events. Co-developed with a focus on accessibility and ease of use, building a responsive chatbot interface using Figma and Flutter. The assistant leverages Google&apos;s Gemini API to intelligently interpret slang, typos, and natural language. Integrated Supabase for real-time data storage and event syncing across user devices.",
    techStack: ["Flutter", "Figma", "Gemini API", "Supabase", "Dart"],
    githubLink: "https://github.com/karthikyammanur/PocketSecretary",
    liveLink: "https://youtu.be/HN1H2H2MC2E",
    imageSrc: "/psecretary_image.png",
  },
  {
    title: "Sai Meghna Dance School Website",
    description:
      "This is a custom-built full-stack website created for my mom&apos;s Kuchipudi dance school using the MERN stack. The frontend was developed in React and styled with Tailwind CSS, enhanced by animations from Framer Motion and AOS. It includes features like a testimonial carousel, dynamic routing, and a floating chat modal. On the backend, Express and MongoDB handle form submissions and data management. The site is fully mobile-responsive and branded with Indian cultural motifs to reflect the school&apos;s identity.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "Framer Motion"],
    githubLink: "https://github.com/karthikyammanur/sai-meghna-dance-school",
    imageSrc: "/globe.svg",
  },
  {
    title: "SignLang AI – HackUTD 2024",
    description:
      "SignLang AI is a real-time American Sign Language (ASL) translator built for HackUTD 2024. Using TensorFlow and OpenCV, it recognizes all 26 alphabet signs from live webcam input and translates them directly in the browser. The model achieves high accuracy and runs seamlessly within a custom UI, making it accessible for real-time communication and educational use.",
    techStack: ["TensorFlow", "OpenCV", "JavaScript", "Python", "HTML/CSS"],
    githubLink: "https://github.com/karthikyammanur/signlang-ai",
    liveLink: "https://www.youtube.com/watch?v=QW0eGGjECCA&t=13s",
    imageSrc: "/globe.svg",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-full px-8 py-4 mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold"
          >
            <FaCode className="text-primary text-2xl sm:text-3xl" />
            <span className="text-primary">Project Showcase</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            A collection of projects showcasing my expertise in AI, web development, 
            and full-stack solutions. From machine learning models to production applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FaRocket className="text-primary" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub className="text-primary" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Actively Maintained</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
        >
          {allProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="px-4 py-20 lg:py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Interested in collaborating on a project or discussing opportunities? 
              I&apos;m always excited to work on innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#ff00ff] hover:border-pink-400 hover:bg-white/10"
              >
                Get In Touch
                <FaRocket className="text-lg" />
              </motion.a>
              <motion.a
                href="https://github.com/karthikyammanur"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out border border-white/20 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_12px_#ff00ff] hover:border-pink-400 hover:bg-white/10"
              >
                View All Projects
                <FaGithub className="text-lg" />
              </motion.a>
            </div>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
