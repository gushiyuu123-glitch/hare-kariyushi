import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./ConceptSp.module.css";

const PROOF_IMG = "/images/hare-concept-collar.jpeg"; // ← 変更しない

export default function ConceptSp() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  return (
    <section
      id="concept"
      ref={ref}
      className={`${styles.concept} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="concept-title"
    >
      <div className={styles.bg} aria-hidden="true">
        <img
          className={styles.bgImg}
          src={PROOF_IMG}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <div className={styles.bgVeil} />
      </div>

      <Reveal as="p" className={styles.runningHead} delay={0} direction="still">
        BRAND STATEMENT / HARE
      </Reveal>

      <div className={styles.content}>
        <div className={styles.copy}>
          <Reveal as="h2" id="concept-title" className={styles.title} delay={80} direction="deep">
            涼感、端正。
          </Reveal>

          <Reveal as="p" className={styles.body} delay={180}>
            HAREのかりゆしは、沖縄の暑さに負けない涼しさを軸に、
            街でも仕事でも印象が崩れない佇まいを仕立てています。
          </Reveal>

          <Reveal as="p" className={styles.body} delay={260}>
            襟元の立ち上がり、ボタンの間隔、縫いのライン。
            近づくほど、端正さの理由が見えてくる。
            夏の一枚を、軽やかに、品よく。
          </Reveal>

          <Reveal as="p" className={styles.bodyMuted} delay={340}>
            派手に語らない。けれど、着た瞬間に違いが残る。
          </Reveal>

          <Reveal as="p" className={styles.sign} delay={420} direction="still">
            — HARE KARIYUSHI
          </Reveal>
        </div>

        <Reveal as="p" className={styles.proofTag} delay={300} direction="still">
          PROOF — COLLAR
        </Reveal>
      </div>

      <Reveal as="div" className={styles.bottomLine} delay={520} direction="still" aria-hidden="true" />
    </section>
  );
}