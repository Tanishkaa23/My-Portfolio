import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FolderStack() {
  const lid = useRef();

  useFrame((state) => {
    if (lid.current) {
      lid.current.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <group rotation={[-0.15, 0, 0]}>
      {/* back panel */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.66, 0.02]} />
        <meshStandardMaterial color="#c97d4b" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* front flap, slightly open */}
      <mesh ref={lid} position={[0, -0.33, 0.15]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.66, 0.02]} />
        <meshStandardMaterial color="#e0a273" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* papers peeking out */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.02 + i * 0.02, -0.06 + i * 0.01]}>
          <boxGeometry args={[0.72, 0.5, 0.01]} />
          <meshStandardMaterial color="#e9e7e0" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
