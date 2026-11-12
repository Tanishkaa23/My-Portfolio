import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 820) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

// Rough, best-effort signal for lower-powered devices so we can further
// simplify the scene. Never blocks anything — just a hint.
export function useIsLowPower() {
  const [lowPower] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const cores = navigator.hardwareConcurrency || 8;
    const mem = navigator.deviceMemory || 8;
    return cores <= 4 || mem <= 4;
  });
  return lowPower;
}
