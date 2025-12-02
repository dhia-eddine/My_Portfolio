import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { github, linkedin, instagram } from "../assets";

const Contact = () => {
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <br />
        <br /> <br />
        <br />
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <a
          href="mailto:diamandouj@gmail.com"
          className="text-white font-medium text-[18px] mt-4 block"
        >
          diamandouj@gmail.com
        </a>
        <br />
        <div className="flex gap-6 mt-4">
          <a
            href="https://github.com/dhia-eddine"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={github}
              alt="GitHub"
              className="w-10 h-10 object-contain"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/dhia-eddine-mandhouj/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={linkedin}
              alt="LinkedIn"
              className="w-10 h-10 object-contain"
            />
          </a>
          <a
            href="https://www.instagram.com/dia_mandouj/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-10 h-10 object-contain"
            />
          </a>
        </div>
        <br />
        <br />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
