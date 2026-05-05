import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./Voices.module.css";

const VOICES = [
  {
    no: "01",
    quote: [
      "涼しいのに、だらしなく見えない。",
      "袖を通した瞬間に“整う”感じがある。",
    ],
    meta: "OFFICE / OKINAWA",
  },
  {
    no: "02",
    quote: [
      "生地が軽い。けれど薄すぎない。",
      "近くで見たときに、ちゃんと“品”が残る。",
    ],
    meta: "TRAVEL / SUMMER",
  },
  {
    no: "03",
    quote: [
      "暑い日の外出でも、肌に張りつかない。",
      "写真で見た空気が、そのまま着心地に出てる。",
    ],
    meta: "DAILY / CITY",
  },
];

export default function Voices() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  return (
    <section
      id="voices"
      ref={ref}
      className={`${styles.voices} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="voices-title"
    >
      <Reveal as="p" className={styles.meta} delay={0} direction="still">
        VOICES / QUIET NOTES
      </Reveal>

      <div className={styles.layout}>
        <div className={styles.list} aria-label="Testimonials">
          {VOICES.map((voice, index) => (
            <Reveal
              key={voice.no}
              as="article"
              className={styles.item}
              delay={170 + index * 90}
              direction="soft"
            >
              <span className={styles.line} aria-hidden="true" />

              <blockquote className={styles.quote}>
                <span className={styles.openMark} aria-hidden="true">
                  “
                </span>

                <span className={styles.quoteBody}>
                  {voice.quote.map((line) => (
                    <span className={styles.quoteLine} key={line}>
                      {line}
                    </span>
                  ))}
                </span>

                <span className={styles.closeMark} aria-hidden="true">
                  ”
                </span>
              </blockquote>

              <p className={styles.foot}>
                <span className={styles.no}>{voice.no}</span>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.note}>{voice.meta}</span>
              </p>
            </Reveal>
          ))}
        </div>

        <header className={styles.header}>
          <Reveal
            as="h2"
            id="voices-title"
            className={styles.title}
            delay={90}
            direction="deep"
          >
            「買ってよかった」は、
            <span className={styles.titleLine}>大きな声じゃなくていい。</span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={190}>
            着心地と印象のズレが少ないこと。
            その静かな一致が、選ばれる理由になります。
          </Reveal>

          <Reveal as="p" className={styles.sign} delay={290} direction="still">
            — QUIET TRUST
          </Reveal>
        </header>
      </div>

      <Reveal
        as="div"
        className={styles.bottomLine}
        aria-hidden="true"
        delay={680}
        direction="still"
      />
    </section>
  );
}