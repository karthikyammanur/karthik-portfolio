"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function GridHighlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const highlightRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentPosRef.current = { x: e.clientX, y: e.clientY };
      
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const { x, y } = currentPosRef.current;
        
        if (highlightRef.current) {
          highlightRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
        }
        
        if (secondaryRef.current) {
          secondaryRef.current.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor-following radial gradient spotlight */}
      <div
        ref={highlightRef}
        className="fixed pointer-events-none z-0 will-change-transform"
        style={{
          width: '600px',
          height: '600px',
          left: 0,
          top: 0,
          background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.15) 20%, rgba(255,0,0,0.05) 40%, transparent 60%)',
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Secondary larger glow for softer halo */}
      <div
        ref={secondaryRef}
        className="fixed pointer-events-none z-0 will-change-transform"
        style={{
          width: '800px',
          height: '800px',
          left: 0,
          top: 0,
          background: 'radial-gradient(circle, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.08) 30%, transparent 50%)',
          mixBlendMode: 'screen',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
}
