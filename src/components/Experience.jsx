import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useState } from "react";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "linear-gradient(135deg, #12103a 0%, #0e0c2a 100%)",
      color: "#fff",
      border: "1px solid rgba(145,94,255,0.15)",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
    }}
    contentArrowStyle={{ borderRight: "7px solid rgba(145,94,255,0.3)" }}
    date={
      <span className="text-[#915eff] font-semibold text-sm tracking-wide">
        {experience.date}
      </span>
    }
    iconStyle={{
      background: experience.iconBg,
      boxShadow: "0 0 0 4px #915eff33, 0 0 20px rgba(145,94,255,0.2)",
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[75%] h-[75%] object-contain"
        />
      </div>
    }
  >
    <div className="mb-4">
      <h3 className="text-white text-[22px] font-bold leading-tight">
        {experience.title}
      </h3>
      <p
        className="text-[#915eff] text-[15px] font-semibold mt-1"
        style={{ margin: "4px 0 0" }}
      >
        {experience.company_name}
      </p>
    </div>

    <div className="h-px bg-gradient-to-r from-[#915eff]/30 to-transparent mb-4" />

    <p className="text-[#aaa6c3] text-[13px] font-semibold uppercase tracking-wider mb-3">
      {experience.key_q}
    </p>

    <ul className="space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white/80 text-[14px] leading-relaxed flex gap-2"
        >
          <span className="text-[#915eff] mt-1 shrink-0">▸</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>

    {experience.project_d && (
      <div className="mt-5 p-4 rounded-xl bg-white/3 border border-white/5">
        <p className="text-[#915eff] text-[12px] font-semibold uppercase tracking-wider mb-2">
          Project Summary
        </p>
        <p className="text-white/70 text-[13px] leading-relaxed">
          {experience.project_d}
        </p>
      </div>
    )}
  </VerticalTimelineElement>
);

const Experience = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, experiences.length));
  };

  const visibleExperiences = experiences.slice(0, visibleCount);
  const hasMore = visibleCount < experiences.length;

  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(145,94,255,0.2)">
          {visibleExperiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 rounded-xl bg-transparent border border-[#915eff] text-[#915eff] font-semibold text-[16px] tracking-wide hover:bg-[#915eff]/10 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "Experience");
