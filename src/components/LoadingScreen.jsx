import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ ready }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simulated progress so the bar always reads as purposeful, but it
    // never blocks: as soon as `ready` flips true we snap to 100 and exit.
    let raf;
    const start = performance.now();
    function tick(t) {
      const elapsed = t - start;
      const simulated = Math.min(92, (elapsed / 900) * 92);
      setProgress((p) => Math.max(p, simulated));
      if (!ready) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  useEffect(() => {
    if (ready) {
      setProgress(100);
      const t = setTimeout(() => setShow(false), 450);
      return () => clearTimeout(t);
    }
  }, [ready]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Loading my little corner of the internet…
            </p>
            <div className="h-px w-56 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-copper"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <span className="font-mono text-[11px] text-muted">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
