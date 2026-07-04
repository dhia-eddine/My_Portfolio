/* eslint-disable react/prop-types -- service shape from constants */
import { motion } from "framer-motion";
import { services, stats } from "../constants";
import { SectionWrapper } from "../hoc";
import { EASE } from "../utils/motion";
import SectionHeading from "./ui/SectionHeading";
import { FadeUp } from "./ui/Reveal";

const ServiceRow = ({ service, i }) => (
  <motion.li
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
    className="group relative border-t hairline last:border-b overflow-hidden"
  >
    {/* Hover sweep */}
    <div className="absolute inset-0 bg-ink-700 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-expo" />

    <div className="relative grid grid-cols-12 items-baseline gap-4 py-7 sm:py-9">
      <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-accent-soft/80">
        ({service.index})
      </span>
      <h3 className="col-span-10 sm:col-span-4 font-display text-xl sm:text-2xl lg:text-3xl font-medium text-paper transition-transform duration-500 ease-expo group-hover:translate-x-2">
        {service.title}
      </h3>
      <p className="col-span-10 col-start-3 sm:col-span-5 sm:col-start-6 text-sm sm:text-[15px] leading-relaxed text-mute">
        {service.description}
      </p>
      <div className="col-span-10 col-start-3 sm:col-span-2 sm:col-start-11 flex sm:flex-col flex-wrap gap-x-3 gap-y-1 sm:items-end">
        {service.keywords.map((k) => (
          <span
            key={k}
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-mute/70"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  </motion.li>
);

const About = () => {
  return (
    <>
      <SectionHeading index="01" eyebrow="About me" lines={["Overview"]} />

      <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <FadeUp className="lg:col-span-8 lg:col-start-5" delay={0.1}>
          <p className="font-display text-display-md text-paper/90 font-normal max-w-3xl">
            I&apos;m a full-stack developer who turns complex requirements into{" "}
            <span className="text-accent-soft">efficient, scalable</span> and
            user-friendly products — fluent in{" "}
            <span className="text-accent-soft">TypeScript, Java and Python</span>,
            at home with React, NextJS and NestJS.
          </p>
          <p className="mt-8 text-mute text-base sm:text-lg leading-relaxed max-w-xl">
            My expertise allows me to quickly grasp new concepts and work
            closely with clients and teams to ship solutions that solve
            real-world challenges — from school platforms to industrial robot
            interfaces.
          </p>
        </FadeUp>
      </div>

      {/* Stats */}
      <div className="mt-20 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-l hairline">
        {stats.map((stat, i) => (
          <FadeUp
            key={stat.label}
            delay={i * 0.06}
            y={20}
            className="border-b border-r hairline p-6 sm:p-8"
          >
            <p className="font-display text-4xl sm:text-5xl font-medium text-paper">
              {stat.value}
            </p>
            <p className="mt-3 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-mute">
              {stat.label}
            </p>
          </FadeUp>
        ))}
      </div>

      {/* Services */}
      <div className="mt-20 sm:mt-28">
        <FadeUp y={0}>
          <span className="eyebrow mb-10 inline-flex">What I do</span>
        </FadeUp>
        <ul className="list-none">
          {services.map((service, i) => (
            <ServiceRow key={service.index} service={service} i={i} />
          ))}
        </ul>
      </div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;
