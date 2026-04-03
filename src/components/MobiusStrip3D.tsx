"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Constants
const SPEED = 0.04; // Slowed down significantly
const TRAIL_LENGTH = 15;
const STRIP_SEGMENTS = 100;
const RADIUS = 3;
const WIDTH = 0.8;

// Skills data - simple list
const skills = [
  "Python", "C++", "TypeScript", "JavaScript", "Java", "HTML/CSS",
  "React", "Next.js", "Flutter", "Tailwind CSS", "Flask", "FastAPI",
  "TensorFlow", "NumPy", "MongoDB", "PostgreSQL", "Supabase",
  "Git", "GitHub", "VS Code"
];

// Generate Möbius strip geometry
function generateMobiusGeometry(radius: number, width: number, segments: number) {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  
  const TEXTURE_REPEAT = 4;
  
  for (let i = 0; i <= segments; i++) {
    const u = (i / segments) * Math.PI * 2;
    const texU = (i / segments) * TEXTURE_REPEAT;
    
    for (let j = 0; j <= 1; j++) {
      const v = (j - 0.5) * width;
      const texV = j;
      
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      positions.push(x, y, z);
      uvs.push(texU, texV);
    }
  }
  
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    
    indices.push(a, b, c);
    indices.push(b, d, c);
  }
  
  return { 
    positions: new Float32Array(positions), 
    indices: new Uint16Array(indices),
    uvs: new Float32Array(uvs)
  };
}

// Get position on Möbius strip, with distinct normal calculation
function getMobiusPosition(t: number, radius: number, offset: number = 0, normalOffset: number = 0) {
  const u = t * Math.PI * 2;
  const v = offset;

  // Base point on center strip
  const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
  const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
  const z = v * Math.sin(u / 2);
  
  if (normalOffset === 0) return new THREE.Vector3(x, y, z);
  
  // Calculate Surface Normal
  // Partial derivative w.r.t u
  const dxdu = -Math.sin(u) * (radius + v * Math.cos(u/2)) - 0.5 * v * Math.sin(u/2) * Math.cos(u);
  const dydu = Math.cos(u) * (radius + v * Math.cos(u/2)) - 0.5 * v * Math.sin(u/2) * Math.sin(u);
  const dzdu = 0.5 * v * Math.cos(u/2);
  
  // Partial derivative w.r.t v
  const dxdv = Math.cos(u/2) * Math.cos(u);
  const dydv = Math.cos(u/2) * Math.sin(u);
  const dzdv = Math.sin(u/2);
  
  const U = new THREE.Vector3(dxdu, dydu, dzdu);
  const V = new THREE.Vector3(dxdv, dydv, dzdv);
  
  const normal = new THREE.Vector3().crossVectors(U, V).normalize();
  
  // Push the point outwards along the normal vector
  return new THREE.Vector3(x, y, z).add(normal.multiplyScalar(normalOffset));
}

// Möbius Strip Component with enhanced gradient and metallic effects
function MobiusStrip({ t }: { t: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const TEX_WIDTH = 4096;
  const TEX_HEIGHT = 200;

  const { textCanvas, textCtx, texture } = useMemo(() => {
    if (typeof document === 'undefined') return { textCanvas: null, textCtx: null, texture: null };
    const canvas = document.createElement('canvas');
    canvas.width = TEX_WIDTH;
    canvas.height = TEX_HEIGHT;
    const ctx = canvas.getContext('2d')!;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { textCanvas: canvas, textCtx: ctx, texture: tex };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const data = generateMobiusGeometry(RADIUS, WIDTH, STRIP_SEGMENTS);

    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(data.uvs, 2));
    geo.setIndex(new THREE.BufferAttribute(data.indices, 1));
    geo.computeVertexNormals();

    // Add vertex colors for gradient effect
    const colors = new Float32Array(data.positions.length);
    for (let i = 0; i < data.positions.length / 3; i++) {
      const x = data.positions[i * 3];
      const y = data.positions[i * 3 + 1];

      // Calculate angle around the strip to create gradient
      const angle = Math.atan2(y, x);
      const normalizedAngle = (angle + Math.PI) / (Math.PI * 2); // 0 to 1

      // Gradient from dark gray → darker → dark gray with subtle red warmth
      const gradientPos = Math.abs(Math.sin(normalizedAngle * Math.PI));
      const r = 0.16 + gradientPos * 0.16; // 0.16 to 0.32
      const g = 0.14 + gradientPos * 0.13; // 0.14 to 0.27
      const b = 0.13 + gradientPos * 0.12; // 0.13 to 0.25

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geo;
  }, []);

  const drawSkillTexture = (ctx: CanvasRenderingContext2D, scrollOffset: number, bikePosition: number) => {
    // Clear with very dark red-black background
    ctx.fillStyle = '#0a0202';
    ctx.fillRect(0, 0, TEX_WIDTH, TEX_HEIGHT);

    // Text settings - heavier and bolder font
    ctx.font = '900 80px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const separator = '  ///  ';
    const fullText = skills.join(separator) + separator;

    const charWidth = 48; // Increased spacing to account for thicker font
    const totalWidth = fullText.length * charWidth;
    const offset = (scrollOffset * totalWidth) % totalWidth;

    for (let rep = -1; rep <= 3; rep++) {
      for (let i = 0; i < fullText.length; i++) {
        const x = i * charWidth - offset + rep * totalWidth;
        if (x < -100 || x > TEX_WIDTH + 100) continue;

        const char = fullText[i];

        const bikeX = bikePosition * TEX_WIDTH;
        const distFromBike = Math.abs(x - bikeX);
        const wrapDist = Math.min(distFromBike, Math.abs(x - (bikeX - TEX_WIDTH)), Math.abs(x - (bikeX + TEX_WIDTH)));
        const bikeGlow = Math.max(0, 1 - wrapDist / 400);

        let brightness = 0.6 + 0.2 * Math.sin((x + offset) * 0.008);
        if (bikeGlow > 0) {
          brightness += bikeGlow * 0.6;
        }

        if (char === '/') {
          ctx.fillStyle = `rgba(255, ${Math.floor(50 + bikeGlow * 150)}, ${Math.floor(50 + bikeGlow * 100)}, ${Math.min(1, brightness * 0.5)})`;
        } else if (char === ' ') {
          continue;
        } else {
          ctx.fillStyle = `rgba(255, ${Math.floor(80 + bikeGlow * 175)}, ${Math.floor(80 + bikeGlow * 175)}, ${Math.min(1, brightness)})`;
        }

        ctx.fillText(char, x, TEX_HEIGHT / 2);
      }
    }

    // Horizontal scanlines
    ctx.fillStyle = 'rgba(255, 0, 0, 0.08)';
    for (let y = 0; y < TEX_HEIGHT; y += 8) {
      ctx.fillRect(0, y, TEX_WIDTH, 2);
    }
  };

  const scrollRef = useRef(0);
  const frameCount = useRef(0);

  // Animate emissive glow pulsing along the strip and text scroll
  useFrame((state, delta) => {
    scrollRef.current += delta * 0.04; // Scroll speed
    frameCount.current++;
    
    // Throttle redrawing to every 2nd frame for performance
    if (textCtx && texture && frameCount.current % 2 === 0) {
      // Pass the bike's position `t` (0-1) reversed because UV maps wrap the other way compared to the bike
      drawSkillTexture(textCtx, scrollRef.current, (1 - t) % 1);
      texture.needsUpdate = true;
    }

    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      const intensity = 0.8 + Math.sin(time * 2) * 0.2; 
      materialRef.current.emissiveIntensity = intensity;
    }
  });

  const edge1Points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const tPos = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(tPos, RADIUS, 0.4));
    }
    return points;
  }, []);
  
  const edge2Points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const tPos = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(tPos, RADIUS, -0.4));
    }
    return points;
  }, []);
  
  const centerPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const tPos = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(tPos, RADIUS, 0));
    }
    return points;
  }, []);
  
  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          ref={materialRef}
          color="#2a1515"
          metalness={0.85}
          roughness={0.4}
          emissive="#ffffff"
          emissiveIntensity={1.2}
          emissiveMap={texture || undefined}
          map={texture || undefined}
          side={THREE.DoubleSide}
          vertexColors={true}
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* Enhanced outer edge line - bright red with glow */}
      <Line 
        points={edge1Points} 
        color="#ff0000" 
        lineWidth={4}
        opacity={0.8}
        transparent={true}
      />
      
      {/* Enhanced inner edge line - lighter red */}
      <Line 
        points={edge2Points} 
        color="#ff6666" 
        lineWidth={2.5}
        opacity={0.6}
        transparent={true}
      />
      
      {/* Center line for extra definition */}
      <Line 
        points={centerPoints} 
        color="#ff3333" 
        lineWidth={1.5}
        opacity={0.4}
        transparent={true}
      />
    </group>
  );
}

// Tron Bike Component
function TronBike({ t }: { t: number }) {
  const bikeRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (bikeRef.current) {
      // Add slight normal offset so bike hovers above the surface (0.08 units)
      const pos = getMobiusPosition(t, RADIUS, 0, 0.08);
      // Tangent for the look direction
      const tangentPos = getMobiusPosition(t + 0.01, RADIUS, 0, 0.08); 
      
      bikeRef.current.position.copy(pos);
      bikeRef.current.lookAt(tangentPos);
    }
  });
  
  return (
    <group ref={bikeRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.6]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#cc0000"
          emissive="#cc0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[0.25, 0.12, 0.1]} />
        <meshStandardMaterial
          color="#cc0000"
          emissive="#cc0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      <pointLight
        position={[0, 0, 0.5]}
        color="#ff0000"
        intensity={2.5}
        distance={2}
      />
      
      <pointLight
        position={[0, 0, -0.5]}
        color="#ff3333"
        intensity={1.5}
        distance={1.5}
      />
    </group>
  );
}

// Light Trail Component
function LightTrail({ t }: { t: number }) {
  const points = React.useMemo(() => {
    const trailPoints = [];
    const step = Math.floor(t * 100) / 100;
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const offset = (i / TRAIL_LENGTH) * 0.1;
      const trailT = (step - offset + 1) % 1;
      // Normal offset matches the bike hovering height
      trailPoints.push(getMobiusPosition(trailT, RADIUS, 0, 0.08));
    }
    return trailPoints;
  }, [Math.floor(t * 10)]);
  
  return (
    <Line
      points={points}
      color="#ff0000"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}

// Interactive Grid Floor with Cursor-Activated Lighting
function InteractiveGridFloor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const secondaryLightRef = useRef<THREE.PointLight>(null);
  
  // Track mouse position and smoothly move lights
  useFrame((state) => {
    if (lightRef.current) {
      // Convert 2D mouse to 3D world coordinates
      const targetX = state.mouse.x * 10;
      const targetZ = state.mouse.y * 10;
      const targetVector = new THREE.Vector3(targetX, -2, targetZ);
      
      // Smooth follow with lerp
      lightRef.current.position.lerp(targetVector, 0.1);
    }
    
    if (secondaryLightRef.current) {
      // Secondary light follows with slight delay for softer glow
      const targetX = state.mouse.x * 10;
      const targetZ = state.mouse.y * 10;
      const targetVector = new THREE.Vector3(targetX, -2.5, targetZ);
      
      secondaryLightRef.current.position.lerp(targetVector, 0.08);
    }
  });
  
  return (
    <>
      {/* Enhanced Grid Floor */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshStandardMaterial 
          color="#000000"
          emissive="#ff0000"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Cursor-following spotlight - primary bright light */}
      <pointLight
        ref={lightRef}
        intensity={3}
        distance={8}
        decay={2}
        color="#ff0000"
        position={[0, -2, 0]}
      />
      
      {/* Secondary dimmer light for softer glow halo */}
      <pointLight
        ref={secondaryLightRef}
        intensity={1.5}
        distance={12}
        decay={2}
        color="#ff3333"
        position={[0, -2.5, 0]}
      />
    </>
  );
}

// Main Scene Component
function Scene({ t }: { t: number }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 8, 25]} />
      
      <ambientLight intensity={0.2} color="#330000" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ff0000" />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#cc0000" />
      
      {/* Interactive Grid Floor with cursor lighting */}
      <InteractiveGridFloor />
      
      <MobiusStrip t={t} />
      <TronBike t={t} />
    </>
  );
}

// Global Timer Component
function TickerState({ children, onTick }: { children: React.ReactNode, onTick: (t: number) => void }) {
  useFrame((state, delta) => {
    onTick(delta);
  });
  return <>{children}</>;
}

// Active Text Display Component
function ActiveSkillDisplay({ t }: { t: number }) {
  const [activeSkill, setActiveSkill] = React.useState("");
  
  // Calculate which skill the bike is over based on t and texture mapping
  useEffect(() => {
    // The texture repeats 4 times around the track
    const TEXTURE_REPEAT = 4;
    // Account for reverse wrapping mapping direction
    const mappedT = (1 - t) % 1; 
    
    // Each repeat segment length
    let sectionProgress = (mappedT * TEXTURE_REPEAT) % 1;
    
    // Find absolute position within the skills array
    const skillIndex = Math.floor(sectionProgress * skills.length);
    const newSkill = skills[skillIndex];
    if(newSkill !== activeSkill) {
      setActiveSkill(newSkill);
    }
  }, [t, activeSkill]);

  return (
    <div className="absolute bottom-12 left-8 z-20 pointer-events-none text-left">
      <div className="inline-block relative">
        <div className="absolute inset-0 bg-red-900/20 blur-xl"></div>
        <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.2em] uppercase text-white/90 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] neon-text-subtle relative z-10 transition-all duration-75">
          {activeSkill}
        </p>
      </div>
      <p className="text-red-500/60 font-mono text-xs mt-2 tracking-widest uppercase">Target Lock Engaged</p>
    </div>
  );
}

// Export the 3D Canvas Component
export default function MobiusStrip3D() {
  const [t, setT] = React.useState(0);
  
  const handleTick = React.useCallback((delta: number) => {
    setT((prev) => (prev + delta * SPEED) % 1);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Interaction hint overlay at top center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <p className="text-gray-400 text-sm animate-pulse backdrop-blur-sm bg-black/30 px-4 py-2 border border-red-500/20">
          Drag to rotate • Scroll to zoom
        </p>
      </div>

      <ActiveSkillDisplay t={t} />
      
      <Canvas
        camera={{ position: [6, 4, 8], fov: 60 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
          <TickerState onTick={handleTick}>
            <Scene t={t} />
          </TickerState>
        </React.Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.9}
          minDistance={6}
          maxDistance={8}
          rotateSpeed={0.9}
          enableZoom={true}
        />
      </Canvas>
    </div>
  );
}
