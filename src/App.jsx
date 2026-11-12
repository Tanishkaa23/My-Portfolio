import React, { useEffect, useMemo, useState } from "react";
import { CursorProvider } from "./context/CursorContext.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Nav from "./components/Nav.jsx";
import SoundToggle from "./components/SoundToggle.jsx";
import ScrollHint from "./components/ScrollHint.jsx";
import Experience from "./scenes/Experience.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Responsibilities from "./sections/Responsibilities.jsx";
import ExperienceSection from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";
import ProjectModal from "./sections/ProjectModal.jsx";
import { useScrollProgress } from "./hooks/useScrollProgress.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { useIsMobile, useIsLowPower } from "./hooks/useIsMobile.js";
import { sections } from "./data/portfolio.js";

const SECTION_IDS = sections.map((s) => s.id);

export default function App() {
  const [ready, setReady] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [canvasError, setCanvasError] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const lowPower = useIsLowPower();

  const { progressRef, activeIndexRef } = useScrollProgress(SECTION_IDS);
  const [activeIndex, setActiveIndex] = useState(0);

  // Cheap poller to sync the ref-based active section into React state for
  // the nav highlight, without subscribing the whole tree to scroll events.
  useEffect(() => {
    let raf;
    function tick() {
      setActiveIndex((prev) => (prev === activeIndexRef.current ? prev : activeIndexRef.current));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndexRef]);

  useEffect(() => {
    // Never block the visitor for long: minimum feels intentional, but caps out fast.
    const minTimer = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(minTimer);
  }, []);

  const goToSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <CursorProvider>
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      <LoadingScreen ready={ready} />
      <CustomCursor enabled={!isMobile} />

      {!canvasError && (
        <div className="canvas-fixed" aria-hidden="true">
          <ErrorBoundary onError={() => setCanvasError(true)}>
            <Experience
              onSelectSection={goToSection}
              onOpenProject={setActiveProject}
              progressRef={progressRef}
              activeSkill={activeSkill}
              onActivateSkill={setActiveSkill}
              reducedMotion={reducedMotion}
              isMobile={isMobile}
              lowPower={lowPower}
            />
          </ErrorBoundary>
        </div>
      )}
      {canvasError && (
        <div className="canvas-fixed bg-ink" aria-hidden="true">
          <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_20%,#1f2732,transparent_60%)]" />
        </div>
      )}

      <Nav activeIndex={activeIndex} onNavigate={() => {}} reducedMotion={reducedMotion} />
      <SoundToggle />
      <ScrollHint visible={activeIndex === 0} />

      <main id="main" className="relative z-10">
        <Hero onExplore={() => goToSection("about")} />
        <About />
        <Skills activeId={activeSkill} onActivate={setActiveSkill} />
        <Projects onOpen={setActiveProject} />
        <Responsibilities />
        <ExperienceSection />
        <Contact />
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </CursorProvider>
  );
}

// Minimal error boundary so a WebGL/Three failure never takes down the
// whole page — the DOM content (real portfolio content) keeps working.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("3D scene failed to render:", error);
    this.props.onError?.();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
