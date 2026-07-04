import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../../utils/motion";
import { useLoad, PRELOAD_TOTAL_MS } from "../../lib/LoadContext";

const WORDS = ["Hello", "Bonjour", "أهلا"];
const COUNT_MS = PRELOAD_TOTAL_MS - 700;

const Preloader = () => {
  const { ready, firstVisit } = useLoad();
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (!firstVisit) return undefined;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [firstVisit]);

  useEffect(() => {
    if (!firstVisit) return undefined;
    const t = setInterval(
      () => setWordIdx((i) => Math.min(i + 1, WORDS.length - 1)),
      COUNT_MS / WORDS.length,
    );
    return () => clearInterval(t);
  }, [firstVisit]);

  useEffect(() => {
    if (!firstVisit) return undefined;
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [firstVisit, ready]);

  if (!firstVisit) return null;

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          {/* Rounded lip that follows the curtain up */}
          <motion.div
            className="absolute -bottom-24 left-0 right-0 h-24 bg-ink"
            style={{ borderRadius: "0 0 50% 50%/0 0 100% 100%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          <div className="flex flex-col items-center gap-6">
            <span className="mask-line">
              <motion.span
                key={wordIdx}
                className="block font-display text-4xl sm:text-5xl text-paper"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </span>
            <span className="eyebrow">Portfolio — 2026</span>
          </div>

          <span className="absolute bottom-8 right-8 sm:bottom-12 sm:right-14 font-display text-6xl sm:text-8xl text-paper/20 tabular-nums">
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
