"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Check if device is desktop (non-touch)
  useEffect(() => {
    const checkDevice = () => {
      // Check for touch support and screen size
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
      setIsDesktop(!hasTouch && isLargeScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Ultra-fast mouse position update
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  // High-performance trail animation
  const updateTrailPosition = useCallback(() => {
    setTrailPosition(prev => ({
      x: prev.x + (mousePosition.x - prev.x) * 0.15, // Increased from 0.1 for faster trailing
      y: prev.y + (mousePosition.y - prev.y) * 0.15,
    }));
    animationRef.current = requestAnimationFrame(updateTrailPosition);
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Use passive listeners for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    // Start trail animation
    animationRef.current = requestAnimationFrame(updateTrailPosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDesktop, updateMousePosition, updateTrailPosition]);

  // Don't render on mobile/touch devices
  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Trailing halo effect */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen will-change-transform"
        style={{
          transform: `translate3d(${trailPosition.x - 20}px, ${trailPosition.y - 20}px, 0)`,
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x - 6}px, ${mousePosition.y - 6}px, 0)`,
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
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-50 will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0)`,
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
