import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
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

const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 10) {
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
    document.title = "Dhia Eddine Mandhouj | Full Stack Developer";
  }, []);

  return (
    <>
      <ScrollToHash />
      <div>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <div className="relative z-0">
        <Contact />
      </div>
    </>
  );
};

// Match Vite base (e.g. "/My_Portfolio/") so routes work when app is served from a subpath
const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <div className="relative z-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/project/:id"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center text-secondary">
                    Loading project...
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
    </BrowserRouter>
  );
};

export default App;
