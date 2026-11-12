import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-line bg-panel p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="project-modal-title" className="font-display text-2xl text-paper">
                {project.title}
              </h3>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:border-copper hover:text-copperLight"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

            {project.problem && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-copperLight">
                  Problem it solves
                </p>
                <p className="mt-1.5 text-sm text-paper">{project.problem}</p>
              </div>
            )}

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-muted">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-copper"
                >
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-copper px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink"
                >
                  Live demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
