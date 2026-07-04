/* eslint-disable react/prop-types -- simple presentational wrapper */
import { useRef, useCallback } from "react";

/**
 * Magnetic hover wrapper — the child gently follows the pointer.
 * No-ops on touch devices (mouse events never fire).
 */
const Magnetic = ({ children, strength = 0.3, className = "" }) => {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.625, 0.05, 0, 1)";
    el.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 700);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ willChange: "transform", display: "inline-block" }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
