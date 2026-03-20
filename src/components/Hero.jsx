import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

const COMPUTER_LOAD_TIMEOUT_MS = 8000;

const ROLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Architect",
  "UI/UX Enthusiast",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          );
        },
        deleting ? speed / 2 : speed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words, speed, pause]);

  return text;
}

function ComputerFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[520px] h-[520px] sm:w-[620px] sm:h-[620px] rounded-2xl bg-primary/20" />
    </div>
  );
}

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const role = useTypewriter(ROLES);

  const onLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setShowFallback(true);
    }, COMPUTER_LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915eff]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <div
        className={`${styles.paddingX} absolute inset-0 top-[110px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        {/* Accent line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="relative w-5 h-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff] pulse-ring" />
          </div>
          <div
            className="w-1 sm:h-80 h-40"
            style={{
              background:
                "linear-gradient(to bottom, #915eff 0%, transparent 100%)",
            }}
          />{" "}
        </div>

        <div className="mt-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#915eff] text-sm font-semibold tracking-widest uppercase mb-2">
              Welcome to my portfolio
            </p>
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I&apos;m{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #915eff 0%, #2563eb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dhia
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className={`${styles.heroSubText} mt-3 text-[#dfd9ff]`}>
              I develop{" "}
              <span className="typewriter-cursor text-white font-semibold">
                {role}
              </span>
            </p>
            <p className="mt-3 text-secondary text-[14px] sm:text-[16px] max-w-md leading-relaxed">
              Passionate about building elegant, performant web applications and
              crafting seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex gap-4 flex-wrap pointer-events-auto"
          >
            <a
              href="#about"
              className="px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #915eff, #2563eb)",
                boxShadow: "0 4px 24px rgba(145,94,255,0.3)",
              }}
            >
              About Me
            </a>
            <a
              href="#work"
              className="px-6 py-3 rounded-xl font-semibold text-white text-sm border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#915eff]/50 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
          </motion.div>

          {/* Mobile computer: sits directly under buttons */}
          <div className="relative mt-6 w-full h-[360px] xs:h-[400px] sm:hidden pointer-events-auto">
            {!showFallback && (
              <ErrorBoundary fallback={null}>
                <div className="absolute inset-0 flex items-start justify-center pt-1 pointer-events-none">
                  <div className="w-[380px] h-[380px] xs:w-[420px] xs:h-[420px] pointer-events-auto">
                    <ComputersCanvas onLoaded={onLoaded} />
                  </div>
                </div>
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>

      {/* 3D computer — centered */}
      <div className="hidden sm:block">
        <ComputerFallback />
        {!showFallback && (
          <ErrorBoundary fallback={null}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[520px] h-[520px] sm:w-[620px] sm:h-[620px] pointer-events-auto">
                <ComputersCanvas onLoaded={onLoaded} />
              </div>
            </div>
          </ErrorBoundary>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center z-10">
        <a
          href="#about"
          aria-label="Scroll down"
          className="pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-secondary text-xs tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-[30px] h-[50px] rounded-3xl border-2 border-secondary/40 flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-2 h-2 rounded-full bg-[#915eff]"
              />
            </div>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
