import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";
import { initLenis, scrollToId } from "./lib/lenis";
import { siteMeta } from "./constants";

const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");
      const tryScroll = (attempts = 0) => {
        if (!scrollToId(id) && attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    }
  }, [pathname, hash]);
  return null;
};

const HomePage = () => {
  useEffect(() => {
    document.title = `${siteMeta.fullName} | Full Stack Developer`;
  }, []);

  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Works />
        <Contact />
      </main>
    </>
  );
};

const App = () => {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Preloader />
        <CustomCursor />
        <div className="relative grain">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/project/:id"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center font-mono text-[11px] tracking-[0.22em] uppercase text-mute">
                      Loading project…
                    </div>
                  }
                >
                  <Navbar />
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </MotionConfig>
  );
};

export default App;
