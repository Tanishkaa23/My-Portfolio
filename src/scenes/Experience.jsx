import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, ContactShadows, Preload } from "@react-three/drei";
import CameraRig, { ISLAND_Z } from "./CameraRig.jsx";
import Desk from "./objects/Desk.jsx";
import Laptop from "./objects/Laptop.jsx";
import ServerStack from "./objects/ServerStack.jsx";
import Terminal from "./objects/Terminal.jsx";
import FolderStack from "./objects/FolderStack.jsx";
import NetworkNode from "./objects/NetworkNode.jsx";
import SkillGraph from "./objects/SkillGraph.jsx";
import ProjectCards3D from "./objects/ProjectCards3D.jsx";
import ExperienceBeam from "./objects/ExperienceBeam.jsx";
import InteractiveObject from "./objects/InteractiveObject.jsx";
import { skills, projects, experience, resume } from "../data/portfolio.js";

function AboutIsland({ z }) {
  return (
    <group position={[0, 0.3, z]}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.3, Math.sin(a * 1.5) * 0.4, Math.sin(a) * 1.3]}>
            <icosahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial
              color="#141922"
              emissive={i % 2 === 0 ? "#c97d4b" : "#5b8291"}
              emissiveIntensity={0.9}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Experience({
  onSelectSection,
  onOpenProject,
  progressRef,
  activeSkill,
  onActivateSkill,
  reducedMotion,
  isMobile,
  lowPower,
}) {
  const particleCount = lowPower || isMobile ? 60 : reducedMotion ? 40 : 160;

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, position: [0, 1.1, 3.4], near: 0.1, far: 80 }}
    >
      <color attach="background" args={["#0a0d12"]} />
      <fog attach="fog" args={["#0a0d12", 8, 26]} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.1}
        color="#f2ebe0"
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-2, 1.5, 1]} intensity={6} color="#5b8291" distance={6} decay={2} />
      <pointLight position={[2, 1, -1]} intensity={5} color="#c97d4b" distance={6} decay={2} />

      <Suspense fallback={null}>
        <CameraRig progressRef={progressRef} sectionCount={ISLAND_Z.length} reducedMotion={reducedMotion} />

        <Sparkles
          count={particleCount}
          scale={[14, 6, 34]}
          position={[0, 1, -14]}
          size={2.2}
          speed={reducedMotion ? 0 : 0.25}
          opacity={0.35}
          color="#e0a273"
        />

        {/* ---------------- Hero island ---------------- */}
        <group position={[0, 0, ISLAND_Z[0]]}>
          <Desk />
          <InteractiveObject
            position={[0, 0.02, -0.15]}
            label="Open Projects"
            onSelect={() => onSelectSection("projects")}
            baseScale={0.85}
          >
            <Laptop />
          </InteractiveObject>

          <InteractiveObject
            position={[-1.15, 0.34, -0.35]}
            label="Open Skills"
            onSelect={() => onSelectSection("skills")}
            baseScale={0.62}
          >
            <group rotation={[0, 0.5, 0]}>
              <ServerStack />
            </group>
          </InteractiveObject>

          <InteractiveObject
            position={[1.25, 0.62, -0.15]}
            label="Open About"
            onSelect={() => onSelectSection("about")}
            baseScale={0.5}
          >
            <group rotation={[0, -0.35, 0]}>
              <Terminal />
            </group>
          </InteractiveObject>

          <InteractiveObject
            position={[0.85, 0.06, 0.55]}
            label="View Resume"
            onSelect={() => window.open(resume.url, "_blank", "noopener,noreferrer")}
            baseScale={0.5}
          >
            <FolderStack />
          </InteractiveObject>

          <InteractiveObject
            position={[-0.85, 0.85, 0.45]}
            label="Open Contact"
            onSelect={() => onSelectSection("contact")}
            baseScale={0.7}
          >
            <NetworkNode radius={0.4} satellites={3} />
          </InteractiveObject>

          <ContactShadows position={[0, -0.36, 0]} opacity={0.45} scale={5} blur={2.2} far={2} />
        </group>

        {/* ---------------- About island ---------------- */}
        <AboutIsland z={ISLAND_Z[1]} />

        {/* ---------------- Skills island ---------------- */}
        <group position={[0, 0.4, ISLAND_Z[2]]}>
          <SkillGraph categories={skills.categories} activeId={activeSkill} onActivate={onActivateSkill} />
        </group>

        {/* ---------------- Projects island ---------------- */}
        <group position={[-((projects.length - 1) * 1.9) / 2, 0.3, ISLAND_Z[3]]}>
          <ProjectCards3D projects={projects} onOpen={onOpenProject} />
        </group>

        {/* ---------------- Experience island ---------------- */}
        <group position={[0, 0.3, ISLAND_Z[4]]}>
          <ExperienceBeam count={Math.max(1, experience.length)} />
        </group>

        {/* ---------------- Contact island ---------------- */}
        <group position={[0, 0.5, ISLAND_Z[5]]}>
          <NetworkNode radius={0.7} satellites={5} />
        </group>
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
