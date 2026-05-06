import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useReveal({
  threshold = 0.16,
  rootMargin = "0px 0px -14% 0px",
  once = true,
  enabled = true, // ←追加：無効化できる
} = {}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  // thresholdが配列でも安定させる（配列リテラルの再生成対策）
  const thresholdKey = useMemo(() => {
    if (Array.isArray(threshold)) return threshold.join(",");
    return String(threshold);
  }, [threshold]);

  // optionsが毎回変わって監視が張り直されないように固定
  const opts = useMemo(
    () => ({
      threshold: Array.isArray(threshold)
        ? threshold.map((v) => Number(v))
        : Number(threshold),
      rootMargin,
    }),
    [thresholdKey, rootMargin]
  );

  useEffect(() => {
    // 無効・reduced は即表示
    if (!enabled || reduced) {
      setShow(true);
      return;
    }

    // once で既に表示済みなら監視不要
    if (once && show) return;

    const el = ref.current;
    if (!el) return;

    // IO非対応環境は即表示（保険）
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    let done = false;

    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      // ちらつき防止：一度だけ確定
      if (!entry.isIntersecting || done) return;

      done = true;
      setShow(true);

      if (once) {
        io.unobserve(el);
        io.disconnect();
      }
    }, opts);

    io.observe(el);

    return () => {
      io.unobserve(el);
      io.disconnect();
    };
  }, [enabled, reduced, once, show, opts]);

  return { ref, show, reduced };
}