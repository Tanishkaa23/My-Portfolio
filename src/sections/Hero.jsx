import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio.js";

export default function Hero({ onExplore }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-24 md:px-14 md:pb-28"
      aria-label="Introduction"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="max-w-2xl"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-copperLight">
          {profile.location} · Available for opportunities
        </p>
        <h1 className="font-display text-[13vw] leading-[0.95] tracking-tightest2 text-paper sm:text-6xl md:text-7xl">
          {profile.greeting}
        </h1>
        <p className="mt-5 max-w-md font-mono text-sm text-muted md:text-base">
          {profile.subGreeting}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={onExplore}
            className="group relative overflow-hidden rounded-full bg-copper px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Explore
          </button>
          <p className="font-mono text-[11px] text-muted">{profile.hint}</p>
        </div>
      </motion.div>
    </section>
  );
}
