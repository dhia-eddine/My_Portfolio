import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

const COMPUTER_LOAD_TIMEOUT_MS = 2500;

function ComputerFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[520px] h-[520px] sm:w-[620px] sm:h-[620px] rounded-2xl bg-primary/30" />
    </div>
  );
}

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const onLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setShowFallback(true);
    }, COMPUTER_LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section className="relative w-full h-screen mx-auto bg-primary">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient " />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915eff]">Dhia </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I devolop web applications <br className="sm:block hidden" /> and
            user interfaces
          </p>
        </div>
      </div>
      {/* 3D computer: centered, fixed size */}
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
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 ">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
