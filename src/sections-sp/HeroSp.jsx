import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./HeroSp.module.css";

const HERO_IMG = "/images/hare-hero-shirt.jpeg";
const WORDMARK_SVG = "/images/HARE.svg";

const COPY = {
  kicker: "KARIYUSHI WEAR / OKINAWA",
  sub: "SELECTED STOCKISTS",
  lead: "仕事にも、街にも。沖縄の暑さを、風が通る一枚で。",
};

const NAV_ITEMS = [
  { id: "collection", label: "Collection", delay: "520ms" },
  { id: "catalog", label: "Catalog", delay: "600ms" },
  { id: "guide", label: "Guide", delay: "680ms" },
  { id: "stockists", label: "Stockists", delay: "760ms" },
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const done = () => {
      if (settled) return;
      settled = true;
      resolve(true);
    };

    img.onload = done;
    img.onerror = done;
    img.src = src;

    if (img.decode) {
      img.decode().then(done).catch(done);
    }
  });
}

export default function HeroSp() {
  const reduced = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [sheenReady, setSheenReady] = useState(false);

  useEffect(() => {
    let alive = true;

    if (reduced) {
      setSheenReady(true);
      setReady(true);

      return () => {
        alive = false;
      };
    }

    (async () => {
      await Promise.all([preloadImage(WORDMARK_SVG), preloadImage(HERO_IMG)]);
      if (!alive) return;

      setSheenReady(true);

      requestAnimationFrame(() => {
        if (!alive) return;
        setReady(true);
      });
    })();

    return () => {
      alive = false;
    };
  }, [reduced]);

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

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="HARE KARIYUSHI hero"
      data-hero-ready={ready ? "true" : "false"}
      data-sheen-ready={sheenReady ? "true" : "false"}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.kicker} data-intro style={{ "--d": "0ms" }}>
            {COPY.kicker}
          </p>

          <h1
            className={styles.title}
            data-intro="wordmark"
            style={{ "--d": "90ms" }}
          >
            <span className={styles.srOnly}>HARE</span>

            <img
              className={styles.wordmarkImg}
              src={WORDMARK_SVG}
              alt=""
              aria-hidden="true"
              decoding="async"
              draggable="false"
            />

            <span className={styles.wordmarkSheen} aria-hidden="true" />
          </h1>

          <p className={styles.sub} data-intro style={{ "--d": "240ms" }}>
            {COPY.sub}
          </p>

          <p className={styles.lead} data-intro style={{ "--d": "340ms" }}>
            {COPY.lead}
          </p>

          <nav className={styles.menu} aria-label="HARE navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.menuItem}
                data-intro
                style={{ "--d": item.delay }}
                onClick={() => scrollTo(item.id)}
              >
                <span className={styles.menuLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div
          className={styles.right}
          data-intro
          style={{ "--d": "420ms" }}
          aria-hidden="true"
        >
          <img
            className={styles.image}
            src={HERO_IMG}
            alt=""
            decoding="async"
            fetchPriority="high"
            draggable="false"
          />
        </div>
      </div>

      <div
        className={styles.bottomLine}
        data-intro
        style={{ "--d": "900ms" }}
        aria-hidden="true"
      />
    </section>
  );
}