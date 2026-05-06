import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./ProductsSp.module.css";

const ITEMS = [
  {
    no: "01",
    name: "AIR IVORY",
    jp: "エア アイボリー",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-01.jpeg",
    pos: "52% 46%",
  },
  {
    no: "02",
    name: "QUIET INDIGO",
    jp: "クワイエット インディゴ",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-02.jpeg",
    pos: "50% 36%",
  },
  {
    no: "03",
    name: "LIGHT SAND",
    jp: "ライト サンド",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-03.jpeg",
    pos: "56% 46%",
  },
  {
    no: "04",
    name: "BREEZE STRIPE",
    jp: "ブリーズ ストライプ",
    price: "¥14,800",
    priceValue: 14800,
    img: "/images/hare-item-04.jpeg",
    pos: "50% 42%",
  },
  {
    no: "05",
    name: "SEAFOAM BLUE",
    jp: "シーフォーム ブルー",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-05.jpeg",
    pos: "52% 44%",
  },
  {
    no: "06",
    name: "CALM OLIVE",
    jp: "カーム オリーブ",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-06.jpeg",
    pos: "50% 46%",
  },
  {
    no: "07",
    name: "NIGHT NAVY",
    jp: "ナイト ネイビー",
    price: "¥14,800",
    priceValue: 14800,
    img: "/images/hare-item-08.jpeg",
    pos: "50% 42%",
  },
  {
    no: "08",
    name: "PURE WHITE",
    jp: "ピュア ホワイト",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-07.jpeg",
    pos: "52% 44%",
  },
];

function ProductCard({ item, index, onAdd }) {
  return (
    <Reveal
      as="article"
      className={styles.card}
      delay={120 + index * 60}
      direction="deep"
    >
      <div className={styles.media}>
        <img
          className={styles.image}
          src={item.img}
          alt={`${item.name} / ${item.jp}`}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{ "--pos": item.pos }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.row1}>
          <span className={styles.no}>{item.no}</span>
          <span className={styles.price}>{item.price}</span>
        </div>

        <p className={styles.name}>{item.name}</p>
        <p className={styles.jp}>{item.jp}</p>

        <button
          type="button"
          className={styles.buy}
          onClick={() => onAdd(item)}
        >
          <span className={styles.buyLabel}>購入する</span>
          <span className={styles.buyMark} aria-hidden="true">
            +
          </span>
        </button>
      </div>
    </Reveal>
  );
}

export default function ProductsSp({ onAddToCart }) {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  return (
    <div
      ref={ref}
      className={`${styles.products} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-label="HARE catalog items"
    >
      <div className={styles.metaRow}>
        <Reveal as="p" className={styles.meta} delay={0} direction="still">
          08 ITEMS / SUMMER EDIT
        </Reveal>

        <Reveal as="p" className={styles.hint} delay={80} direction="still">
          TAP TO ADD
        </Reveal>
      </div>

      <div className={styles.grid} aria-label="Product grid">
        {ITEMS.map((item, index) => (
          <ProductCard
            key={item.no}
            item={item}
            index={index}
            onAdd={onAddToCart}
          />
        ))}
      </div>

      <div className={styles.moreRow}>
        <Reveal
          as="button"
          type="button"
          className={styles.more}
          aria-label="More products demo"
          delay={520}
          direction="still"
        >
          <span>MORE</span>
          <span className={styles.moreIcon} aria-hidden="true">
            →
          </span>
        </Reveal>
      </div>

      <div className={styles.bottomLine} aria-hidden="true" />
    </div>
  );
}