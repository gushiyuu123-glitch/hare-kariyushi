import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./StockistsSp.module.css";

const STOCKISTS = [
  {
    area: "NAHA",
    name: "HARE Stockist Naha",
    addr: "沖縄県那覇市 ○○○ 1-2-3",
    hours: "11:00 — 19:00",
    note: "取り扱い：一部アイテム",
  },
  {
    area: "URASOE",
    name: "HARE Stockist Urasoe",
    addr: "沖縄県浦添市 ○○○ 4-5-6",
    hours: "10:00 — 18:00",
    note: "取り扱い：定番中心",
  },
  {
    area: "CHATAN",
    name: "HARE Stockist Chatan",
    addr: "沖縄県中頭郡北谷町 ○○○ 7-8-9",
    hours: "12:00 — 20:00",
    note: "取り扱い：季節編集",
  },
];

const onDummy = (e) => {
  e.preventDefault?.();
  e.stopPropagation?.();
};

export default function StockistsSp() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  const proofImg = "/images/hare-stockists-proof.jpeg";

  return (
    <section
      id="stockists"
      ref={ref}
      className={`${styles.stockists} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="stockists-title"
    >
      <div className={styles.inner}>
        <Reveal as="p" className={styles.meta} delay={0} direction="still">
          STOCKISTS / OKINAWA
        </Reveal>

        <div className={styles.frame}>
          <div className={styles.copy}>
            <Reveal
              as="h2"
              id="stockists-title"
              className={styles.title}
              delay={90}
              direction="deep"
            >
              実在する場所で、
              <br />
              確かめられる。
            </Reveal>

            <Reveal as="p" className={styles.lead} delay={190}>
              取り扱い店舗では、生地感や襟元の立ち上がりをそのまま確認できます。
              在庫は変動するため、来店前にご確認ください。
            </Reveal>

            <Reveal as="p" className={styles.hint} delay={270} direction="still">
              * 店舗情報はサンプルです。実データに差し替えて完成。
            </Reveal>
          </div>

          <div className={styles.stage} aria-label="Stockists proof photo">
            <img
              className={styles.stageImg}
              src={proofImg}
              alt=""
              loading="lazy"
              decoding="async"
              draggable="false"
              sizes="100vw"
            />

            <div className={styles.stageVeil} aria-hidden="true" />

            <Reveal
              as="div"
              className={styles.overlayShell}
              delay={320}
              direction="deep"
            >
              <dl className={styles.table}>
                {STOCKISTS.map((stockist, index) => (
                  <div className={styles.row} key={`${stockist.area}-${index}`}>
                    <dt className={styles.left}>
                      <span className={styles.area}>{stockist.area}</span>
                      <span className={styles.name}>{stockist.name}</span>
                    </dt>

                    <dd className={styles.right}>
                      <p className={styles.addr}>{stockist.addr}</p>

                      <p className={styles.metaRow}>
                        <span className={styles.hours}>{stockist.hours}</span>
                        <span className={styles.dot} aria-hidden="true" />
                        <span className={styles.note}>{stockist.note}</span>
                      </p>

                      <a
                        href="#"
                        className={styles.map}
                        data-dummy
                        onClick={onDummy}
                        aria-label={`Open map for ${stockist.name} (dummy)`}
                      >
                        MAP <span aria-hidden="true">→</span>
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal
          as="div"
          className={styles.bottomLine}
          aria-hidden="true"
          delay={860}
          direction="still"
        />
      </div>
    </section>
  );
}