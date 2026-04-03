"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

const HEX_SIZE = 28;
const REVEAL_RADIUS = 4;
const FADE_SPEED = 0.012;

interface HexCell {
  q: number;
  r: number;
  alpha: number;
  decay: number;
  fadeSpeed: number;
  fadeInEnd: number; // decay value where fade-in completes (0 = instant on)
}

function pixelToHex(px: number, py: number): { q: number; r: number } {
  const q = ((2 / 3) * px) / HEX_SIZE;
  const r = ((-1 / 3) * px + (Math.sqrt(3) / 3) * py) / HEX_SIZE;
  const s = -q - r;
  let rq = Math.round(q), rr = Math.round(r), rs = Math.round(s);
  const dq = Math.abs(rq - q), dr = Math.abs(rr - r), ds = Math.abs(rs - s);
  if (dq > dr && dq > ds) rq = -rr - rs;
  else if (dr > ds) rr = -rq - rs;
  return { q: rq, r: rr };
}

function hexToPixel(q: number, r: number): { x: number; y: number } {
  const x = HEX_SIZE * (3 / 2) * q;
  const y = HEX_SIZE * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
  return { x, y };
}

function hexCorner(cx: number, cy: number, i: number): [number, number] {
  const angle = (Math.PI / 180) * (60 * i);
  return [cx + HEX_SIZE * Math.cos(angle), cy + HEX_SIZE * Math.sin(angle)];
}

function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, alpha: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const [hx, hy] = hexCorner(cx, cy, i);
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.06})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255, 0, 0, ${alpha * 0.35})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<Map<string, HexCell>>(new Map());
  const animFrameRef = useRef<number>(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const nextPulseRef = useRef(0);

  // Check if device is desktop (non-touch)
  useEffect(() => {
    const checkDevice = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      const hasMousePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      const isDesktopDevice = isLargeScreen && hasMousePointer && canHover;
      setIsDesktop(isDesktopDevice);
    };

    setTimeout(checkDevice, 100);
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mouse position update — activates nearby hex cells
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }

    if (!isVisibleRef.current) {
      setIsVisible(true);
    }
    
    mousePosRef.current = { x, y };
    isVisibleRef.current = true;

    // Activate hex cells near cursor
    const center = pixelToHex(x, y);
    for (let dq = -REVEAL_RADIUS; dq <= REVEAL_RADIUS; dq++) {
      for (
        let dr = Math.max(-REVEAL_RADIUS, -dq - REVEAL_RADIUS);
        dr <= Math.min(REVEAL_RADIUS, -dq + REVEAL_RADIUS);
        dr++
      ) {
        const q = center.q + dq;
        const r = center.r + dr;
        const dist = Math.max(Math.abs(dq), Math.abs(dr), Math.abs(-dq - dr));
        const intensity = 1 - dist / REVEAL_RADIUS;
        const key = `${q},${r}`;
        const existing = cellsRef.current.get(key);
        if (!existing || existing.alpha * Math.max(0, 1 - existing.decay) < intensity) {
          cellsRef.current.set(key, { q, r, alpha: intensity, decay: 0, fadeSpeed: FADE_SPEED, fadeInEnd: 0 });
        }
      }
    }
  }, []);

  // Canvas resize
  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isDesktop]);

  // Hex reveal animation loop
  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cells = cellsRef.current;

      // Ambient hex pulses — random spots light up periodically
      const now = performance.now();
      if (now > nextPulseRef.current) {
        nextPulseRef.current = now + 3000 + Math.random() * 4000;
        const numPulses = 3 + Math.floor(Math.random() * 4);
        for (let p = 0; p < numPulses; p++) {
          const rx = Math.random() * canvas.width;
          const ry = Math.random() * canvas.height;
          const center = pixelToHex(rx, ry);
          const pulseRadius = 10 + Math.floor(Math.random() * 10);
          for (let dq = -pulseRadius; dq <= pulseRadius; dq++) {
            for (
              let dr = Math.max(-pulseRadius, -dq - pulseRadius);
              dr <= Math.min(pulseRadius, -dq + pulseRadius);
              dr++
            ) {
              const q = center.q + dq;
              const r = center.r + dr;
              const dist = Math.max(Math.abs(dq), Math.abs(dr), Math.abs(-dq - dr));
              const intensity = (1 - dist / pulseRadius) * 1.2;
              const key = `${q},${r}`;
              const existing = cells.get(key);
              if (!existing || existing.alpha * Math.max(0, 1 - existing.decay) < intensity) {
                cells.set(key, { q, r, alpha: intensity, decay: 0, fadeSpeed: 0.002, fadeInEnd: 0.4 });
              }
            }
          }
        }
      }

      // Draw and age all active cells
      for (const [key, cell] of cells) {
        cell.decay += cell.fadeSpeed;
        let effectiveAlpha;
        if (cell.fadeInEnd > 0 && cell.decay < cell.fadeInEnd) {
          // Slow fade in
          const t = cell.decay / cell.fadeInEnd;
          effectiveAlpha = cell.alpha * t * t; // ease-in curve
        } else {
          // Fade out
          const fadeOutProgress = (cell.decay - cell.fadeInEnd) / (1 - cell.fadeInEnd);
          effectiveAlpha = cell.alpha * Math.max(0, 1 - fadeOutProgress);
        }

        const isFadingIn = cell.fadeInEnd > 0 && cell.decay < cell.fadeInEnd;
        if (effectiveAlpha < 0.005 && !isFadingIn) {
          cells.delete(key);
          continue;
        }

        const { x, y } = hexToPixel(cell.q, cell.r);
        drawHex(ctx, x, y, effectiveAlpha);
      }

      // Draw brighter hex under cursor
      const mp = mousePosRef.current;
      if (isVisibleRef.current && mp.x > 0 && mp.y > 0) {
        const center = pixelToHex(mp.x, mp.y);
        const { x: cx, y: cy } = hexToPixel(center.q, center.r);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const [hx, hy] = hexCorner(cx, cy, i);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.12)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseLeave = () => {
      setIsVisible(false);
      isVisibleRef.current = false;
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
      isVisibleRef.current = true;
    };

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
      {/* Hex reveal canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
      />

      {/* Plus sign cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Vertical bar */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: '3px', height: '32px', marginLeft: '-1.5px', marginTop: '-16px', background: '#ffffff', borderRadius: '1.5px' }} />
        {/* Horizontal bar */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: '32px', height: '3px', marginLeft: '-16px', marginTop: '-1.5px', background: '#ffffff', borderRadius: '1.5px' }} />
      </div>
    </>
  );
}
