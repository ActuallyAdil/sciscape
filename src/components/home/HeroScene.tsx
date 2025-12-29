import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const AnimatedSphere = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const OrbitRing = ({ radius, color, rotationSpeed }: { radius: number; color: string; rotationSpeed: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

const Electron = ({ radius, speed, offset }: { radius: number; speed: number; offset: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
    </mesh>
  );
};

export const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
      <pointLight position={[10, -10, 10]} color="#22c55e" intensity={0.5} />

      {/* Central atom */}
      <AnimatedSphere position={[0, 0, 0]} color="#8b5cf6" speed={0.5} />

      {/* Orbit rings */}
      <OrbitRing radius={1.8} color="#60a5fa" rotationSpeed={0.5} />
      <OrbitRing radius={2.5} color="#22c55e" rotationSpeed={-0.3} />
      <OrbitRing radius={3.2} color="#f43f5e" rotationSpeed={0.2} />

      {/* Electrons */}
      <Electron radius={1.8} speed={2} offset={0} />
      <Electron radius={1.8} speed={2} offset={Math.PI} />
      <Electron radius={2.5} speed={1.5} offset={0.5} />
      <Electron radius={2.5} speed={1.5} offset={Math.PI + 0.5} />
      <Electron radius={3.2} speed={1} offset={1} />
      <Electron radius={3.2} speed={1} offset={Math.PI + 1} />
      <Electron radius={3.2} speed={1} offset={Math.PI * 0.5 + 1} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};
