/* eslint-disable react/prop-types -- project shape from constants */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { EASE } from "../utils/motion";
import { projects } from "../constants";
import SectionHeading from "./ui/SectionHeading";
import { FadeUp } from "./ui/Reveal";

function ProjectCard({ project, i }) {
  const flipped = i % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.95, ease: EASE }}
    >
      <Link
        to={`/project/${project.id}`}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        aria-label={`Open case study: ${project.name}`}
      >
        {/* Image */}
        <div
          data-cursor="view"
          className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
        >
          <div className="relative overflow-hidden rounded-lg border hairline bg-ink-700">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.name} — interface preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.045]"
              />
            </div>
            {/* Quiet veil that lifts on hover (hover-capable screens only) */}
            <div className="absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none hidden [@media(hover:hover)]:block" />
            <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/80 bg-ink/60 backdrop-blur-sm border hairline rounded-full px-3 py-1.5">
              {project.year}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-soft/80">
            ({project.index})
          </span>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-paper leading-[1.05]">
            {project.name}
          </h3>
          <p className="mt-2 text-mute text-base sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-8 border-t hairline">
            <div className="flex justify-between py-3.5 border-b hairline">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                Role
              </span>
              <span className="text-sm text-paper/85">{project.role}</span>
            </div>
            <div className="flex justify-between gap-6 py-3.5 border-b hairline">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute shrink-0">
                Stack
              </span>
              <span className="text-sm text-paper/85 text-right">
                {project.tags.map((t) => t.name).join(" · ")}
              </span>
            </div>
          </div>

          <span className="mt-8 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.18em] uppercase text-paper">
            <span className="link-sweep">Open case study</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function Works() {
  return (
    <>
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          lines={["Featured", "Projects"]}
          className="flex-1"
        />
        <FadeUp
          delay={0.3}
          y={12}
          className="hidden sm:block font-mono text-[11px] tracking-[0.2em] text-mute pb-3"
        >
          ({String(projects.length).padStart(2, "0")})
        </FadeUp>
      </div>

      <div className="mt-16 sm:mt-24 flex flex-col gap-24 sm:gap-32">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}
      </div>
    </>
  );
}

const WorksWithSection = SectionWrapper(Works, "work");
export default WorksWithSection;
