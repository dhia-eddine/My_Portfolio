import { styles } from "../styles";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section
        id={idName || undefined}
        className={`${styles.paddingX} ${styles.sectionY} max-w-[1680px] mx-auto relative scroll-mt-20`}
      >
        <Component />
      </section>
    );
  };

export default SectionWrapper;
