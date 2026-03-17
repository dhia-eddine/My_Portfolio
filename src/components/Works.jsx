/* eslint-disable react/prop-types -- project shape from constants */
/* eslint-disable react-refresh/only-export-components -- Works + ProjectCard in same file */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import { projects } from "../constants";

const tiltOptions = {
  max: 15,
  scale: 1.02,
  speed: 400,
  glare: true,
  "max-glare": 0.15,
};

function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.7)}
      className="sm:w-[370px] w-full"
    >
      <Tilt options={tiltOptions} className="w-full">
        <Link to={`/project/${project.id}`} className="block w-full h-full">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#0f0c24] p-5 rounded-2xl w-full min-h-[420px] flex flex-col border border-white/5 hover:border-[#915eff]/30 shadow-card overflow-hidden group transition-colors duration-300 relative"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#915eff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            {/* Image */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden mb-5">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c24] via-transparent to-transparent" />

              {/* Top-right badge */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-white font-bold text-[20px] mb-2 line-clamp-2 group-hover:text-[#dfd9ff] transition-colors relative z-10">
              {project.name}
            </h3>
            <p className="text-secondary text-sm line-clamp-3 flex-1 leading-relaxed relative z-10">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4 relative z-10">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full border border-white/8 bg-white/4 font-medium ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4 flex items-center gap-1 text-sm text-[#915eff] font-semibold group-hover:gap-2 transition-all relative z-10">
              <span>View details</span>
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
            </div>
          </motion.div>
        </Link>
      </Tilt>
    </motion.div>
  );
}

function Works() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-relaxed"
      >
        Each project reflects real-world problem solving, Click to explore the
        details and gallery.
      </motion.p>

      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        className="mt-14 flex flex-wrap gap-8 justify-center"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </>
  );
}

const WorksWithSection = SectionWrapper(Works, "work");
export default WorksWithSection;
