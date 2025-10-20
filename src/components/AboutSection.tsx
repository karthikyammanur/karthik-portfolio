"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { 
  SiReact, SiTypescript, SiPython, SiTensorflow, 
  SiPytorch, SiNextdotjs, SiNodedotjs, SiTailwindcss,
  SiGit, SiCplusplus, SiJavascript, SiAmazon 
} from 'react-icons/si';

// Dynamically import the 3D component with no SSR
const MobiusStrip3D = dynamic(() => import('./MobiusStrip3D'), { 
  ssr: false,
  loading: () => (
    <div className="glass-card rounded-xl overflow-hidden mb-8 flex items-center justify-center" style={{ height: '600px' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading 3D Experience...</p>
      </div>
    </div>
  )
});

// Skills data
const skills = [
  { name: "React", icon: SiReact, color: '#61dafb' },
  { name: "TypeScript", icon: SiTypescript, color: '#3178c6' },
  { name: "Python", icon: SiPython, color: '#3776ab' },
  { name: "TensorFlow", icon: SiTensorflow, color: '#ff6f00' },
  { name: "PyTorch", icon: SiPytorch, color: '#ee4c2c' },
  { name: "Next.js", icon: SiNextdotjs, color: '#ffffff' },
  { name: "Node.js", icon: SiNodedotjs, color: '#339933' },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: '#06b6d4' },
  { name: "Git", icon: SiGit, color: '#f05032' },
  { name: "C++", icon: SiCplusplus, color: '#00599c' },
  { name: "JavaScript", icon: SiJavascript, color: '#f7df1e' },
  { name: "AWS", icon: SiAmazon, color: '#ff9900' },
];

// Main AboutSection Component
export default function AboutSection() {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="w-full h-full">
      {/* Large Möbius Strip Canvas - No heading, just the visualization */}
      {isClient && (
        <div className="w-full h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden glass-card shadow-2xl">
          <MobiusStrip3D />
        </div>
      )}
    </div>
  );
}
