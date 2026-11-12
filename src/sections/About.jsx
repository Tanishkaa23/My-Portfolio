import React from "react";
import { motion } from "framer-motion";
import { about } from "../data/portfolio.js";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="About"
    >
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          {about.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="mt-5 max-w-lg text-balance text-lg leading-relaxed text-muted"
        >
          {about.intro}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2">
          {about.interests.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-panel/90 p-5"
            >
              <p className="font-display text-base text-paper">{item.label}</p>
              <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 font-mono text-xs text-muted"
        >
          {about.note}
        </motion.p>
      </div>
    </section>
  );
}
