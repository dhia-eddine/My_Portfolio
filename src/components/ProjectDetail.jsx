import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, siteMeta } from "../constants";
import { styles } from "../styles";
import { EASE } from "../utils/motion";
import { RevealLines, FadeUp } from "./ui/Reveal";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const nextProject =
    projects[(projects.findIndex((p) => p.id === id) + 1) % projects.length];
  const [lightbox, setLightbox] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (project) {
      document.title = `${project.name} | ${siteMeta.fullName}`;
    }
  }, [id, project]);

  const goPrev = () => {
    setSlideDirection(-1);
    setLightbox((cur) => (cur !== null && cur > 0 ? cur - 1 : cur));
  };

  const goNext = () => {
    if (!project) return;
    setSlideDirection(1);
    setLightbox((cur) =>
      cur !== null && cur < project.gallery.length - 1 ? cur + 1 : cur,
    );
  };

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(deltaX) < Math.abs(deltaY) || Math.abs(deltaX) < 40) return;
    if (deltaX > 0) goPrev();
    else goNext();
  };

  useEffect(() => {
    if (lightbox === null) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-mute text-xl mb-4">Project not found.</p>
          <Link to="/" className="link-sweep text-accent-soft font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const meta = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Stack", value: project.tags.map((t) => t.name).join(" · ") },
  ];

  return (
    <motion.main
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${styles.paddingX} max-w-[1680px] mx-auto min-h-screen pt-28 sm:pt-36 pb-20`}
      id="main"
    >
      {/* Back */}
      <FadeUp y={0}>
        <Link
          to={{ pathname: "/", hash: "#work" }}
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-mute hover:text-paper transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 ease-expo group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All projects
        </Link>
      </FadeUp>

      {/* Title */}
      <div className="mt-10 sm:mt-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-soft/80">
            ({project.index})
          </span>
          <RevealLines
            as="h1"
            lines={[project.name]}
            className="mt-3 font-display font-medium text-display-lg text-paper"
          />
          <FadeUp delay={0.15}>
            <p className="mt-3 text-mute text-lg sm:text-xl">
              {project.tagline}
            </p>
          </FadeUp>
        </div>
        {project.source_code_link && (
          <FadeUp delay={0.2}>
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full bg-paper text-ink px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {project.link_label ?? "View source"}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </FadeUp>
        )}
      </div>

      {/* Hero image */}
      <FadeUp delay={0.25} className="mt-12 sm:mt-16">
        <div className="relative overflow-hidden rounded-lg border hairline bg-ink-700">
          <img
            src={project.image}
            alt={`${project.name} — main interface`}
            className="w-full max-h-[72vh] object-cover object-top"
          />
        </div>
      </FadeUp>

      {/* Meta + description */}
      <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <FadeUp className="lg:col-span-4">
          <div className="border-t hairline">
            {meta.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-6 py-4 border-b hairline"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute shrink-0 pt-0.5">
                  {row.label}
                </span>
                <span className="text-sm text-paper/85 text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <span className="eyebrow mb-5 inline-flex">About this project</span>
          <p className="text-paper/80 text-lg sm:text-xl leading-relaxed">
            {project.description}
          </p>
        </FadeUp>
      </div>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <div className="mt-20 sm:mt-28">
          <FadeUp
            y={0}
            className="flex items-baseline justify-between border-t hairline pt-5 mb-10"
          >
            <span className="eyebrow">Gallery</span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-mute">
              {String(project.gallery.length).padStart(2, "0")} shots
            </span>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((img, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-4% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: (index % 3) * 0.07,
                }}
                onClick={() => setLightbox(index)}
                data-cursor="view"
                aria-label={`Open screenshot ${index + 1} of ${project.gallery.length}`}
                className="group relative rounded-lg overflow-hidden border hairline bg-ink-700 text-left"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                  />
                </div>
                <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.14em] text-paper/80 bg-ink/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Next project */}
      <div className="mt-24 sm:mt-32 border-t hairline pt-10">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute mb-4">
          Next project
        </p>
        <Link
          to={`/project/${nextProject.id}`}
          className="group inline-flex items-baseline gap-4"
        >
          <span className="font-display text-3xl sm:text-5xl font-medium text-paper group-hover:text-accent-soft transition-colors duration-300">
            {nextProject.name}
          </span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-paper transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:-translate-y-1 self-center"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
        <div className="mt-12 flex justify-between items-center flex-wrap gap-4">
          <Link
            to={{ pathname: "/", hash: "#work" }}
            className="link-sweep font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-paper transition-colors"
          >
            ← Back to all projects
          </Link>
          <Link
            to={{ pathname: "/", hash: "#contact" }}
            className="link-sweep font-mono text-[11px] tracking-[0.18em] uppercase text-paper"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[130] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div
              className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                <motion.img
                  key={lightbox}
                  custom={slideDirection}
                  src={project.gallery[lightbox]}
                  alt={`${project.name} screenshot ${lightbox + 1}`}
                  className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-lg border hairline"
                  variants={{
                    enter: (dir) => ({
                      x: dir >= 0 ? "12%" : "-12%",
                      opacity: 0,
                    }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir) => ({
                      x: dir >= 0 ? "-12%" : "12%",
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </AnimatePresence>

              <button
                onClick={() => setLightbox(null)}
                aria-label="Close viewer"
                className="absolute -top-1 right-0 sm:top-2 sm:right-2 w-10 h-10 rounded-full bg-ink/80 border hairline flex items-center justify-center text-paper hover:border-accent-soft/60 transition-colors"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {lightbox > 0 && (
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/80 border hairline flex items-center justify-center text-paper hover:border-accent-soft/60 transition-colors"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {lightbox < project.gallery.length - 1 && (
                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/80 border hairline flex items-center justify-center text-paper hover:border-accent-soft/60 transition-colors"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}

              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.18em] text-paper/80 bg-ink/80 border hairline rounded-full px-3.5 py-1.5 tabular-nums">
                {String(lightbox + 1).padStart(2, "0")} /{" "}
                {String(project.gallery.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default ProjectDetail;
