/* eslint-disable react/prop-types -- presentational helpers */
import { motion } from "framer-motion";
import { EASE } from "../../utils/motion";

/**
 * RevealLines — masked line-by-line reveal for headings.
 * The viewport trigger lives on the (never-translated) mask container;
 * the inner span animates via variants. Putting whileInView on the inner
 * span would never fire: translated 110% inside overflow-hidden, its
 * intersection area is always zero.
 */
export const RevealLines = ({
  lines,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.09,
  once = true,
  ...rest
}) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <motion.span
        key={i}
        className="mask-line"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-8% 0px" }}
      >
        <motion.span
          className="block will-change-transform"
          variants={{
            hidden: { y: "110%" },
            show: {
              y: "0%",
              transition: {
                duration: 1,
                ease: EASE,
                delay: delay + i * stagger,
              },
            },
          }}
        >
          {line}
        </motion.span>
      </motion.span>
    ))}
  </Tag>
);

/**
 * FadeUp — soft rise-in for body content.
 */
export const FadeUp = ({
  children,
  className = "",
  delay = 0,
  y = 32,
  once = true,
  ...rest
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-8% 0px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);
