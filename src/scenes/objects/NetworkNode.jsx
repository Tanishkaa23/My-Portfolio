import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NetworkNode({ radius = 0.55, satellites = 4 }) {
  const group = useRef();
  const core = useRef();

  const sats = useMemo(
    () =>
      Array.from({ length: satellites }, (_, i) => {
        const angle = (i / satellites) * Math.PI * 2;
        return { angle, tilt: (i % 2 === 0 ? 1 : -1) * 0.35 };
      }),
    [satellites]
  );

  const satRefs = useRef([]);
  const lineRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.25;
    if (core.current) {
      core.current.material.emissiveIntensity = 0.9 + Math.sin(t * 1.6) * 0.25;
    }
    sats.forEach((s, i) => {
      const a = s.angle + t * 0.5;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      const y = Math.sin(a * 2 + s.tilt) * 0.18;
      const m = satRefs.current[i];
      if (m) m.position.set(x, y, z);
      const line = lineRefs.current[i];
      if (line) {
        const positions = line.geometry.attributes.position;
        positions.setXYZ(1, x, y, z);
        positions.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={group}>
      <mesh ref={core} castShadow>
        <icosahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial
          color="#141922"
          emissive="#c97d4b"
          emissiveIntensity={1}
          metalness={0.4}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      {sats.map((_, i) => (
        <group key={i}>
          <mesh ref={(el) => (satRefs.current[i] = el)}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial
              color="#0d1117"
              emissive="#5b8291"
              emissiveIntensity={1.1}
              toneMapped={false}
            />
          </mesh>
          <line ref={(el) => (lineRefs.current[i] = el)}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, 0, 0, 0])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#5b8291" transparent opacity={0.5} />
          </line>
        </group>
      ))}
    </group>
  );
}
