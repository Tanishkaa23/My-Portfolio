import React from "react";
import { motion } from "framer-motion";

export default function ScrollHint({ visible }) {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Scroll</span>
      <motion.div
        className="h-8 w-px bg-gradient-to-b from-copper to-transparent"
        animate={{ scaleY: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
