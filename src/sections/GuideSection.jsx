import styles from "./GuideSection.module.css";

const SECTION_ID = "guide";
const SECTION_LABEL_ID = "guide-heading";

export default function GuideSection({ children }) {
  return (
    <section
      id={SECTION_ID}
      className={styles.guideSection}
      aria-labelledby={SECTION_LABEL_ID}
    >
      <div className={styles.inner}>
        <h2 id={SECTION_LABEL_ID} className={styles.srOnly}>
          Guide
        </h2>

        <div className={styles.band} aria-hidden="true">
          <span className={styles.bandLetter}>G</span>
          <span className={styles.bandNote}>HOW TO BUY</span>
        </div>

        <div className={styles.stack}>{children}</div>

        <div className={styles.bottomLine} aria-hidden="true" />
      </div>
    </section>
  );
}