import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { damp } from "../../utils/math.js";

function Card({ project, index, onOpen }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const baseY = Math.sin(index * 1.7) * 0.2;

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = baseY + Math.sin(t * 0.5 + index) * 0.06;
    const targetZ = hovered ? 0.35 : 0;
    group.current.position.z = damp(group.current.position.z, targetZ, 6, dt);
    const targetRotY = hovered ? 0 : Math.sin(t * 0.2 + index) * 0.05;
    group.current.rotation.y = damp(group.current.rotation.y, targetRotY, 6, dt);
  });

  return (
    <group
      ref={group}
      position={[index * 1.9 - (index === 1 ? 0 : 0), baseY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(project);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.9, 0.04]} />
        <meshStandardMaterial color="#141922" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.023]}>
        <planeGeometry args={[1.23, 0.78]} />
        <meshStandardMaterial
          color="#10141b"
          emissive={hovered ? "#c97d4b" : "#5b8291"}
          emissiveIntensity={hovered ? 0.35 : 0.15}
        />
      </mesh>
      <Html
        position={[0, 0, 0.03]}
        transform
        distanceFactor={2.55}
        style={{ pointerEvents: "none", width: "300px" }}
      >
        <div className="select-none px-4 py-3 font-body text-paper">
          <p className="font-mono text-[9px] uppercase tracking-wider text-copperLight">
            0{index + 1}
          </p>
          <p className="mt-1 font-display text-base leading-tight">{project.title}</p>
          <p className="mt-1 line-clamp-2 text-[11px] text-muted">{project.description}</p>
        </div>
      </Html>
    </group>
  );
}

export default function ProjectCards3D({ projects, onOpen }) {
  return (
    <group>
      {projects.map((p, i) => (
        <Card key={p.id} project={p} index={i} onOpen={onOpen} />
      ))}
    </group>
  );
}
