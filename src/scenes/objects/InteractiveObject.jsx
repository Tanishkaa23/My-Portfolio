import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursorApi } from "../../context/CursorContext.jsx";
import { damp } from "../../utils/math.js";

/**
 * Generic interactive wrapper: gives any group a gentle hover scale-up,
 * updates the shared cursor label, and calls onSelect on click/tap.
 */
export default function InteractiveObject({
  position = [0, 0, 0],
  label,
  onSelect,
  hoverScale = 1.08,
  baseScale = 1,
  children,
}) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const cursor = useCursorApi();

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = hovered ? baseScale * hoverScale : baseScale;
    const s = damp(group.current.scale.x, target, 8, dt);
    group.current.scale.setScalar(s);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        cursor.set(true, label);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        cursor.set(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      {children}
    </group>
  );
}
