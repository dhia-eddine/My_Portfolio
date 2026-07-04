import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { siteMeta } from "../constants";
import { EASE } from "../utils/motion";
import { useLoad } from "../lib/LoadContext";
import { scrollToId } from "../lib/lenis";
import Magnetic from "./ui/Magnetic";
import ErrorBoundary from "./ErrorBoundary";

const ParticleField = lazy(() => import("./canvas/ParticleField"));

const lineVariants = {
  hidden: { y: "110%" },
  show: (delay) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

const fadeVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const Hero = () => {
  const { ready } = useLoad();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const anim = ready ? "show" : "hidden";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* Three.js particle dunes — horizon under the typography */}
      <div className="absolute inset-x-0 bottom-0 h-[68%] pointer-events-none">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ParticleField className="w-full h-full" />
          </Suspense>
        </ErrorBoundary>
        {/* Soft floor fade so particles melt into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={`${styles.paddingX} relative z-10 max-w-[1680px] mx-auto w-full flex-1 flex flex-col justify-start pb-6 pt-28 sm:pt-36 lg:pt-20`}
      >
        {/* Identity */}
        <h1 className={styles.heroHeadText}>
          <span className="mask-line">
            <motion.span
              className="block will-change-transform"
              variants={lineVariants}
              custom={0.25}
              initial="hidden"
              animate={anim}
            >
              Dhia <span className="text-stroke">Eddine</span>
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              className="block will-change-transform"
              variants={lineVariants}
              custom={0.37}
              initial="hidden"
              animate={anim}
            >
              Mandhouj<span className="text-accent">.</span>
            </motion.span>
          </span>
        </h1>

        {/* Statement + CTAs */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            variants={fadeVariants}
            custom={0.55}
            initial="hidden"
            animate={anim}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-4">{siteMeta.role}</p>
            <p className="text-mute text-base sm:text-lg leading-relaxed max-w-md">
              I build elegant, performant web applications — from robust{" "}
              <span className="text-paper">NestJS backends</span> to immersive{" "}
              <span className="text-paper">React &amp; Three.js frontends</span>.
            </p>
          </motion.div>

          <motion.div
            variants={fadeVariants}
            custom={0.68}
            initial="hidden"
            animate={anim}
            className="lg:col-span-7 flex flex-wrap items-center gap-6 lg:justify-end"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("work")}
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-paper text-ink px-7 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                View selected work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-expo group-hover:translate-y-0.5"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>
            </Magnetic>
            <button
              onClick={() => scrollToId("contact")}
              className="link-sweep font-mono text-[12px] tracking-[0.18em] uppercase text-paper"
            >
              Get in touch
            </button>
          </motion.div>
        </div>

        {/* Bottom meta bar */}
        <motion.div
          variants={fadeVariants}
          custom={0.85}
          initial="hidden"
          animate={anim}
          className="mt-14 sm:mt-20 border-t hairline pt-5 flex items-center justify-between gap-4"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-mute">
            Based in {siteMeta.location} — working worldwide
          </span>
          <span
            className="hidden sm:flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-mute"
            aria-hidden="true"
          >
            Scroll
            <span className="relative w-px h-8 bg-paper/20 overflow-hidden">
              <motion.span
                className="absolute top-0 left-0 w-full h-1/2 bg-accent-soft"
                animate={{ y: ["-100%", "220%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-mute">
            ©2026
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
