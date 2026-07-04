import Lenis from "lenis";

let lenis = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  const raf = (time) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenis;
}

export function getLenis() {
  return lenis;
}

/** Smooth-scroll to an element id, falling back to native scroll. */
export function scrollToId(id, { offset = 0, immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    lenis.resize?.();
    lenis.scrollTo(el, {
      offset,
      immediate,
      duration: immediate ? 0 : 1.2,
    });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
  return true;
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1 });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}
