import React from "react";
import { motion } from "framer-motion";
import { profile, socials, resume } from "../data/portfolio.js";

const links = [
  { label: "Email", href: socials.email, display: profile.email },
  { label: "GitHub", href: socials.github, display: socials.github.replace("https://", "") },
  { label: "LinkedIn", href: socials.linkedin, display: socials.linkedin.replace("https://", "") },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="Contact"
    >
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          Let's talk
        </motion.h2>
        <p className="mt-4 max-w-md text-muted">
          Open to backend and full-stack roles. The fastest way to reach me is email.
        </p>

        <div className="mt-10 divide-y divide-line/70 overflow-hidden rounded-2xl border border-line/70 bg-panel/80">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-ink/60"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-copperLight">
                  {l.label}
                </span>
                <span className="mt-1 block font-display text-lg text-paper">{l.display}</span>
              </span>
              <span
                aria-hidden="true"
                className="text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-copperLight"
              >
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-paper hover:border-copper hover:text-copperLight"
          >
            View résumé
          </a>
          <a
            href={resume.url}
            download
            className="rounded-full bg-copper px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink"
          >
            Download résumé
          </a>
        </div>

        <p className="mt-16 font-mono text-[11px] text-muted">
          Designed &amp; built by {profile.name} — React, Three.js, React Three Fiber.
        </p>
      </div>
    </section>
  );
}
