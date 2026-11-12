import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, resume } from "../data/portfolio.js";

export default function Nav({ activeIndex, onNavigate, reducedMotion }) {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
    onNavigate?.(id);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 md:block"
      >
        <ul className="flex items-center gap-1 rounded-full border border-line/80 bg-ink/70 px-2 py-2 backdrop-blur-md">
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => goTo(s.id)}
                aria-current={activeIndex === i ? "page" : undefined}
                className={`relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                  activeIndex === i ? "text-ink" : "text-muted hover:text-paper"
                }`}
              >
                {activeIndex === i && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-copper"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Resume shortcut, desktop */}
      <a
        href={resume.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 top-6 z-50 hidden items-center gap-2 rounded-full border border-line/80 bg-ink/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-paper backdrop-blur-md transition-colors hover:border-copper hover:text-copperLight md:flex"
      >
        Résumé
      </a>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:hidden">
        <span className="font-display text-sm tracking-tight text-paper">TG</span>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line/80 bg-ink/80 backdrop-blur-md"
        >
          <span
            className="block h-px w-4 bg-paper transition-transform duration-200"
            style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
          />
          <span
            className="block h-px w-4 bg-paper transition-transform duration-200"
            style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[70px] z-50 rounded-2xl border border-line/80 bg-ink/95 p-2 backdrop-blur-md md:hidden"
          >
            <ul>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => goTo(s.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider ${
                      activeIndex === i ? "bg-copper text-ink" : "text-paper"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider text-copperLight"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
