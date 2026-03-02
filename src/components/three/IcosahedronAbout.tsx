import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#9d00ff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.03}
        />
      </mesh>
    </>
  );
}

export default function IcosahedronAbout() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%", minHeight: "300px" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <RotatingIcosahedron />
    </Canvas>
  );
}
