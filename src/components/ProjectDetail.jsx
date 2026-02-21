import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../constants";
import { styles } from "../styles";
import { fadeIn, zoomIn, staggerContainer, textVariant } from "../utils/motion";
import { github } from "../assets";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-primary flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-secondary text-xl mb-4">Project not found.</p>
          <Link
            to="/"
            className="text-white font-medium hover:underline"
          >
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
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-primary"
      >
        <div className={`${styles.padding} max-w-6xl mx-auto pt-24 pb-20`}>
          {/* Back button */}
          <motion.div
            variants={fadeIn("left", "spring", 0, 0.6)}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <Link
              to="/#work"
              className="flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300 group"
            >
              <motion.span
                className="inline-block"
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ←
              </motion.span>
              <span>Back to projects</span>
            </Link>
          </motion.div>

          {/* Header: thumb, title, tags */}
          <motion.header
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16"
          >
            <motion.div
              variants={zoomIn(0, 0.5)}
              className="w-full lg:w-[320px] shrink-0 rounded-2xl overflow-hidden bg-tertiary border border-white/5 shadow-card"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-56 lg:h-64 object-cover object-top"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h1
                variants={textVariant(0.1)}
                className="text-white font-black text-3xl sm:text-4xl lg:text-5xl mb-4"
              >
                {project.name}
              </motion.h1>
              <motion.div
                variants={fadeIn("up", "spring", 0.2, 0.6)}
                className="flex flex-wrap gap-2 mb-6"
              >
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-white/5 ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </motion.div>
              {project.source_code_link && (
                <motion.a
                  variants={fadeIn("up", "spring", 0.3, 0.6)}
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors"
                >
                  <img src={github} alt="GitHub" className="w-6 h-6" />
                  <span>View source</span>
                </motion.a>
              )}
            </div>
          </motion.header>

          {/* Description */}
          <motion.section
            variants={fadeIn("up", "spring", 0.2, 0.7)}
            initial="hidden"
            animate="show"
            className="mb-16"
          >
            <h2 className="text-white font-bold text-xl mb-4">About this project</h2>
            <p className="text-secondary text-[17px] leading-[30px] max-w-3xl">
              {project.description}
            </p>
          </motion.section>

          {/* Gallery */}
          {hasGallery && (
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.05, 0.1)}
              className="mt-16"
            >
              <h2 className="text-white font-bold text-xl mb-8">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {project.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    variants={zoomIn(0, 0.5)}
                    className="rounded-xl overflow-hidden bg-tertiary border border-white/5 shadow-card group"
                  >
                    <div className="aspect-video sm:aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt={`${project.name} screenshot ${index + 1}`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {!hasGallery && (
            <motion.p
              variants={fadeIn("up", "spring", 0.2, 0.6)}
              initial="hidden"
              animate="show"
              className="text-secondary/70 text-sm italic"
            >
              No gallery images for this project yet.
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
