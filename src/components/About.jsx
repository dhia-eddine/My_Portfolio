import { motion } from "framer-motion";
import React from "react";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";

const ICONS = ["🌐", "🎨", "⚙️"];

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[260px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.15 * index, 0.75)}
        className="w-full rounded-2xl p-[1px] animated-border"
        style={{
          background:
            "linear-gradient(135deg, rgba(145,94,255,0.3), rgba(37,99,235,0.3))",
        }}
      >
        <div className="bg-[#0f0c24] rounded-2xl py-8 px-10 min-h-[260px] flex justify-evenly items-center flex-col relative overflow-hidden group cursor-default">
          {/* Hover glow bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#915eff]/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#915eff]/40 transition-colors duration-300">
            <img src={icon} alt={title} className="w-12 h-12 object-contain" />
          </div>

          <h3 className="text-white text-[18px] font-bold text-center relative z-10 group-hover:text-[#dfd9ff] transition-colors">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 grid md:grid-cols-2 gap-8 items-start"
      >
        <p className="text-secondary text-[17px] leading-[32px]">
          I am a highly skilled software developer proficient in{" "}
          <span className="text-white font-medium">
            TypeScript, JavaScript, Java, and Python
          </span>
          , with extensive experience in frameworks such as{" "}
          <span className="text-white font-medium">
            ReactJS, NextJS, and NestJS
          </span>
          . My expertise allows me to quickly grasp new concepts and work
          closely with clients to develop efficient, scalable, and user-friendly
          solutions that solve real-world challenges.
        </p>

        <div className="flex flex-col gap-4">
          {[
            { label: "Frontend", value: 90, color: "#915eff" },
            { label: "Backend", value: 85, color: "#2563eb" },
            { label: "DevOps / Tools", value: 70, color: "#00cea8" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-white/80 text-sm font-medium">
                  {label}
                </span>
                <span className="text-secondary text-sm">{value}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-8 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
