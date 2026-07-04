/* eslint-disable react/prop-types -- group shape from constants */
import { technologies, techGroups } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./ui/SectionHeading";
import { FadeUp } from "./ui/Reveal";
import Marquee from "./ui/Marquee";

const TechGroup = ({ group, i }) => (
  <FadeUp delay={i * 0.07} className="border-t hairline pt-6">
    <div className="flex items-baseline justify-between mb-6">
      <h3 className="font-display text-lg sm:text-xl font-medium text-paper">
        {group.label}
      </h3>
      <span className="font-mono text-[10px] tracking-[0.2em] text-mute">
        /{group.index}
      </span>
    </div>
    <ul className="space-y-2.5 list-none">
      {group.items.map((item) => (
        <li
          key={item}
          className="group/item flex items-center gap-3 text-sm sm:text-[15px] text-mute hover:text-paper transition-colors duration-300 w-fit"
        >
          <span className="w-1 h-1 rounded-full bg-mute/40 group-hover/item:bg-accent transition-colors duration-300" />
          {item}
        </li>
      ))}
    </ul>
  </FadeUp>
);

const Tech = () => {
  return (
    <>
      <SectionHeading index="03" eyebrow="Toolbox" lines={["Tech Stack"]} />

      {/* Typographic marquee */}
      <FadeUp y={0} delay={0.15} className="mt-14 sm:mt-20 border-y hairline">
        <Marquee speed={50} pauseOnHover>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center shrink-0 py-4 sm:py-5"
            >
              <span className="font-display text-2xl sm:text-3xl font-medium uppercase text-paper/35 whitespace-nowrap px-6 sm:px-8 hover:text-paper transition-colors duration-300">
                {tech}
              </span>
              <span className="text-accent/60 text-sm" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </FadeUp>

      {/* Grouped stack */}
      <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {techGroups.map((group, i) => (
          <TechGroup key={group.label} group={group} i={i} />
        ))}
      </div>
    </>
  );
};

const TechSection = SectionWrapper(Tech, "stack");
export default TechSection;
