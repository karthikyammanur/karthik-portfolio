"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  SiReact, SiTypescript, SiPython, SiTensorflow, 
  SiNextdotjs, SiTailwindcss, SiFlutter, SiFlask,
  SiGit, SiCplusplus, SiJavascript, SiMongodb,
  SiPostgresql, SiSupabase, SiNumpy, SiHtml5,
  SiFastapi, SiGithub
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

// Constants
const SPEED = 0.3;
const TRAIL_LENGTH = 15;
const STRIP_SEGMENTS = 100;
const RADIUS = 3;
const WIDTH = 0.8;

// Skills data - organized by category
const skills = [
  // Languages
  { name: "Python", icon: SiPython, color: '#3776ab' },
  { name: "C++", icon: SiCplusplus, color: '#00599c' },
  { name: "TypeScript", icon: SiTypescript, color: '#3178c6' },
  { name: "JavaScript", icon: SiJavascript, color: '#f7df1e' },
  { name: "Java", icon: FaJava, color: '#007396' },
  { name: "HTML/CSS", icon: SiHtml5, color: '#e34f26' },
  
  // Frameworks & Tools
  { name: "React", icon: SiReact, color: '#61dafb' },
  { name: "Next.js", icon: SiNextdotjs, color: '#ffffff' },
  { name: "Flutter", icon: SiFlutter, color: '#02569b' },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: '#06b6d4' },
  { name: "Flask", icon: SiFlask, color: '#ffffff' },
  { name: "FastAPI", icon: SiFastapi, color: '#009688' },
  
  // Libraries & APIs
  { name: "TensorFlow", icon: SiTensorflow, color: '#ff6f00' },
  { name: "NumPy", icon: SiNumpy, color: '#013243' },
  
  // Databases
  { name: "MongoDB", icon: SiMongodb, color: '#47a248' },
  { name: "PostgreSQL", icon: SiPostgresql, color: '#4169e1' },
  { name: "Supabase", icon: SiSupabase, color: '#3ecf8e' },
  
  // Developer Tools
  { name: "Git", icon: SiGit, color: '#f05032' },
  { name: "GitHub", icon: SiGithub, color: '#ffffff' },
  { name: "VS Code", icon: VscCode, color: '#007acc' },
];

// Generate Möbius strip geometry
function generateMobiusGeometry(radius: number, width: number, segments: number) {
  const positions: number[] = [];
  const indices: number[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const u = (i / segments) * Math.PI * 2;
    
    for (let j = 0; j <= 1; j++) {
      const v = (j - 0.5) * width;
      
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      
      positions.push(x, y, z);
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
  
  return { positions: new Float32Array(positions), indices: new Uint16Array(indices) };
}

// Get position on Möbius strip
function getMobiusPosition(t: number, radius: number, offset: number = 0) {
  const u = t * Math.PI * 2;
  const v = offset;
  
  const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
  const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
  const z = v * Math.sin(u / 2);
  
  return new THREE.Vector3(x, y, z);
}

// Get tangent vector
function getMobiusTangent(t: number, radius: number) {
  const u = t * Math.PI * 2;
  const du = 0.01;
  
  const p1 = getMobiusPosition(t, radius, 0);
  const p2 = getMobiusPosition(t + du, radius, 0);
  
  return p2.clone().sub(p1).normalize();
}

// Möbius Strip Component with enhanced gradient and metallic effects
function MobiusStrip() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const geometry = useMemo(() => generateMobiusGeometry(RADIUS, WIDTH, STRIP_SEGMENTS), []);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  
  // Animate emissive glow pulsing along the strip
  useFrame((state) => {
    if (materialRef.current) {
      const t = state.clock.getElapsedTime();
      const intensity = 0.2 + Math.sin(t * 2) * 0.15; // Pulse between 0.2 and 0.35
      materialRef.current.emissiveIntensity = intensity;
    }
  });
  
  React.useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(geometry.positions, 3));
      geometryRef.current.setIndex(new THREE.BufferAttribute(geometry.indices, 1));
      geometryRef.current.computeVertexNormals();
      
      // Add vertex colors for gradient effect
      const colors = new Float32Array(geometry.positions.length);
      for (let i = 0; i < geometry.positions.length / 3; i++) {
        const x = geometry.positions[i * 3];
        const y = geometry.positions[i * 3 + 1];
        
        // Calculate angle around the strip to create gradient
        const angle = Math.atan2(y, x);
        const normalizedAngle = (angle + Math.PI) / (Math.PI * 2); // 0 to 1
        
        // Gradient from dark red → black → dark red (emphasizes infinity loop)
        const gradientPos = Math.abs(Math.sin(normalizedAngle * Math.PI));
        const r = 0.06 + gradientPos * 0.14; // 0.06 to 0.2
        const g = 0.03 + gradientPos * 0.02; // 0.03 to 0.05
        const b = 0.03 + gradientPos * 0.02; // 0.03 to 0.05
        
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [geometry]);
  
  const edge1Points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const t = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(t, RADIUS, 0.4));
    }
    return points;
  }, []);
  
  const edge2Points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const t = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(t, RADIUS, -0.4));
    }
    return points;
  }, []);
  
  const centerPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= STRIP_SEGMENTS; i++) {
      const t = i / STRIP_SEGMENTS;
      points.push(getMobiusPosition(t, RADIUS, 0));
    }
    return points;
  }, []);
  
  return (
    <group>
      <mesh ref={meshRef}>
        <bufferGeometry ref={geometryRef} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0d0d0d"
          metalness={0.95}
          roughness={0.2}
          emissive="#330000"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
          vertexColors={true}
          envMapIntensity={1.5}
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
      const pos = getMobiusPosition(t, RADIUS, 0);
      const tangent = getMobiusTangent(t, RADIUS);
      
      bikeRef.current.position.copy(pos);
      bikeRef.current.lookAt(pos.clone().add(tangent));
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
      trailPoints.push(getMobiusPosition(trailT, RADIUS, 0));
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

// Skills Icon Component with hover effects
function SkillIcon({ skill, index, total }: { skill: typeof skills[0], index: number, total: number }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const t = index / total;
  const position = getMobiusPosition(t, RADIUS, 0.5);
  
  return (
    <Html position={[position.x, position.y, position.z]} center>
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon container with hover glow effect */}
        <div 
          className={`glass-card p-2 backdrop-blur-md transition-all duration-300 ${
            isHovered 
              ? 'neon-border scale-110 shadow-[0_0_20px_rgba(255,0,0,0.6)]' 
              : 'neon-border-subtle'
          }`}
          style={{ 
            width: '48px', 
            height: '48px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: isHovered ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,0,0.5)'
          }}
        >
          <skill.icon 
            className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]' : ''}`}
            style={{ color: skill.color }} 
          />
        </div>
        
        {/* Skill name label on hover */}
        {isHovered && (
          <div 
            className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 
                       bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-md 
                       neon-border whitespace-nowrap z-50
                       animate-[fadeIn_0.2s_ease-in-out]"
          >
            <span className="text-sm font-medium neon-text">
              {skill.name}
            </span>
            {/* Arrow pointing down */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 
                         w-0 h-0 border-l-4 border-r-4 border-t-4 
                         border-l-transparent border-r-transparent border-t-red-500/80"
            />
          </div>
        )}
      </div>
    </Html>
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
function Scene() {
  const [t, setT] = React.useState(0);
  
  useFrame((state, delta) => {
    setT((prev) => (prev + delta * SPEED) % 1);
  });
  
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 8, 25]} />
      
      <ambientLight intensity={0.2} color="#330000" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ff0000" />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#cc0000" />
      
      {/* Interactive Grid Floor with cursor lighting */}
      <InteractiveGridFloor />
      
      <MobiusStrip />
      <TronBike t={t} />
      <LightTrail t={t} />
      
      {skills.map((skill, index) => (
        <SkillIcon key={skill.name} skill={skill} index={index} total={skills.length} />
      ))}
    </>
  );
}

// Export the 3D Canvas Component
export default function MobiusStrip3D() {
  return (
    <div className="relative w-full h-full">
      {/* Interaction hint overlay at top center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <p className="text-gray-400 text-sm animate-pulse backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full border border-red-500/20">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
      
      <Canvas
        camera={{ position: [6, 4, 8], fov: 60 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop="demand"
        performance={{ min: 0.5 }}
      >
        <React.Suspense fallback={null}>
          <Scene />
        </React.Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={6}
          maxDistance={8}
          rotateSpeed={0.7}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

export { skills };
