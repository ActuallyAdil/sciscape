import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BallProps {
  gravity: number;
  bounciness: number;
  onUpdate: (position: number, velocity: number) => void;
}

const Ball = ({ gravity, bounciness, onUpdate }: BallProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(0);
  const positionRef = useRef(5);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Apply gravity
    velocityRef.current -= gravity * delta * 10;

    // Update position
    positionRef.current += velocityRef.current * delta * 3;

    // Ground collision
    if (positionRef.current <= 0.5) {
      positionRef.current = 0.5;
      velocityRef.current = -velocityRef.current * bounciness;
    }

    // Ceiling limit
    if (positionRef.current > 8) {
      positionRef.current = 8;
      velocityRef.current = 0;
    }

    meshRef.current.position.y = positionRef.current;
    onUpdate(positionRef.current, velocityRef.current);
  });

  return (
    <mesh ref={meshRef} position={[0, 5, 0]} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const Ground = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e2e8f0" />
    </mesh>
  );
};

interface GravitySimulationProps {
  gravity: number;
  bounciness: number;
  onUpdate: (position: number, velocity: number) => void;
}

export const GravitySimulation = ({ gravity, bounciness, onUpdate }: GravitySimulationProps) => {
  return (
    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} color="#8b5cf6" intensity={0.5} />

      <Ball gravity={gravity} bounciness={bounciness} onUpdate={onUpdate} />
      <Ground />

      <Grid
        args={[20, 20]}
        position={[0, 0.01, 0]}
        cellColor="#94a3b8"
        sectionColor="#64748b"
        fadeDistance={25}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={20}
      />
      <Environment preset="studio" />
    </Canvas>
  );
};
