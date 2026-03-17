import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../constants";
import { fadeIn, staggerContainer } from "../utils/motion";
import { github } from "../assets";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-secondary text-xl mb-4">Project not found.</p>
          <Link to="/" className="text-[#915eff] font-medium hover:underline">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    );
  }

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
      >
        {/* ── Hero banner ── */}
        <div className="relative w-full h-[55vh] min-h-[320px] max-h-[480px] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top scale-105"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent" />

          {/* Back button over banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-24 left-6 sm:left-16"
          >
            <Link
              to={{ pathname: "/", hash: "#work" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/60 hover:border-[#915eff]/40 transition-all duration-300 text-sm font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to projects
            </Link>
          </motion.div>

          {/* Title over banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute bottom-10 left-6 sm:left-16 max-w-3xl"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full font-semibold bg-black/50 backdrop-blur-sm border border-white/10 ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl leading-tight drop-shadow-2xl">
              {project.name}
            </h1>
          </motion.div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-6xl mx-auto px-6 sm:px-16 py-12">
          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#915eff]/50 hover:bg-[#915eff]/10 transition-all duration-300 text-white text-sm font-medium"
              >
                {project.link_label ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z" />
                  </svg>
                ) : (
                  <img src={github} alt="GitHub" className="w-5 h-5" />
                )}
                {project.link_label ?? "View source"}
              </a>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium bg-white/5 border border-white/8 ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#915eff] to-blue-500" />
              <h2 className="text-white font-bold text-xl">
                About this project
              </h2>
            </div>
            <p className="text-secondary text-[17px] leading-[32px] max-w-3xl pl-4 border-l border-white/5">
              {project.description}
            </p>
          </motion.section>

          {/* Gallery */}
          {hasGallery && (
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={staggerContainer(0.04, 0.1)}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#915eff] to-blue-500" />
                <h2 className="text-white font-bold text-xl">
                  Gallery
                  <span className="ml-2 text-secondary text-sm font-normal">
                    ({project.gallery.length} screenshots)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn("up", "spring", index * 0.04, 0.5)}
                    className="group relative rounded-xl overflow-hidden bg-[#0f0c24] border border-white/5 hover:border-[#915eff]/40 transition-all duration-300 cursor-pointer shadow-card"
                    onClick={() => setLightbox(index)}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      {img && img.toString().endsWith(".gif") ? (
                        <img
                          src={img}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                    {/* Index badge */}
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white/70 text-[10px] font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Bottom nav */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center flex-wrap gap-4"
          >
            <Link
              to={{ pathname: "/", hash: "#work" }}
              className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to all projects
            </Link>
            <Link
              to={{ pathname: "/", hash: "#contact" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #915eff, #2563eb)",
                boxShadow: "0 4px 20px rgba(145,94,255,0.3)",
              }}
            >
              Get in touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={project.gallery[lightbox]}
                  alt={`Screenshot ${lightbox + 1}`}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                />
                {/* Close */}
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
                {/* Prev / Next */}
                {lightbox > 0 && (
                  <button
                    onClick={() => setLightbox(lightbox - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                )}
                {lightbox < project.gallery.length - 1 && (
                  <button
                    onClick={() => setLightbox(lightbox + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                )}
                {/* Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/70 text-xs font-medium">
                  {lightbox + 1} / {project.gallery.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
