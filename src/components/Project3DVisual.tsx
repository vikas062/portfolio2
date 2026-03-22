import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, TorusKnot, Sphere, Octahedron } from "@react-three/drei";
import * as THREE from "three";

const ProjectObject = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  const getGeometry = () => {
    switch (index % 4) {
      case 0:
        return (
          <TorusKnot args={[1, 0.3, 128, 16]}>
            <MeshDistortMaterial
              color="#3b82f6"
              speed={2}
              distort={0.4}
              radius={1}
            />
          </TorusKnot>
        );
      case 1:
        return (
          <Sphere args={[1, 64, 64]}>
            <MeshWobbleMaterial
              color="#8b5cf6"
              speed={3}
              factor={0.6}
            />
          </Sphere>
        );
      case 2:
        return (
          <Octahedron args={[1, 0]}>
            <meshStandardMaterial
              color="#06b6d4"
              wireframe
            />
          </Octahedron>
        );
      default:
        return (
          <TorusKnot args={[1, 0.2, 100, 16]}>
            <meshStandardMaterial
              color="#f59e0b"
              metalness={0.8}
              roughness={0.2}
            />
          </TorusKnot>
        );
    }
  };

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      {getGeometry()}
    </Float>
  );
};

const Project3DVisual = ({ index }: { index: number }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <ProjectObject index={index} />
      </Canvas>
    </div>
  );
};

export default Project3DVisual;
