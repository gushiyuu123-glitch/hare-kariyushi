import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./RightMenuSp.module.css";

const MENU_ITEMS = [
  { id: "collection", label: "Collection", no: "01" },
  { id: "catalog", label: "Catalog", no: "02" },
  { id: "guide", label: "Guide", no: "03" },
  { id: "stockists", label: "Stockists", no: "04" },
  { id: "inquiry", label: "Inquiry", no: "05" },
];

export default function RightMenuSp({ forceHidden = false }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [passedHero, setPassedHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setPassedHero(true);
        return;
      }

      const rect = hero.getBoundingClientRect();
      setPassedHero(rect.bottom <= window.innerHeight * 0.55);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setAtFooter(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: "0px 0px -60% 0px",
      }
    );

    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const hidden = forceHidden || !passedHero || atFooter;

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

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
    <>
      <button
        type="button"
        className={styles.btn}
        data-hidden={hidden ? "true" : "false"}
        aria-label="Open menu"
        aria-expanded={open ? "true" : "false"}
        aria-controls="sp-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.word}>MENU</span>
      </button>

      <div
        className={styles.overlay}
        data-open={open ? "true" : "false"}
        aria-hidden={open ? undefined : "true"}
        onClick={() => setOpen(false)}
      >
        <aside
          id="sp-menu"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Page menu"
          onClick={(e) => e.stopPropagation()}
        >
          <header className={styles.head}>
            <button
              type="button"
              className={styles.top}
              onClick={() => {
                setOpen(false);
                onTop();
              }}
            >
              <img
                className={styles.logo}
                src="/images/HARE.svg"
                alt=""
                aria-hidden="true"
                decoding="async"
                draggable="false"
              />
            </button>

            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </header>

          <nav className={styles.list} aria-label="Sections">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={styles.item}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  scrollTo(item.id);
                }}
              >
                <span className={styles.no}>{item.no}</span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}