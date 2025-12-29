import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Line, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { PhysicsState, PhysicsConfig } from "@/lib/physics-engine";

interface SimulationSceneProps {
  state: PhysicsState;
  config: PhysicsConfig;
  showTrail: boolean;
  showVectors: boolean;
  isPlaying: boolean;
}

const Ball = ({ position, velocity, showVectors }: { position: { x: number; y: number }; velocity: { x: number; y: number }; showVectors: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = position.x;
      meshRef.current.position.y = position.y;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[position.x, position.y, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Velocity vector */}
      {showVectors && (
        <group position={[position.x, position.y, 0]}>
          <Line
            points={[[0, 0, 0], [velocity.x * 0.3, velocity.y * 0.3, 0]]}
            color="#22c55e"
            lineWidth={3}
          />
        </group>
      )}
    </group>
  );
};

const Trail = ({ points }: { points: Array<{ x: number; y: number }> }) => {
  const trailPoints = useMemo(() => {
    return points.map(p => new THREE.Vector3(p.x, p.y, 0));
  }, [points]);

  if (trailPoints.length < 2) return null;

  return (
    <Line
      points={trailPoints}
      color="#8b5cf6"
      lineWidth={2}
      opacity={0.5}
      transparent
    />
  );
};

const Ground = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#e2e8f0" />
    </mesh>
  );
};

const Walls = () => {
  return (
    <group>
      {/* Left wall */}
      <mesh position={[-10, 5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 10, 2]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={0.5} />
      </mesh>
      {/* Right wall */}
      <mesh position={[10, 5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 10, 2]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const HeightMarkers = () => {
  return (
    <group>
      {[2, 4, 6, 8].map((height) => (
        <group key={height}>
          <Line
            points={[[-10, height, 0], [-9.5, height, 0]]}
            color="#94a3b8"
            lineWidth={1}
          />
          <Text
            position={[-9, height, 0]}
            fontSize={0.3}
            color="#64748b"
            anchorX="left"
          >
            {height}m
          </Text>
        </group>
      ))}
    </group>
  );
};

export const PhysicsSimulation = ({ state, config, showTrail, showVectors, isPlaying }: SimulationSceneProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} color="#8b5cf6" intensity={0.3} />

      <Ball 
        position={state.position} 
        velocity={state.velocity} 
        showVectors={showVectors} 
      />
      
      {showTrail && <Trail points={state.trail} />}
      
      <Ground />
      <Walls />
      <HeightMarkers />

      <Grid
        args={[30, 30]}
        position={[0, 0.01, 0]}
        cellColor="#94a3b8"
        sectionColor="#64748b"
        fadeDistance={35}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={8}
        maxDistance={30}
      />
      <Environment preset="studio" />
    </Canvas>
  );
};
