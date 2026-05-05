import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useReveal({
  threshold = 0.16,
  rootMargin = "0px 0px -14% 0px",
  once = true,
} = {}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  // optionsが毎回変わって監視が張り直されないように固定
  const opts = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    if (reduced) return void setShow(true);

    const el = ref.current;
    if (!el) return;

    // IO非対応環境は即表示（保険）
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShow(true);
      if (once) io.disconnect();
    }, opts);

    io.observe(el);
    return () => io.disconnect();
  }, [reduced, once, opts]);

  return { ref, show, reduced };
}