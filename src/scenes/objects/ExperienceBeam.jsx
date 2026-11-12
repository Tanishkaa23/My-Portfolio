import React, { useMemo } from "react";

export default function ExperienceBeam({ count = 3 }) {
  const points = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: i * 1.6 - ((count - 1) * 1.6) / 2,
      })),
    [count]
  );

  const length = Math.max(1, (count - 1) * 1.6 + 1);

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, length, 12]} />
        <meshStandardMaterial color="#5b8291" emissive="#5b8291" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#0d1117" emissive="#c97d4b" emissiveIntensity={1} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
