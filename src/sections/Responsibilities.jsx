import React from "react";
import { motion } from "framer-motion";
import { responsibilities } from "../data/portfolio.js";

export default function Responsibilities() {
  return (
    <section
      id="responsibilities"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="Position of Responsibility"
    >
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          {responsibilities.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-muted"
        >
          {responsibilities.intro}
        </motion.p>

        <div className="mt-10 space-y-5">
          {responsibilities.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-line/80 bg-panel/80 p-5 md:p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-display text-xl text-paper">{item.title}</h3>
                {item.period && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-copperLight">
                    {item.period}
                  </span>
                )}
              </div>
              {item.organization && <p className="mt-1 text-sm text-copperLight">{item.organization}</p>}
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
