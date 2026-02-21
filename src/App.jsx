import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  ProjectDetail,
  StarsCanvas,
} from "./components";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === "/" && hash === "#work") {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, hash]);
  return null;
};

const HomePage = () => (
  <>
    <ScrollToHash />
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
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

// Match Vite base (e.g. "/My_Portfolio/") so routes work when app is served from a subpath
const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <div className="relative z-0 bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/project/:id"
            element={
              <>
                <Navbar />
                <ProjectDetail />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
