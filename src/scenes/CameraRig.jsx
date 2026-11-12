import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { damp } from "../utils/math.js";

// One waypoint per section, in the same order as data/portfolio.js `sections`.
export const ISLAND_Z = [0, -6, -12, -18, -24, -30];
const X_OFFSET = [0, -1.15, 1.1, -1, 1, 0];

export function buildWaypoints() {
  return ISLAND_Z.map((z, i) => ({
    cam: new THREE.Vector3(X_OFFSET[i], i === 0 ? 1.05 : 1.3, z + 3.3),
    look: new THREE.Vector3(X_OFFSET[i] * 0.4, i === 0 ? 0.25 : 0.4, z),
  }));
}

export default function CameraRig({ progressRef, sectionCount, reducedMotion }) {
  const { camera } = useThree();
  const waypoints = useMemo(buildWaypoints, []);
  const lookTarget = useRef(new THREE.Vector3(0, 0.25, 0));
  const tmpCam = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    const p = progressRef.current * (sectionCount - 1);
    const i0 = Math.min(sectionCount - 2, Math.floor(p));
    const i1 = i0 + 1;
    const f = p - i0;

    tmpCam.current.lerpVectors(waypoints[i0].cam, waypoints[i1].cam, f);
    tmpLook.current.lerpVectors(waypoints[i0].look, waypoints[i1].look, f);

    // subtle mouse parallax, disabled for reduced motion
    let px = 0,
      py = 0;
    if (!reducedMotion) {
      px = state.pointer.x * 0.18;
      py = state.pointer.y * 0.08;
    }

    const lambda = reducedMotion ? 30 : 4.2;
    camera.position.x = damp(camera.position.x, tmpCam.current.x + px, lambda, dt);
    camera.position.y = damp(camera.position.y, tmpCam.current.y + py, lambda, dt);
    camera.position.z = damp(camera.position.z, tmpCam.current.z, lambda, dt);

    lookTarget.current.lerp(tmpLook.current, reducedMotion ? 1 : Math.min(1, dt * 4.2));
    camera.lookAt(lookTarget.current);
  });

  return null;
}
