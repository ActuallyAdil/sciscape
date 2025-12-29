import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface AtomProps {
  position: [number, number, number];
  color: string;
  size: number;
  label?: string;
}

const Atom = ({ position, color, size }: AtomProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
    </mesh>
  );
};

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

const Bond = ({ start, end, color = "#94a3b8" }: BondProps) => {
  const midPoint = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  );

  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  );
  const length = direction.length();
  direction.normalize();

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.08, 0.08, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
    </mesh>
  );
};

interface MoleculeViewerProps {
  molecule: "water" | "methane" | "co2" | "ethanol";
}

const molecules = {
  water: {
    atoms: [
      { position: [0, 0, 0] as [number, number, number], color: "#ef4444", size: 0.4, label: "O" },
      { position: [-0.8, -0.5, 0] as [number, number, number], color: "#f0f0f0", size: 0.25, label: "H" },
      { position: [0.8, -0.5, 0] as [number, number, number], color: "#f0f0f0", size: 0.25, label: "H" },
    ],
    bonds: [
      { start: [0, 0, 0] as [number, number, number], end: [-0.8, -0.5, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [0.8, -0.5, 0] as [number, number, number] },
    ],
  },
  methane: {
    atoms: [
      { position: [0, 0, 0] as [number, number, number], color: "#374151", size: 0.35, label: "C" },
      { position: [0.8, 0.8, 0] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [-0.8, 0.8, 0] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [0, -0.5, 0.9] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [0, -0.5, -0.9] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
    ],
    bonds: [
      { start: [0, 0, 0] as [number, number, number], end: [0.8, 0.8, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [-0.8, 0.8, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [0, -0.5, 0.9] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [0, -0.5, -0.9] as [number, number, number] },
    ],
  },
  co2: {
    atoms: [
      { position: [0, 0, 0] as [number, number, number], color: "#374151", size: 0.35, label: "C" },
      { position: [-1.2, 0, 0] as [number, number, number], color: "#ef4444", size: 0.4, label: "O" },
      { position: [1.2, 0, 0] as [number, number, number], color: "#ef4444", size: 0.4, label: "O" },
    ],
    bonds: [
      { start: [0, 0, 0] as [number, number, number], end: [-1.2, 0, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [1.2, 0, 0] as [number, number, number] },
    ],
  },
  ethanol: {
    atoms: [
      { position: [0, 0, 0] as [number, number, number], color: "#374151", size: 0.35, label: "C" },
      { position: [1.2, 0, 0] as [number, number, number], color: "#374151", size: 0.35, label: "C" },
      { position: [2.0, 0.8, 0] as [number, number, number], color: "#ef4444", size: 0.4, label: "O" },
      { position: [2.8, 0.4, 0] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [-0.6, 0.8, 0] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [-0.6, -0.4, 0.7] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [-0.6, -0.4, -0.7] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [1.5, -0.8, 0.5] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
      { position: [1.5, -0.8, -0.5] as [number, number, number], color: "#f0f0f0", size: 0.2, label: "H" },
    ],
    bonds: [
      { start: [0, 0, 0] as [number, number, number], end: [1.2, 0, 0] as [number, number, number] },
      { start: [1.2, 0, 0] as [number, number, number], end: [2.0, 0.8, 0] as [number, number, number] },
      { start: [2.0, 0.8, 0] as [number, number, number], end: [2.8, 0.4, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [-0.6, 0.8, 0] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [-0.6, -0.4, 0.7] as [number, number, number] },
      { start: [0, 0, 0] as [number, number, number], end: [-0.6, -0.4, -0.7] as [number, number, number] },
      { start: [1.2, 0, 0] as [number, number, number], end: [1.5, -0.8, 0.5] as [number, number, number] },
      { start: [1.2, 0, 0] as [number, number, number], end: [1.5, -0.8, -0.5] as [number, number, number] },
    ],
  },
};

const MoleculeModel = ({ molecule }: MoleculeViewerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const data = molecules[molecule];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {data.bonds.map((bond, i) => (
          <Bond key={`bond-${i}`} start={bond.start} end={bond.end} />
        ))}
        {data.atoms.map((atom, i) => (
          <Atom key={`atom-${i}`} position={atom.position} color={atom.color} size={atom.size} />
        ))}
      </group>
    </Float>
  );
};

export const MoleculeViewer = ({ molecule }: MoleculeViewerProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#22c55e" intensity={0.3} />

      <MoleculeModel molecule={molecule} />

      <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      <Environment preset="studio" />
    </Canvas>
  );
};
