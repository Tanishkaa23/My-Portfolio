import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Terminal() {
  const cursorBlink = useRef();
  const group = useRef();

  useFrame((state) => {
    if (cursorBlink.current) {
      cursorBlink.current.visible = Math.sin(state.clock.elapsedTime * 4) > 0;
    }
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={group}>
      {/* frame */}
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.9, 0.04]} />
        <meshStandardMaterial color="#141922" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.18, 0.78]} />
        <meshStandardMaterial color="#0a0d12" />
      </mesh>
      {/* title bar dots */}
      {[-0.5, -0.42, -0.34].map((x, i) => (
        <mesh key={i} position={[x, 0.33, 0.03]}>
          <circleGeometry args={[0.018, 12]} />
          <meshBasicMaterial color={["#c97d4b", "#5b8291", "#8b93a1"][i]} toneMapped={false} />
        </mesh>
      ))}
      {/* text lines */}
      {[0.16, 0.06, -0.04, -0.14].map((y, i) => (
        <mesh key={i} position={[-0.48 + i * 0.02, y, 0.03]}>
          <planeGeometry args={[0.55 - i * 0.1, 0.03]} />
          <meshBasicMaterial color={i === 0 ? "#5b8291" : "#e0a273"} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* blinking cursor block */}
      <mesh ref={cursorBlink} position={[-0.44, -0.22, 0.03]}>
        <planeGeometry args={[0.05, 0.03]} />
        <meshBasicMaterial color="#c97d4b" toneMapped={false} />
      </mesh>
    </group>
  );
}
