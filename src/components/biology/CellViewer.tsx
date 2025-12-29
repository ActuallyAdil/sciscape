import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const CellMembrane = () => {
  return (
    <mesh>
      <sphereGeometry args={[3, 64, 64]} />
      <meshPhysicalMaterial
        color="#f8b4b4"
        transparent
        opacity={0.3}
        roughness={0.2}
        transmission={0.5}
        thickness={0.5}
      />
    </mesh>
  );
};

const Nucleus = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Nucleolus */}
      <mesh position={[0.3, 0.2, 0.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#6d28d9" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
};

const Mitochondria = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={position} rotation={rotation}>
        <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
        <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
};

const Ribosome = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.2}>
      <mesh position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.5} metalness={0.2} />
      </mesh>
    </Float>
  );
};

const EndoplasmicReticulum = () => {
  const points = [];
  for (let i = 0; i < 20; i++) {
    const t = (i / 20) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(t) * 1.5 + Math.sin(t * 3) * 0.3,
      Math.sin(t * 2) * 0.5,
      Math.sin(t) * 1.5 + Math.cos(t * 3) * 0.3
    ));
  }

  const curve = new THREE.CatmullRomCurve3(points, true);

  return (
    <mesh>
      <tubeGeometry args={[curve, 100, 0.08, 8, true]} />
      <meshStandardMaterial color="#3b82f6" roughness={0.4} metalness={0.3} />
    </mesh>
  );
};

export const CellViewer = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#f43f5e" intensity={0.3} />
      <pointLight position={[0, 10, 0]} color="#22c55e" intensity={0.3} />

      <CellMembrane />
      <Nucleus />
      <EndoplasmicReticulum />

      {/* Mitochondria scattered around */}
      <Mitochondria position={[1.8, 0.5, 1]} rotation={[0.5, 0.3, 0]} />
      <Mitochondria position={[-1.5, -0.8, 1.2]} rotation={[0.2, -0.5, 0.3]} />
      <Mitochondria position={[0.5, 1.5, -1.5]} rotation={[-0.3, 0.2, 0.5]} />
      <Mitochondria position={[-1.2, 1, -1]} rotation={[0.4, 0.6, -0.2]} />

      {/* Ribosomes scattered */}
      <Ribosome position={[2, 0, 0.5]} />
      <Ribosome position={[-1.8, 0.5, 1]} />
      <Ribosome position={[0.8, -1.5, 1.2]} />
      <Ribosome position={[-0.5, 1.8, -0.8]} />
      <Ribosome position={[1.5, -0.8, -1.5]} />
      <Ribosome position={[-2, -0.5, -0.5]} />
      <Ribosome position={[0, 2, 1]} />
      <Ribosome position={[1, 0.5, 2]} />

      <OrbitControls enablePan={false} minDistance={5} maxDistance={12} autoRotate autoRotateSpeed={0.5} />
      <Environment preset="studio" />
    </Canvas>
  );
};
