import styles from "./ProductsSectionSp.module.css";

const SECTION_ID = "catalog";
const SECTION_LABEL_ID = "catalog-heading";

export default function ProductsSectionSp({ children }) {
  return (
    <section
      id={SECTION_ID}
      className={styles.productsSection}
      aria-labelledby={SECTION_LABEL_ID}
    >
      <div className={styles.inner}>
        <h2 id={SECTION_LABEL_ID} className={styles.srOnly}>
          Catalog
        </h2>

        {/* SPは箱UIにしない。編集の“見出し”だけ置く */}
        <div className={styles.band} aria-hidden="true">
          <span className={styles.bandWord}>CATALOG</span>
          <span className={styles.bandNote}>LIMITED PRODUCTION</span>
        </div>

        <div className={styles.stack}>{children}</div>

        <div className={styles.bottomLine} aria-hidden="true" />
      </div>
    </section>
  );
}