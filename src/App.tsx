import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CommandPalette } from "./components/layout/CommandPalette";
import { NotFound } from "./components/layout/NotFound";
import { SectionRail } from "./components/layout/SectionRail";
import { Hero } from "./components/hero/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Arsenal } from "./components/sections/Arsenal";
import { RelationshipGraph } from "./components/sections/RelationshipGraph";
import { Experience } from "./components/sections/Experience";
import { Credentials } from "./components/sections/Credentials";
import { Contact } from "./components/sections/Contact";
import { Blog } from "./components/sections/Blog";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";
import { useActiveSection } from "./hooks/useActiveSection";
import { useSectionRouting } from "./hooks/useSectionRouting";
import { useCommandHotkey } from "./hooks/useHotkeys";
import { useRoute } from "./lib/router";
import { HOME_TITLE, setPageMeta } from "./lib/seo";
import { BootScreen } from "./components/layout/BootScreen";
import { BootContext, shouldShowBoot } from "./lib/boot-context";
import { installSpotlight } from "./lib/spotlight";

const ProjectDetail = lazy(() => import("./components/project/ProjectDetail").then((m) => ({ default: m.ProjectDetail })));
const RecruiterView = lazy(() => import("./components/resume/RecruiterView").then((m) => ({ default: m.RecruiterView })));
const PostView = lazy(() => import("./components/blog/PostView").then((m) => ({ default: m.PostView })));
const ResumeView = lazy(() => import("./components/resume/ResumeView").then((m) => ({ default: m.ResumeView })));


function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Arsenal />
      <RelationshipGraph />
      <Experience />
      <Credentials />
      <Blog />
      <Contact />
    </>
  );
}

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24">
      <span className="label-mono animate-pulse text-text-3">Loading module…</span>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const onHome = route.name === "home";
  const { activeId, scrolled, progress } = useActiveSection(onHome);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [booting, setBooting] = useState(shouldShowBoot);

  useEffect(() => installSpotlight(), []);
  const togglePalette = useCallback(() => setPaletteOpen((o) => !o), []);

  useCommandHotkey(togglePalette);
  useSectionRouting(activeId, onHome);

  useEffect(() => {
    if (onHome) setPageMeta({ title: HOME_TITLE, path: window.location.pathname });
    if (route.name === "not-found") document.title = "Not found — Paulson Alex Fernandes";
  }, [onHome, route.name]);

  const key = route.name === "project" ? `project-${route.id}` : route.name === "post" ? `post-${route.slug}` : route.name;

  return (
    <BootContext.Provider value={!booting}>
    <MotionConfig reducedMotion="user">
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <a href="#main" className="skip-link no-print">
        Skip to content
      </a>
      <div className="page-backdrop" aria-hidden="true">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
        <div className="grain" />
      </div>
      <div className="cursor-glow" aria-hidden="true" />
      {onHome && <SectionRail activeId={activeId} />}
      <Navbar activeId={activeId} scrolled={scrolled} progress={progress} onOpenPalette={() => setPaletteOpen(true)} onHome={onHome} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={key}
          tabIndex={-1}
          className="outline-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ErrorBoundary resetKey={key}>
            <Suspense fallback={<PageFallback />}>
              {route.name === "home" && <Home />}
              {route.name === "project" && <ProjectDetail id={route.id} />}
              {route.name === "resume" && <ResumeView />}
              {route.name === "recruiter" && <RecruiterView />}
              {route.name === "post" && <PostView slug={route.slug} />}
              {route.name === "not-found" && <NotFound />}
            </Suspense>
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </MotionConfig>
    </BootContext.Provider>
  );
}
