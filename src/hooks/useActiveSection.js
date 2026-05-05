import { useEffect, useMemo, useRef, useState } from "react";

export function useActiveSection(
  ids,
  { rootMargin = "-42% 0px -54% 0px" } = {}
) {
  const safeIds = ids || [];
  const [activeId, setActiveId] = useState(safeIds[0] ?? null);

  // ratio保持（全体の状態を持つ）
  const ratiosRef = useRef(new Map());
  const activeIdRef = useRef(activeId);

  // ids配列の参照変化で毎回貼り直しにならないようキー化
  const idsKey = useMemo(() => safeIds.join("|"), [safeIds]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const els = safeIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    // idsが変わった時：activeが対象外なら先頭へ
    setActiveId((prev) => (safeIds.includes(prev) ? prev : safeIds[0] ?? null));

    // 初期化
    ratiosRef.current = new Map(els.map((el) => [el.id, 0]));

    if (typeof IntersectionObserver === "undefined") {
      // 非対応なら先頭固定（保険）
      setActiveId(safeIds[0] ?? null);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // 変化した分だけ更新
        for (const e of entries) {
          ratiosRef.current.set(
            e.target.id,
            e.isIntersecting ? e.intersectionRatio : 0
          );
        }

        // 全体から最大を選ぶ（=安定）
        let bestId = activeIdRef.current;
        let best = bestId ? (ratiosRef.current.get(bestId) ?? 0) : 0;

        for (const [id, r] of ratiosRef.current.entries()) {
          if (r > best) {
            best = r;
            bestId = id;
          }
        }

        if (bestId && bestId !== activeIdRef.current) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [idsKey, rootMargin]);

  return activeId;
}