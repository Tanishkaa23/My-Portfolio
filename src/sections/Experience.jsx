import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/portfolio.js";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="Experience"
    >
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          Experience
        </motion.h2>

        <ol className="mt-10 space-y-0">
          {experience.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="relative border-l border-line py-6 pl-7 last:pb-0"
            >
              <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-copper" />
              <p className="font-mono text-[10px] uppercase tracking-wider text-copperLight">
                {e.duration}
              </p>
              <h3 className="mt-1.5 font-display text-xl text-paper">{e.role}</h3>
              <p className="text-sm text-muted">{e.company}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{e.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <li key={t} className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
