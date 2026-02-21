import { useEffect, useRef, useState } from "react";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { BallCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

// w-28 = 112px, gap-10 = 40px
const ITEM_SIZE = 112;
const GAP = 40;

const Tech = () => {
  const containerRef = useRef(null);
  const [firstRowCount, setFirstRowCount] = useState(5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateCount = () => {
      const width = el.offsetWidth;
      const count = Math.max(1, Math.floor((width + GAP) / (ITEM_SIZE + GAP)));
      setFirstRowCount(count);
    };

    updateCount();
    const observer = new ResizeObserver(updateCount);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <div
          className="w-28 h-28 flex flex-col items-center"
          key={technology.name}
        >
          <ErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <img
                  src={technology.icon}
                  alt=""
                  className="w-14 h-14 object-contain"
                />
              </div>
            }
          >
            {index < firstRowCount ? (
              <BallCanvas icon={technology.icon} />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <img
                  src={technology.icon}
                  alt=""
                  className="w-14 h-14 object-contain"
                />
              </div>
            )}
          </ErrorBoundary>
          <p className="text-center text-sm mt-2">{technology.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
