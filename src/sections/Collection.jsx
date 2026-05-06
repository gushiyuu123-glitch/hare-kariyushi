import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./Collection.module.css";

const NEXT_SECTION_ID = "catalog";

/* 役割：Collection = この夏の気分（編集） */
const POINTS = [
  "風が抜ける、涼感のある織り",
  "汗ばむ日でも、肌に張りつきにくい",
  "白・藍・砂の3トーンで、夏を静かに整える",
];

const COLLECTION_IMAGES = [
  {
    no: "01",
    name: "AIR / IVORY",
    src: "/images/hare-collection-01.jpeg",
    className: "itemA",
    delay: 140,
    direction: "deep",
    alt: "アイボリーのかりゆしウェアを静かに見せるコレクション写真",
    sizes: "(max-width: 980px) 100vw, 48vw",
  },
  {
    no: "02",
    name: "QUIET / INDIGO",
    src: "/images/hare-collection-02.jpeg",
    className: "itemB",
    delay: 220,
    direction: "soft",
    alt: "インディゴカラーのかりゆしウェアのディテール写真",
    sizes: "(max-width: 980px) 100vw, 30vw",
  },
  {
    no: "03",
    name: "LIGHT / SAND",
    src: "/images/hare-collection-03.jpeg",
    className: "itemC",
    delay: 300,
    direction: "soft",
    alt: "軽やかな夏の装いを表現したかりゆしウェアの写真",
    sizes: "(max-width: 980px) 100vw, 42vw",
  },
];

export default function Collection() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  return (
    <section
      id="collection"
      ref={ref}
      className={`${styles.collection} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-label="HARE collection"
    >
      <div className={styles.inner}>
        <Reveal
          as="p"
          className={styles.runningHead}
          delay={0}
          direction="still"
        >
          SELECTED SUMMER EDIT / HARE
        </Reveal>

        <div className={styles.layout}>
          <header className={styles.header}>
            <Reveal as="h2" className={styles.title} delay={80} direction="deep">
              風が通る。
              <br />
              夏の気分を、<br />軽く。
            </Reveal>

            <Reveal as="p" className={styles.lead} delay={180}>
              暑い日ほど、装いの“整い”が残るものを。
            </Reveal>

            <Reveal as="ul" className={styles.points} delay={260}>
              {POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </Reveal>

            <Reveal
              as="p"
              className={styles.footLink}
              delay={360}
              direction="still"
            >
              <a className={styles.footAnchor} href={`#${NEXT_SECTION_ID}`}>
                <span className={styles.footText}>Catalog</span>
              </a>
            </Reveal>
          </header>

          <div className={styles.stage} aria-label="Collection gallery">
            {COLLECTION_IMAGES.map((item) => (
              <Reveal
                key={item.no}
                as="figure"
                className={`${styles.item} ${styles[item.className]}`}
                delay={item.delay}
                direction={item.direction}
              >
                <div className={styles.media}>
                  <img
                    className={styles.image}
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    sizes={item.sizes}
                  />
                </div>

                <figcaption className={styles.caption}>
                  <span className={styles.capNo}>{item.no}</span>
                  <span className={styles.capText}>{item.name}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          as="div"
          className={styles.bottomLine}
          delay={420}
          direction="still"
        />
      </div>
    </section>
  );
}