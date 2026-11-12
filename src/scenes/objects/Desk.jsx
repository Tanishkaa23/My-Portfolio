import React from "react";

export default function Desk({ width = 3.2, depth = 1.8 }) {
  return (
    <group position={[0, -0.34, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[width, 0.06, depth]} />
        <meshStandardMaterial color="#141922" metalness={0.3} roughness={0.55} />
      </mesh>
      {/* legs */}
      {[
        [-width / 2 + 0.1, -0.4, -depth / 2 + 0.1],
        [width / 2 - 0.1, -0.4, -depth / 2 + 0.1],
        [-width / 2 + 0.1, -0.4, depth / 2 - 0.1],
        [width / 2 - 0.1, -0.4, depth / 2 - 0.1],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshStandardMaterial color="#0d1117" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
