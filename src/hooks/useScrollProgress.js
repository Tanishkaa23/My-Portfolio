import { useEffect, useRef } from "react";

/**
 * Tracks window scroll progress (0-1) in a ref (no re-renders) so it can be
 * read every frame inside the R3F render loop, plus notifies a callback with
 * the index of the section currently most in view (for nav highlighting).
 */
export function useScrollProgress(sectionIds) {
  const progressRef = useRef(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    function update() {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;

      // Determine active section: whichever section's top is closest to
      // (but not past) the viewport's upper third.
      const probe = window.innerHeight * 0.35;
      let idx = 0;
      for (let i = 0; i < els.length; i++) {
        const rect = els[i].getBoundingClientRect();
        if (rect.top <= probe) idx = i;
      }
      activeIndexRef.current = idx;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return { progressRef, activeIndexRef };
}
