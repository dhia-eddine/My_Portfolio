import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { BallCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const ITEM_SIZE = 112;
const GAP = 32;

const Tech = () => {
  const containerRef = useRef(null);
  const [firstRowCount, setFirstRowCount] = useState(7);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateCount = () => {
      const width = el.offsetWidth;
      const isMobile = width < 640;
      const itemSize = isMobile ? 80 : ITEM_SIZE;
      const gap = isMobile ? 24 : GAP;
      const count = Math.min(
        technologies.length,
        Math.max(1, Math.floor((width + gap) / (itemSize + gap))),
      );
      setFirstRowCount(count);
    };
    updateCount();
    const observer = new ResizeObserver(updateCount);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.sectionSubText}>Technologies I work with</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      <div
        ref={containerRef}
        className="mt-16 flex flex-row flex-wrap justify-center gap-6 sm:gap-8 max-w-[976px] mx-auto"
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 relative">
              <ErrorBoundary
                fallback={
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-[#915eff]/40 group-hover:bg-[#915eff]/5 transition-all duration-300 overflow-hidden">
                    <img
                      src={technology.icon}
                      alt={technology.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                    />
                  </div>
                }
              >
                {index < firstRowCount ? (
                  <BallCanvas icon={technology.icon} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-[#915eff]/40 group-hover:bg-[#915eff]/5 transition-all duration-300 overflow-hidden">
                    <img
                      src={technology.icon}
                      alt={technology.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                    />
                  </div>
                )}
              </ErrorBoundary>
            </div>
            <p className="text-center text-xs text-secondary group-hover:text-white/80 transition-colors font-medium">
              {technology.name}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
