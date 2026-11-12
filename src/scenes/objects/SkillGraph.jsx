import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { damp } from "../../utils/math.js";

const LAYOUT = [
  { x: -1.7, y: 0.6 },
  { x: -0.6, y: -0.9 },
  { x: 0.9, y: -0.85 },
  { x: 1.9, y: 0.55 },
];

function Node({ position, color, active, onEnter, onLeave, onClick, size = 0.12 }) {
  const mesh = useRef();
  useFrame((_, dt) => {
    if (!mesh.current) return;
    const s = damp(mesh.current.scale.x, active ? 1.35 : 1, 10, dt);
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onEnter?.();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onLeave?.();
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial color="#0d1117" emissive={color} emissiveIntensity={1.1} toneMapped={false} />
    </mesh>
  );
}

export default function SkillGraph({ categories, activeId, onActivate }) {
  const [hoverId, setHoverId] = useState(null);
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
    }
  });

  const shown = hoverId || activeId;
  const colors = ["#c97d4b", "#5b8291", "#e0a273", "#8b93a1"];

  return (
    <group ref={group}>
      {/* central core */}
      <mesh castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#141922" emissive="#c97d4b" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>

      {categories.map((cat, i) => {
        const { x, y } = LAYOUT[i % LAYOUT.length];
        const pos = [x, y, 0];
        const isActive = shown === cat.id;
        return (
          <group key={cat.id}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, x, y, 0])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={colors[i % colors.length]} transparent opacity={isActive ? 0.9 : 0.35} />
            </line>
            <Node
              position={pos}
              color={colors[i % colors.length]}
              active={isActive}
              onEnter={() => setHoverId(cat.id)}
              onLeave={() => setHoverId(null)}
              onClick={() => onActivate?.(cat.id)}
            />
            {isActive && (
              <Html position={pos} center distanceFactor={6} style={{ pointerEvents: "none" }}>
                <div className="whitespace-nowrap rounded-full bg-ink/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper border border-line">
                  {cat.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
