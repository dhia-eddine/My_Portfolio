import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../utils/motion";
import { github, linkedin, instagram } from "../assets";

const socialLinks = [
  {
    href: "https://github.com/dhia-eddine",
    icon: github,
    label: "GitHub",
    color: "hover:border-white/40",
  },
  {
    href: "https://www.linkedin.com/in/dhia-eddine-mandhouj/",
    icon: linkedin,
    label: "LinkedIn",
    color: "hover:border-blue-500/60",
  },
  {
    href: "https://www.instagram.com/dia_mandouj/",
    icon: instagram,
    label: "Instagram",
    color: "hover:border-pink-500/60",
  },
];

const Contact = () => {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="xl:flex-[0.75] w-full bg-[#0f0c24] border border-white/5 p-10 rounded-2xl relative overflow-hidden"
      >
        {/* decorative glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#915eff]/8 rounded-full blur-3xl pointer-events-none" />

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} mt-1 mb-8`}>Contact.</h3>

        {/* Email card */}
        <a
          href="mailto:diamandouj@gmail.com"
          className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/3 hover:border-[#915eff]/40 hover:bg-[#915eff]/5 transition-all duration-300 mb-8"
        >
          <div className="w-11 h-11 rounded-xl bg-[#915eff]/15 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#915eff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <p className="text-secondary text-xs uppercase tracking-wider mb-0.5">
              Email
            </p>
            <p className="text-white font-medium group-hover:text-[#dfd9ff] transition-colors">
              diamandouj@gmail.com
            </p>
          </div>
        </a>

        {/* Social links */}
        <p className="text-secondary text-sm uppercase tracking-wider mb-4">
          Find me on
        </p>
        <div className="flex gap-4">
          {socialLinks.map(({ href, icon, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/3 ${color} hover:bg-white/8 transition-all duration-300 hover:scale-105`}
            >
              <img src={icon} alt={label} className="w-6 h-6 object-contain" />
              <span className="text-white/80 text-sm font-medium hidden sm:block">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Availability badge */}
        <div className="mt-8 flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-60" />
          </div>
          <p className="text-secondary text-sm">Open to new opportunities</p>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] min-w-0"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
