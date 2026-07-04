/* eslint-disable react/prop-types -- presentational helper */

/**
 * Infinite marquee. Content is duplicated once; CSS animates -50%.
 */
const Marquee = ({ children, speed = 40, className = "", pauseOnHover = false }) => (
  <div
    className={`overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
    aria-hidden="true"
  >
    <div className="marquee-track" style={{ "--marquee-speed": `${speed}s` }}>
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center">{children}</div>
    </div>
  </div>
);

export default Marquee;
