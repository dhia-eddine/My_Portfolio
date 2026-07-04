/* eslint-disable react/prop-types -- experience shape from constants */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { EASE } from "../utils/motion";
import SectionHeading from "./ui/SectionHeading";

const ExperienceRow = ({ experience, i, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === i;
  const panelId = `experience-panel-${i}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.05, 0.25) }}
      className="border-t hairline last:border-b"
    >
      <button
        onClick={() => setOpenIndex(isOpen ? -1 : i)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group w-full grid grid-cols-12 items-center gap-3 sm:gap-4 py-6 sm:py-8 text-left"
      >
        <span className="col-span-12 sm:col-span-3 order-3 sm:order-1 font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          {experience.date}
        </span>

        <span className="col-span-10 sm:col-span-7 order-1 sm:order-2 flex items-center gap-4">
          <span className="hidden sm:flex w-11 h-11 rounded-full bg-ink-700 border hairline items-center justify-center overflow-hidden shrink-0">
            <img
              src={experience.icon}
              alt=""
              loading="lazy"
              className="w-6 h-6 object-contain opacity-80"
            />
          </span>
          <span>
            <span className="block font-display text-xl sm:text-2xl font-medium text-paper transition-colors duration-300 group-hover:text-accent-soft">
              {experience.title}
            </span>
            <span className="block mt-0.5 text-sm text-mute">
              {experience.company_name}
            </span>
          </span>
        </span>

        <span className="col-span-2 order-2 sm:order-3 flex justify-end">
          <span className="relative w-9 h-9 rounded-full border hairline flex items-center justify-center transition-colors duration-300 group-hover:border-accent-soft/50">
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-paper"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <path d="M12 5v14M5 12h14" />
            </motion.svg>
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-8 sm:pb-10">
              <ul className="col-span-12 sm:col-span-7 sm:col-start-4 space-y-3 list-none">
                {experience.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm sm:text-[15px] leading-relaxed text-mute"
                  >
                    <span className="mt-[9px] w-3 h-px bg-accent shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
                {experience.project_d && (
                  <li className="pt-4 mt-4 border-t hairline">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-soft/80 mb-2">
                      Project
                    </p>
                    <p className="text-sm leading-relaxed text-paper/70">
                      {experience.project_d}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const Experience = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SectionHeading
        index="02"
        eyebrow="Career"
        lines={["Work", "Experience"]}
      />

      <ul className="mt-14 sm:mt-20 list-none">
        {experiences.map((experience, i) => (
          <ExperienceRow
            key={`${experience.company_name}-${experience.date}`}
            experience={experience}
            i={i}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </ul>
    </>
  );
};

const ExperienceSection = SectionWrapper(Experience, "experience");
export default ExperienceSection;
