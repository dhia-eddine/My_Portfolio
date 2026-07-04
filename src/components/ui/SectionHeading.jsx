/* eslint-disable react/prop-types -- presentational helper */
import { RevealLines, FadeUp } from "./Reveal";
import { styles } from "../../styles";

/**
 * Standard section header: hairline top rule, mono index + eyebrow,
 * then a masked-reveal display heading.
 */
const SectionHeading = ({ index, eyebrow, lines, className = "" }) => (
  <div className={className}>
    <FadeUp
      y={0}
      className="flex items-baseline justify-between border-t hairline pt-5"
    >
      <span className="eyebrow">{eyebrow}</span>
      <span className="font-mono text-[11px] tracking-[0.22em] text-mute">
        /{index}
      </span>
    </FadeUp>
    <RevealLines
      as="h2"
      lines={lines}
      className={`${styles.sectionHeadText} mt-8`}
    />
  </div>
);

export default SectionHeading;
