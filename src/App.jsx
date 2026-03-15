import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

const HomePage = () => (
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
              <>
                <Navbar />
                <ProjectDetail />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
