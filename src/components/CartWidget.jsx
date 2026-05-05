import styles from "./CartWidget.module.css";

const formatYen = (value) => `¥${value.toLocaleString("ja-JP")}`;

export default function CartWidget({
  cart,
  open,
  onToggle,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  total,
  count,
}) {
  const isEmpty = cart.length === 0;

  return (
    <div className={styles.cart} data-open={open ? "true" : "false"}>
      <button
        type="button"
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={open ? "true" : "false"}
        aria-controls="hare-cart-panel"
        aria-label={`Selected bag, ${count} items`}
      >
        <span className={styles.triggerKicker}>SELECTED</span>
        <span className={styles.triggerLabel}>BAG</span>
        <span className={styles.triggerCount}>{count}</span>
      </button>

      <button
        type="button"
        className={styles.scrim}
        onClick={onClose}
        aria-label="Close bag panel"
        tabIndex={open ? 0 : -1}
      />

      <aside
        id="hare-cart-panel"
        className={styles.panel}
        data-open={open ? "true" : "false"}
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
      >
        <div className={styles.panelHead}>
          <div className={styles.headText}>
            <p className={styles.kicker}>YOUR BAG</p>
            <p className={styles.summary}>
              {isEmpty ? "No items selected" : `${count} items selected`}
            </p>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {isEmpty ? (
          <div className={styles.emptyBlock}>
            <p className={styles.emptyLead}>
              気になる一枚を選ぶと、
              <br />
              ここに静かにまとまります。
            </p>

            <p className={styles.emptyNote}>SELECT FROM CATALOG</p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {cart.map((item) => (
                <li className={styles.item} key={item.no}>
                  <div className={styles.thumbWrap} aria-hidden="true">
                    <img className={styles.thumb} src={item.img} alt="" />
                  </div>

                  <div className={styles.itemBody}>
                    <div className={styles.itemTop}>
                      <div className={styles.itemCopy}>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.jp}>{item.jp}</p>
                      </div>

                      <p className={styles.price}>
                        {formatYen(item.priceValue * item.qty)}
                      </p>
                    </div>

                    <div className={styles.controls}>
                      <div className={styles.qty} aria-label={`${item.name} quantity`}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => onDecrease(item.no)}
                          aria-label={`${item.name}を1点減らす`}
                        >
                          −
                        </button>

                        <span className={styles.qtyValue}>{item.qty}</span>

                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => onIncrease(item.no)}
                          aria-label={`${item.name}を1点増やす`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => onRemove(item.no)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.total}>
              <span className={styles.totalLabel}>TOTAL</span>
              <strong className={styles.totalValue}>{formatYen(total)}</strong>
            </div>

            <button type="button" className={styles.checkout}>
              <span>PROCEED</span>
            </button>

            <button type="button" className={styles.clear} onClick={onClear}>
              CLEAR BAG
            </button>
          </>
        )}
      </aside>
    </div>
  );
}