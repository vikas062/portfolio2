import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Icosahedron, Octahedron, Box, Torus } from "@react-three/drei";
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
      <Icosahedron args={[1, 4]} ref={meshRef}>
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.3}
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </Icosahedron>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          color="#a855f7"
          speed={3}
          distort={0.4}
          radius={0.4}
        />
      </mesh>
    </Float>
  );
};

const CodeVisual = () => {
  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Icosahedron args={[0.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
      </Icosahedron>
    </Float>
  );
};

const BackendVisual = () => {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <group>
        <Box args={[1, 1.2, 0.8]}>
          <meshStandardMaterial
            color="#10b981"
            wireframe
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </Box>
        <Box args={[0.7, 0.9, 0.9]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#10b981" transparent opacity={0.2} />
        </Box>
      </group>
    </Float>
  );
};

const ToolsVisual = () => {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <Torus args={[0.8, 0.2, 16, 100]}>
        <MeshWobbleMaterial
          color="#f97316"
          speed={2}
          factor={0.4}
        />
      </Torus>
      <Box args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#f97316" wireframe />
      </Box>
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
