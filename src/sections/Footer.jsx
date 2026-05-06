import styles from "./Footer.module.css";
import { useReducedMotion } from "../hooks/useReducedMotion";

import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";
import reveal from "../styles/SectionReveal.module.css";

const FOOTER_NAV = [
  { id: "collection", no: "01", label: "Collection" },
  { id: "catalog", no: "02", label: "Catalog" },
  { id: "guide", no: "03", label: "Guide" },
  { id: "stockists", no: "04", label: "Stockists" },
  { id: "inquiry", no: "05", label: "Inquiry" },
];

const INFO = [
  "KARIYUSHI WEAR / OKINAWA",
  "SELECTED SUMMER EDIT",
  "EDITORIAL COMMERCE SITE",
];

const DESIGNER = {
  name: "GUSHIKEN DESIGN",
  url: "https://gushikendesign.com/",
};

export default function Footer() {
  const reduced = useReducedMotion();

  const { ref, show } = useSectionReveal({
    threshold: 0.14,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const onTop = () => {
    const hero = document.getElementById("hero");

    if (hero) {
      hero.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <footer
      id="footer"
      ref={ref}
      className={`${styles.footer} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="footer-title"
    >
      <div className={styles.inner}>
        <h2 id="footer-title" className={styles.srOnly}>
          HARE footer
        </h2>

        <Reveal as="div" className={styles.top} delay={0} direction="deep">
          <div className={styles.brandBlock}>
            <button
              type="button"
              className={styles.brand}
              onClick={onTop}
              aria-label="Back to top"
            >
              <img
                className={styles.logo}
                src="/images/HARE.svg"
                alt=""
                aria-hidden="true"
                decoding="async"
                draggable="false"
              />
              <span className={styles.srOnly}>HARE</span>
            </button>

            <p className={styles.kicker}>KARIYUSHI WEAR / OKINAWA</p>
          </div>

          <div className={styles.statementBlock}>
<p className={styles.statement}>
  WEEKDAY SUMMER.
  <br />
  OKINAWA EDIT.
</p>
          </div>
        </Reveal>

        <Reveal as="div" className={styles.middle} delay={160} direction="deep">
          <nav className={styles.nav} aria-label="Footer navigation">
            <p className={styles.groupTitle}>PAGES</p>

            <div className={styles.navList}>
              {FOOTER_NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={styles.navItem}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  <span className={styles.navNo}>{item.no}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className={styles.info}>
            <p className={styles.groupTitle}>INFO</p>

            <ul className={styles.infoList}>
              {INFO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <p className={styles.groupTitle}>CONTACT</p>

            <p className={styles.contactText}>
              在庫、サイズ、取り扱い店舗について。
              <br />
              気になる点はお問い合わせください。
            </p>
          </div>
        </Reveal>

        <Reveal as="div" className={styles.creditRow} delay={300} direction="soft">
          <p className={styles.creditLead}>Designed and developed by</p>

          <a
            href={DESIGNER.url}
            className={styles.creditLink}
            target="_blank"
            rel="author noopener"
            aria-label={`${DESIGNER.name} official website`}
          >
            {DESIGNER.name}
          </a>
        </Reveal>

        <Reveal as="div" className={styles.bottom} delay={420} direction="still">
          <p className={styles.copy}>© 2026 HARE KARIYUSHI</p>

          <button type="button" className={styles.topButton} onClick={onTop}>
            BACK TO TOP
            <span aria-hidden="true">↑</span>
          </button>
        </Reveal>
      </div>
    </footer>
  );
}