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
          className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-white/5 bg-white/3 hover:border-[#915eff]/40 hover:bg-[#915eff]/5 transition-all duration-300 mb-4"
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
          <div className="flex-1 min-w-0">
            <p className="text-secondary text-xs uppercase tracking-wider mb-0.5">
              Email
            </p>
            <p className="text-white font-medium group-hover:text-[#dfd9ff] transition-colors text-sm sm:text-base truncate">
              diamandouj@gmail.com
            </p>
          </div>
          <svg
            className="shrink-0 text-white/20 group-hover:text-[#915eff] transition-colors"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        {/* Phone card */}
        <div className="group p-4 sm:p-5 rounded-xl border border-white/5 bg-white/3 hover:border-[#915eff]/40 hover:bg-[#915eff]/5 transition-all duration-300 mb-4 sm:mb-8">
          {/* Icon + number on same row always */}
          <div className="flex items-center gap-4 mb-3">
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-secondary text-xs uppercase tracking-wider mb-0.5">
                Phone
              </p>
              <p className="text-white font-medium text-sm sm:text-base">
                +216 53368171
              </p>
            </div>
          </div>
          {/* Buttons below */}
          <div className="flex gap-2">
            <a
              href="tel:+21653368171"
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-white/80 text-xs font-medium">Call</span>
            </a>
            <a
              href="https://wa.me/21653368171"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 32 32" fill="#25D366">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.418-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.852l-.486-.29-5.002 1.193 1.216-4.87-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.778c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.63-.199-.896.199-.265.398-1.028 1.294-1.26 1.56-.232.265-.464.298-.862.1-.398-.2-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.36-2.213-2.758-.232-.398-.025-.614.174-.812.179-.178.398-.464.597-.696.2-.232.266-.398.398-.663.133-.265.067-.497-.033-.696-.1-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.763-.013c-.265 0-.696.1-1.061.497-.365.398-1.393 1.361-1.393 3.32s1.427 3.852 1.626 4.117c.2.265 2.808 4.285 6.804 6.011.951.41 1.693.655 2.272.838.954.303 1.823.26 2.51.158.766-.114 2.354-.962 2.687-1.891.332-.93.332-1.727.232-1.891-.099-.166-.365-.265-.763-.464z" />
              </svg>
              <span className="text-[#25D366] text-xs font-medium">
                WhatsApp
              </span>
            </a>
          </div>
        </div>

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
