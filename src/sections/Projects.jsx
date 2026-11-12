import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio.js";

// function ProjectImage({ project }) {
//   const [failed, setFailed] = useState(!project.image);
//   if (failed) {
//     return (
//       <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-line bg-ink">
//         <span className="font-display text-2xl tracking-tightest2 text-line">
//           {project.title
//             .split(" ")
//             .map((w) => w[0])
//             .slice(0, 2)
//             .join("")}
//         </span>
//       </div>
//     );
//   }
//   return (
//     <img
//       src={project.image}
//       alt={`${project.title} preview`}
//       onError={() => setFailed(true)}
//       className="aspect-video w-full rounded-lg border border-line object-cover"
//       loading="lazy"
//     />
//   );
// }

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
      className="group rounded-2xl border border-line/70 bg-panel/80 p-5 transition-colors hover:border-copper/60"
    >
      {/* <ProjectImage project={project} /> */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-copperLight">
        0{index + 1}
      </p>
      <h3 className="mt-1 font-display text-xl text-paper">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li key={t} className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-muted">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={() => onOpen(project)}
          className="font-mono text-xs uppercase tracking-wider text-paper underline decoration-line underline-offset-4 transition-colors hover:decoration-copper"
        >
          Details
        </button>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-copperLight"
          >
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-copperLight"
          >
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects({ onOpen }) {
  return (
    <section
      id="projects"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-14"
      aria-label="Projects"
    >
      <div className="max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl tracking-tightest2 text-paper md:text-5xl"
        >
          Selected work
        </motion.h2>
        <p className="mt-3 max-w-md text-muted">
          {/* <code className="font-mono text-copperLight">src/data/portfolio.js</code>. */}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
