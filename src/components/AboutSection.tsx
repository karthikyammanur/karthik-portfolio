"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D component with no SSR
const MobiusStrip3D = dynamic(() => import('./MobiusStrip3D'), {
  ssr: false,
  loading: () => (
    <div className="glass-card overflow-hidden mb-8 flex items-center justify-center" style={{ height: '600px' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading 3D Experience...</p>
      </div>
    </div>
  )
});

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
        <div className="w-full h-full overflow-hidden glass-card shadow-2xl">
          <MobiusStrip3D />
        </div>
      )}
    </div>
  );
}
