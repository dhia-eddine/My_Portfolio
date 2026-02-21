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
  max: 20,
  scale: 1.02,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
};

function ProjectCard({ project, index }) {
  return (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.7)}
    className="sm:w-[360px] w-full"
  >
    <Tilt options={tiltOptions} className="w-full">
      <Link to={`/project/${project.id}`} className="block w-full h-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-tertiary p-5 rounded-2xl w-full min-h-[400px] flex flex-col border border-white/5 shadow-card overflow-hidden group"
        >
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tertiary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h3 className="text-white font-bold text-[20px] mb-2 line-clamp-2 group-hover:text-white/95">
            {project.name}
          </h3>
          <p className="text-secondary text-sm line-clamp-2 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-full ${tag.color}`}
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <motion.span
            className="inline-block mt-4 text-sm text-secondary group-hover:text-white transition-colors"
            whileHover={{ x: 4 }}
          >
            View project →
          </motion.span>
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
      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        className="mt-20 flex flex-wrap gap-10 justify-center"
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
