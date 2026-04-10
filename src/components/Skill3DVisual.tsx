import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const BrainVisual = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.3}
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const CodeVisual = () => {
  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#3b82f6" wireframe emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    </Float>
  );
};

const BackendVisual = () => {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <group>
        <mesh>
          <boxGeometry args={[1, 1.2, 0.8]} />
          <meshStandardMaterial color="#10b981" wireframe emissive="#10b981" emissiveIntensity={0.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.7, 0.9, 0.9]} />
          <meshStandardMaterial color="#10b981" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const ToolsVisual = () => {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <torusGeometry args={[0.8, 0.2, 16, 100]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#f97316" wireframe />
      </mesh>
    </Float>
  );
};

const Skill3DVisual = ({ index }: { index: number }) => {
  const getVisual = () => {
    switch (index) {
      case 0: return <BrainVisual />;
      case 1: return <CodeVisual />;
      case 2: return <BackendVisual />;
      case 3: return <ToolsVisual />;
      default: return <BrainVisual />;
    }
  };

  return (
    <div className="absolute top-0 right-0 w-48 h-48 z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        {getVisual()}
      </Canvas>
    </div>
  );
};

export default Skill3DVisual;
