import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
}

const SKILLS: Skill[] = [
  // AI/ML
  { name: "LangGraph", category: "AI/ML", position: [-3, 2, 0], color: "#00f5ff" },
  { name: "LangChain", category: "AI/ML", position: [-2, 3, 1], color: "#00f5ff" },
  { name: "AI Agents", category: "AI/ML", position: [-4, 1.5, -1], color: "#00f5ff" },
  { name: "Multi-Agent", category: "AI/ML", position: [-2.5, 1, 1.5], color: "#00f5ff" },
  { name: "Claude Code", category: "AI/ML", position: [-3.5, 3, 0.5], color: "#00f5ff" },
  { name: "Claude Skills", category: "AI/ML", position: [-1.5, 2.5, -0.5], color: "#00f5ff" },
  // Backend
  { name: "Python", category: "Backend", position: [2, 2, 0], color: "#9d00ff" },
  { name: "FastAPI", category: "Backend", position: [3, 1.5, 1], color: "#9d00ff" },
  { name: "REST APIs", category: "Backend", position: [2.5, 3, -0.5], color: "#9d00ff" },
  { name: "Async", category: "Backend", position: [1.5, 1, 0.5], color: "#9d00ff" },
  // Infra
  { name: "Supabase", category: "Infra", position: [-1, -2, 0], color: "#00ff88" },
  { name: "Vercel", category: "Infra", position: [0, -1.5, 1], color: "#00ff88" },
  { name: "Docker", category: "Infra", position: [-2, -1, -0.5], color: "#00ff88" },
  { name: "GitHub Actions", category: "Infra", position: [1, -2.5, 0.5], color: "#00ff88" },
  // Mindset
  { name: "Production-Grade", category: "Mindset", position: [2, -1.5, -1], color: "#ff6600" },
  { name: "Fast Shipping", category: "Mindset", position: [3, -2, 0.5], color: "#ff6600" },
  { name: "AI-First Dev", category: "Mindset", position: [2.5, -0.5, 1], color: "#ff6600" },
];

function SkillOrb({ skill }: { skill: Skill }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y += Math.sin(t * 0.5 + skill.position[0]) * 0.001;
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={skill.position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.8 : 1}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 1 : 0.7}
        />
      </mesh>
      {/* Glow */}
      <mesh position={skill.position} scale={hovered ? 2.5 : 1.5}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.2 : 0.08}
        />
      </mesh>
      {hovered && (
        <Html position={[skill.position[0], skill.position[1] + 0.4, skill.position[2]]} center>
          <div className="px-3 py-1 rounded-lg glass text-xs font-mono text-white whitespace-nowrap border border-white/10">
            {skill.name}
          </div>
        </Html>
      )}
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Connection lines between same-category skills
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < SKILLS.length; i++) {
      for (let j = i + 1; j < SKILLS.length; j++) {
        if (SKILLS[i].category === SKILLS[j].category) {
          positions.push(
            ...SKILLS[i].position,
            ...SKILLS[j].position
          );
        }
      }
    }
    return new Float32Array(positions);
  }, []);

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill) => (
        <SkillOrb key={skill.name} skill={skill} />
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

export default function SkillConstellation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: "100%", height: "500px" }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
