import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "../styles";
import { siteMeta } from "../constants";
import { EASE } from "../utils/motion";
import { useLoad } from "../lib/LoadContext";
import { scrollToId } from "../lib/lenis";
import Magnetic from "./ui/Magnetic";
import ErrorBoundary from "./ErrorBoundary";
import portrait from "../assets/dia_head.png";

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

const portraitVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: EASE, delay },
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
        className={`${styles.paddingX} relative z-10 max-w-[1680px] mx-auto w-full min-h-[100svh] flex flex-col justify-between gap-[clamp(1.5rem,4vh,3.5rem)] pb-5 pt-24 sm:pt-28 lg:pt-20`}
      >
        {/* Identity + portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <h1 className={`${styles.heroHeadText} lg:col-span-7`}>
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

          <motion.div
            variants={portraitVariants}
            custom={0.48}
            initial="hidden"
            animate={anim}
            className="lg:col-span-5 lg:col-start-8 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px]">
              <div
                className="absolute top-3 left-3 -right-3 -bottom-3 rounded-lg border hairline pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-lg border hairline bg-ink-700 shadow-[0_24px_80px_-20px_rgba(135,87,255,0.22)]">
                <img
                  src={portrait}
                  alt="Dhia Eddine Mandhouj"
                  width={720}
                  height={720}
                  decoding="async"
                  className="w-full aspect-square object-cover object-[center_12%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/60 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 h-full w-px bg-accent/40" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statement + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
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
          className="border-t hairline pt-5 flex items-center justify-between gap-4"
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
