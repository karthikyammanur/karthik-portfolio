"use client";
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateTrailPosition = () => {
      setTrailPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Update mouse position
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Update trail position with animation frame
    const trailInterval = setInterval(updateTrailPosition, 16); // ~60fps

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(trailInterval);
    };
  }, [mousePosition.x, mousePosition.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing halo effect */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          transform: `translate(${trailPosition.x - 20}px, ${trailPosition.y - 20}px)`,
          transition: 'none',
        }}
      >
        <div
          className="w-10 h-10 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #ff2e2e 0%, rgba(255, 46, 46, 0.3) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: '#ff2e2e',
            boxShadow: `
              0 0 8px #ff2e2e,
              0 0 16px #ff2e2e,
              0 0 24px rgba(255, 46, 46, 0.4)
            `,
          }}
        />
      </div>

      {/* Outer glow ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-50"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="w-6 h-6 rounded-full border border-red-500/30"
          style={{
            boxShadow: '0 0 12px rgba(255, 46, 46, 0.2)',
          }}
        />
      </div>
    </>
  );
}
