// Signature easing — fast start, long elegant settle
export const EASE = [0.625, 0.05, 0, 1];

export const textVariant = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  },
});

export const fadeIn = (direction = "", type = "tween", delay = 0, duration = 0.8) => ({
  hidden: {
    x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: EASE },
  },
});

export const zoomIn = (delay = 0, duration = 0.8) => ({
  hidden: { scale: 0.92, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "tween", delay, duration, ease: EASE },
  },
});

export const slideIn = (direction = "left", type = "tween", delay = 0, duration = 0.8) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type, delay, duration, ease: EASE },
  },
});

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Line-mask reveal: wrap in an overflow-hidden parent (.mask-line)
export const lineReveal = (delay = 0) => ({
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: EASE, delay },
  },
});
