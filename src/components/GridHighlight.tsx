"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function GridHighlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const highlightRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (highlightRef.current) {
        // Smooth follow with CSS transform - instant update
        highlightRef.current.style.left = `${e.clientX}px`;
        highlightRef.current.style.top = `${e.clientY}px`;
      }
      
      if (secondaryRef.current) {
        // Secondary light also follows immediately (no delay)
        secondaryRef.current.style.left = `${e.clientX}px`;
        secondaryRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor-following radial gradient spotlight */}
      <div
        ref={highlightRef}
        className="fixed pointer-events-none z-0"
        style={{
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.15) 20%, rgba(255,0,0,0.05) 40%, transparent 60%)',
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Secondary larger glow for softer halo - no transition delay */}
      <div
        ref={secondaryRef}
        className="fixed pointer-events-none z-0"
        style={{
          width: '800px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.08) 30%, transparent 50%)',
          mixBlendMode: 'screen',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
}
