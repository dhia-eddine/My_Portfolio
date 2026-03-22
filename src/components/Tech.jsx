import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
// Removed BallCanvas (3D) for flat icons only
import ErrorBoundary from "./ErrorBoundary";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const StaticTechIcon = ({ icon, name }) => {
  const [hasError, setHasError] = useState(!icon);
  const shortName = name.slice(0, 2).toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-[#915eff]/40 group-hover:bg-[#915eff]/5 transition-all duration-300 overflow-hidden">
      {hasError ? (
        <span className="text-white/70 text-base sm:text-lg font-semibold tracking-wide">
          {shortName}
        </span>
      ) : (
        <img
          src={icon}
          alt={name}
          onError={() => setHasError(true)}
          className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />
      )}
    </div>
  );
};

const Tech = () => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [firstRowCount, setFirstRowCount] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateCount = () => {
      requestAnimationFrame(() => {
        const nodes = itemRefs.current.filter(Boolean);
        if (!nodes.length) return;

        const firstRowTop = nodes[0].offsetTop;
        let count = 0;

        for (const node of nodes) {
          if (node.offsetTop !== firstRowTop) break;
          count += 1;
        }

        setFirstRowCount(Math.max(1, count));
      });
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
        <div className="section-label mb-3">Technologies I work with</div>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      <div
        ref={containerRef}
        className="mt-16 flex flex-row flex-wrap justify-center gap-6 sm:gap-8 max-w-[976px] mx-auto"
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 relative">
              <ErrorBoundary
                fallback={
                  <StaticTechIcon
                    icon={technology.icon}
                    name={technology.name}
                  />
                }
              >
                <StaticTechIcon icon={technology.icon} name={technology.name} />
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
