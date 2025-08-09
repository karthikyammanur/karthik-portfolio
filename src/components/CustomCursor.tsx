"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if device is desktop (non-touch)
  useEffect(() => {
    const checkDevice = () => {
      // More reliable desktop detection - check for mouse capability and screen size
      const isLargeScreen = window.innerWidth >= 1024;
      const hasMousePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      
      // Consider it desktop if it has fine pointer control (mouse) and can hover
      const isDesktopDevice = isLargeScreen && hasMousePointer && canHover;
      
      setIsDesktop(isDesktopDevice);
      console.log('Desktop check:', { isLargeScreen, hasMousePointer, canHover, isDesktopDevice });
    };

    // Initial check with delay to ensure DOM is ready
    setTimeout(checkDevice, 100);
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Ultra-fast mouse position update
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Use passive listeners for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, updateMousePosition]);

  // Don't render on mobile/touch devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x - 6}px, ${mousePosition.y - 6}px, 0)`,
          opacity: isVisible ? 1 : 0,
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
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0)`,
          opacity: isVisible ? 0.5 : 0,
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
