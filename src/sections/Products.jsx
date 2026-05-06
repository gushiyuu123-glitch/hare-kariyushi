import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./Products.module.css";

const ITEMS = [
  {
    no: "01",
    name: "AIR IVORY",
    jp: "エア アイボリー",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-01.jpeg",
  },
  {
    no: "02",
    name: "QUIET INDIGO",
    jp: "クワイエット インディゴ",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-02.jpeg",
  },
  {
    no: "03",
    name: "LIGHT SAND",
    jp: "ライト サンド",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-03.jpeg",
  },
  {
    no: "04",
    name: "BREEZE STRIPE",
    jp: "ブリーズ ストライプ",
    price: "¥14,800",
    priceValue: 14800,
    img: "/images/hare-item-04.jpeg",
  },
  {
    no: "05",
    name: "SEAFOAM BLUE",
    jp: "シーフォーム ブルー",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-05.jpeg",
  },
  {
    no: "06",
    name: "CALM OLIVE",
    jp: "カーム オリーブ",
    price: "¥13,800",
    priceValue: 13800,
    img: "/images/hare-item-06.jpeg",
  },
  {
    no: "07",
    name: "NIGHT NAVY",
    jp: "ナイト ネイビー",
    price: "¥14,800",
    priceValue: 14800,
    img: "/images/hare-item-08.jpeg",
  },
  {
    no: "08",
    name: "PURE WHITE",
    jp: "ピュア ホワイト",
    price: "¥12,800",
    priceValue: 12800,
    img: "/images/hare-item-07.jpeg",
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
      <div className={styles.product}>
        <div className={styles.media}>
          <img
            className={styles.image}
            src={item.img}
            alt={`${item.name} / ${item.jp}`}
            decoding="async"
            loading="lazy"
            draggable="false"
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
            aria-label={`${item.name} をバッグに追加`}
          >
            <span>BAGに入れる</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function Products({ onAddToCart }) {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  const topItems = ITEMS.slice(0, 4);
  const bottomItems = ITEMS.slice(4);

  return (
    <div
      id="catalog"
      ref={ref}
      className={`${styles.products} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-label="HARE catalog items"
    >
      <Reveal as="p" className={styles.meta} delay={0} direction="still">
        08 ITEMS / SUMMER EDIT
        <br />
        S–XL / LIMITED PRODUCTION
      </Reveal>

      <div className={styles.rows} aria-label="Catalog rows">
        <div className={styles.grid} aria-label="Product grid row 1">
          {topItems.map((item, index) => (
            <ProductCard
              key={item.no}
              item={item}
              index={index}
              onAdd={onAddToCart}
            />
          ))}
        </div>

        <Reveal
          as="div"
          className={styles.rowLine}
          aria-hidden="true"
          delay={390}
          direction="still"
        />

        <div className={styles.grid} aria-label="Product grid row 2">
          {bottomItems.map((item, index) => (
            <ProductCard
              key={item.no}
              item={item}
              index={index + 4}
              onAdd={onAddToCart}
            />
          ))}
        </div>
      </div>

      <div className={styles.moreRow}>
        <Reveal
          as="button"
          type="button"
          className={styles.more}
          aria-label="More products demo"
          delay={760}
          direction="still"
        >
          <span>MORE</span>
        </Reveal>
      </div>

      <div className={styles.bottomLine} aria-hidden="true" />
    </div>
  );
}