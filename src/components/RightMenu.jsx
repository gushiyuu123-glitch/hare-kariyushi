import { useCallback } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./RightMenu.module.css";

const MENU_ITEMS = [
  { id: "collection", label: "Collection", no: "01" },
  { id: "catalog", label: "Catalog", no: "02" },
  { id: "guide", label: "Guide", no: "03" },
  { id: "stockists", label: "Stockists", no: "04" },
  { id: "inquiry", label: "Inquiry", no: "05" },
];

const SECTION_IDS = ["hero", ...MENU_ITEMS.map((item) => item.id), "footer"];

export default function RightMenu({ forceHidden = false }) {
  const reduced = useReducedMotion();

  const activeId = useActiveSection(SECTION_IDS, {
    rootMargin: "-42% 0px -54% 0px",
  });

const hidden = forceHidden || activeId === "hero" || activeId === "footer" || !activeId;

  const scrollTo = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced]
  );

  const onTop = useCallback(() => {
    const hero = document.getElementById("hero");
    const behavior = reduced ? "auto" : "smooth";

    if (hero) {
      hero.scrollIntoView({ behavior, block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior });
  }, [reduced]);

  return (
    <nav
      className={`${styles.menu} ${hidden ? styles.hidden : ""}`}
      aria-label="Page menu"
      aria-hidden={hidden ? "true" : undefined}
      inert={hidden ? "" : undefined}
    >
      <div className={styles.head}>
        <button
          type="button"
          className={styles.brand}
          onClick={onTop}
          aria-label="Back to top"
          tabIndex={hidden ? -1 : 0}
        >
          <img
            className={styles.brandLogo}
            src="/images/HARE.svg"
            alt=""
            aria-hidden="true"
            decoding="async"
            draggable="false"
          />
        </button>

        <p className={styles.kicker}>MENU</p>
      </div>

      <div className={styles.list}>
        {MENU_ITEMS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.item}
              data-active={isActive ? "true" : "false"}
              aria-current={isActive ? "location" : undefined}
              tabIndex={hidden ? -1 : 0}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(item.id);
              }}
            >
              <span className={styles.no}>{item.no}</span>
              <span className={styles.txt}>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}