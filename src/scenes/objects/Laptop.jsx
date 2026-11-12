import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Laptop({ screenOpen = 1.15 }) {
  const screen = useRef();

  useFrame((state) => {
    if (screen.current) {
      screen.current.material.emissiveIntensity =
        1.1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12;
    }
  });

  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 1.1]} />
        <meshStandardMaterial color="#1b212b" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.045, 0.15]}>
        <boxGeometry args={[0.55, 0.005, 0.35]} />
        <meshStandardMaterial color="#0f131a" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Screen hinge group */}
      <group position={[0, 0.04, -0.53]} rotation={[-screenOpen, 0, 0]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[1.6, 1.05, 0.05]} />
          <meshStandardMaterial color="#1b212b" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh ref={screen} position={[0, 0.55, 0.028]}>
          <planeGeometry args={[1.42, 0.86]} />
          <meshStandardMaterial
            color="#0d1117"
            emissive="#c97d4b"
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
        {/* faux code lines */}
        {[0.32, 0.2, 0.08, -0.04, -0.16].map((y, i) => (
          <mesh key={i} position={[-0.35 + (i % 2) * 0.05, 0.55 + y, 0.03]}>
            <planeGeometry args={[0.5 - i * 0.06, 0.03]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#e0a273" : "#5b8291"} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
