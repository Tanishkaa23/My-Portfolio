import React, { useEffect, useRef } from "react";
import { useCursorApi } from "../context/CursorContext.jsx";

// Desktop-only decorative cursor. Never rendered on touch devices, and it
// never intercepts pointer events (pointer-events: none throughout).
export default function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const api = useCursorApi();
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    function onMove(e) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }
    window.addEventListener("pointermove", onMove);

    let raf;
    function tick() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    const unsub = api.subscribe(({ hovering, label }) => {
      if (ringRef.current) {
        ringRef.current.style.width = hovering ? "64px" : "28px";
        ringRef.current.style.height = hovering ? "64px" : "28px";
        ringRef.current.style.borderColor = hovering ? "#c97d4b" : "rgba(233,231,224,0.5)";
        ringRef.current.style.background = hovering ? "rgba(201,125,75,0.08)" : "transparent";
      }
      if (labelRef.current) {
        labelRef.current.textContent = label || "";
        labelRef.current.style.opacity = hovering && label ? "1" : "0";
      }
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      unsub();
    };
  }, [enabled, api]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-copper"
        style={{ transform: "translate(-100px,-100px)", marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background] duration-200 ease-out"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderColor: "rgba(233,231,224,0.5)",
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        ref={labelRef}
        className="fixed left-0 top-0 whitespace-nowrap rounded-full bg-ink/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper opacity-0 transition-opacity duration-150"
        style={{ marginLeft: 20, marginTop: 20, transform: "translate(-100px,-100px)" }}
      />
    </div>
  );
}
