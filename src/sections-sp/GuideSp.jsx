import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./GuideSp.module.css";

const GUIDE_ITEMS = [
  {
    id: "size",
    en: "SIZE",
    jp: "サイズ",
    body: "サイズ表は各商品の説明に記載しています。迷った場合は“普段のサイズ感”を添えてご相談ください。",
  },
  {
    id: "shipping",
    en: "SHIPPING",
    jp: "発送",
    body: "ご注文から通常 2〜5 営業日を目安に発送します。離島・混雑時は前後する場合があります。サイズ違いは到着後7日以内に承ります。",
  },
  {
    id: "payment",
    en: "PAYMENT",
    jp: "お支払い",
    body: "主要なお支払い方法に対応。領収書が必要な場合はお問い合わせでご相談ください。",
  },
  {
    id: "care",
    en: "CARE",
    jp: "お手入れ",
    body: "ネット使用・弱水流・陰干し推奨。夏の一枚が長く整って見えるよう、型崩れを抑えます。",
  },
];

export default function GuideSp() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  return (
    <div
      ref={ref}
      className={`${styles.guide} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="guide-content-title"
    >
      <div className={styles.inner}>
        <Reveal as="p" className={styles.meta} delay={0} direction="still">
          GUIDE / HOW TO BUY
        </Reveal>

        <header className={styles.header}>
          <Reveal
            as="h2"
            id="guide-content-title"
            className={styles.title}
            delay={90}
            direction="deep"
          >
            迷わず、買える。
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={190}>
            サイズ、配送、支払い。気になる点は先に消しておきます。
          </Reveal>
        </header>

        <Reveal as="dl" className={styles.table} delay={280} direction="deep">
          {GUIDE_ITEMS.map((item) => (
            <div key={item.id} className={styles.row}>
              <dt className={styles.key}>
                <span className={styles.keyEn}>{item.en}</span>
                <span className={styles.keyJp}>{item.jp}</span>
              </dt>

              <dd className={styles.val}>{item.body}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" className={styles.support} delay={420} direction="still">
          <span className={styles.supportText}>
            サイズや在庫で迷った場合は、お問い合わせからご相談ください。
          </span>
        </Reveal>
      </div>
    </div>
  );
}