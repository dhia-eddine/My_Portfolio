import { useEffect, useRef } from "react";

const COLORS = {
  dot: "147, 94, 255",
  line: "147, 94, 255",
  mouseRepel: "170, 166, 195",
};

const CONFIG = {
  dotCountDesktop: 80,
  dotCountMobile: 38,
  fps: 60,
  minRadius: 1.5,
  maxRadius: 3,
  speed: 0.4,
  connectionDistance: 140,
  mouseRadius: 120,
  dotOpacityMin: 0.4,
  dotOpacityMax: 0.85,
  lineOpacityMax: 0.25,
};

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createDot(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randomBetween(-CONFIG.speed, CONFIG.speed),
    vy: randomBetween(-CONFIG.speed, CONFIG.speed),
    r: randomBetween(CONFIG.minRadius, CONFIG.maxRadius),
    opacity: randomBetween(CONFIG.dotOpacityMin, CONFIG.dotOpacityMax),
  };
}

const DotsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const isLikelyTouchDevice = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animId;
    let mouse = { x: null, y: null };
    let dots = [];
    let viewport = { width: 0, height: 0 };
    let lastViewport = { width: 0, height: 0 };
    let lastFrame = 0;

    if (prefersReducedMotion) {
      return undefined;
    }

    const getDotCount = (width) =>
      width <= 768 ? CONFIG.dotCountMobile : CONFIG.dotCountDesktop;

    const resize = ({ force = false } = {}) => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;

      const isMinorMobileHeightChange =
        isLikelyTouchDevice &&
        !force &&
        lastViewport.width === nextWidth &&
        lastViewport.height > 0 &&
        Math.abs(nextHeight - lastViewport.height) < 80;

      // Ignore tiny mobile viewport height fluctuations caused by browser chrome while scrolling.
      if (isMinorMobileHeightChange) return;

      const prevWidth = viewport.width || nextWidth;
      const prevHeight = viewport.height || nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      viewport = { width: nextWidth, height: nextHeight };
      lastViewport = { width: nextWidth, height: nextHeight };

      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (dots.length === 0) {
        dots = Array.from({ length: getDotCount(viewport.width) }, () =>
          createDot(viewport.width, viewport.height),
        );
        return;
      }

      if (dots.length !== getDotCount(viewport.width)) {
        dots = Array.from({ length: getDotCount(viewport.width) }, () =>
          createDot(viewport.width, viewport.height),
        );
        return;
      }

      dots = dots.map((dot) => ({
        ...dot,
        x: (dot.x / prevWidth) * viewport.width,
        y: (dot.y / prevHeight) * viewport.height,
      }));
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onOrientationChange = () => resize({ force: true });

    const draw = (timestamp = 0) => {
      if (document.hidden) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const frameInterval = 1000 / CONFIG.fps;
      if (timestamp - lastFrame < frameInterval) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      const { width, height } = viewport;
      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS.dot}, ${d.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dx = d.x - d2.x;
          const dy = d.y - d2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = CONFIG.connectionDistance;
          const maxDistSq = maxDist * maxDist;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = CONFIG.lineOpacityMax * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(${COLORS.line}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const safeDist = Math.max(dist, 0.001);

          if (dist < CONFIG.mouseRadius) {
            const linealpha = 0.5 * (1 - dist / CONFIG.mouseRadius);
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${COLORS.mouseRepel}, ${linealpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
            d.vx += (dx / safeDist) * force * 0.08;
            d.vy += (dy / safeDist) * force * 0.08;

            const speed = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
            if (speed > CONFIG.speed * 3) {
              d.vx = (d.vx / speed) * CONFIG.speed * 3;
              d.vy = (d.vy / speed) * CONFIG.speed * 3;
            }
          } else {
            const targetSpeed = CONFIG.speed;
            const currentSpeed = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
            if (currentSpeed > targetSpeed) {
              d.vx *= 0.99;
              d.vy *= 0.99;
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", onOrientationChange);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", onOrientationChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default DotsBackground;
