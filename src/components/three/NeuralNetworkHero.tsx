import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 80;
const MOBILE_NODE_COUNT = 32;
const CONNECTION_DISTANCE = 3.5;

function getNodeCount() {
  if (typeof window === "undefined") return NODE_COUNT;
  return window.innerWidth < 768 ? MOBILE_NODE_COUNT : NODE_COUNT;
}

function NeuralNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const count = useMemo(() => getNodeCount(), []);

  const { positions, velocities, dummy, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      scales[i] = 0.5 + Math.random() * 0.5;
    }
    return { positions, velocities, dummy: new THREE.Object3D(), scales };
  }, [count]);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  // Listen for mouse events
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handlePointerMove);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseWorldX = mouseRef.current.x * viewport.width * 0.5;
    const mouseWorldY = mouseRef.current.y * viewport.height * 0.5;
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      // Update positions
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary wrapping
      for (let axis = 0; axis < 3; axis++) {
        const bound = axis === 2 ? 3 : axis === 1 ? 4 : 6;
        if (Math.abs(positions[i * 3 + axis]) > bound) {
          velocities[i * 3 + axis] *= -1;
        }
      }

      // Mouse repulsion
      const dx = positions[i * 3] - mouseWorldX;
      const dy = positions[i * 3 + 1] - mouseWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.5 && dist > 0.01) {
        const force = 0.02 / dist;
        positions[i * 3] += dx * force;
        positions[i * 3 + 1] += dy * force;
      }

      // Pulse scale
      const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.3;
      const s = scales[i] * pulse * 0.06;

      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    // Build connections
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeometry = linesRef.current.geometry;
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.attributes.position.needsUpdate = true;

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export default function NeuralNetworkHero() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <NeuralNodes />
    </Canvas>
  );
}
