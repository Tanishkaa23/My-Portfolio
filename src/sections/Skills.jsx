import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio.js";

export default function Skills({ activeId, onActivate }) {
  return (
    <section
      id="skills"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="Skills"
    >
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          {skills.heading}
        </motion.h2>
        <p className="mt-3 text-muted">{skills.sub}</p>

        <div
          className="mt-10 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Backend system layers"
        >
          {skills.categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeId === cat.id}
              onClick={() => onActivate(activeId === cat.id ? null : cat.id)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeId === cat.id
                  ? "border-copper bg-copper text-ink"
                  : "border-line text-muted hover:border-copper/60 hover:text-paper"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeId || "none"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 min-h-[110px] rounded-2xl border border-line/70 bg-panel/80 p-6"
        >
          {activeId ? (
            (() => {
              const cat = skills.categories.find((c) => c.id === activeId);
              return (
                <>
                  <p className="text-sm text-muted">{cat.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] text-copperLight"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              );
            })()
          ) : (
            <p className="text-sm text-muted">
              Select a layer above — or click a node in the diagram — to see the technologies behind it.
            </p>
          )}
        </motion.div>

        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{skills.tools.label}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skills.tools.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-paper"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
