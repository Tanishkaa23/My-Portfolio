import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ServerStack() {
  const ledRefs = useRef([]);
  const units = 4;

  const ledSeeds = useMemo(
    () => Array.from({ length: units }, () => Math.random() * Math.PI * 2),
    [units]
  );

  useFrame((state) => {
    ledRefs.current.forEach((m, i) => {
      if (!m) return;
      const t = state.clock.elapsedTime * 2 + ledSeeds[i];
      const pulse = 0.5 + 0.5 * Math.sin(t);
      m.material.emissiveIntensity = 0.4 + pulse * 1.4;
    });
  });

  return (
    <group>
      {Array.from({ length: units }).map((_, i) => (
        <group key={i} position={[0, i * 0.32 - (units - 1) * 0.16, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.28, 0.75]} />
            <meshStandardMaterial color="#141922" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh
            ref={(el) => (ledRefs.current[i] = el)}
            position={[0.4, 0, 0.38]}
          >
            <boxGeometry args={[0.06, 0.06, 0.01]} />
            <meshStandardMaterial
              color="#0d1117"
              emissive={i % 2 === 0 ? "#c97d4b" : "#5b8291"}
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
          {/* vents */}
          {[0.2, 0.1, 0, -0.1, -0.2].map((x, j) => (
            <mesh key={j} position={[x, 0, 0.38]}>
              <boxGeometry args={[0.03, 0.16, 0.005]} />
              <meshStandardMaterial color="#05070a" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
