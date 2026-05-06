import { forwardRef, useMemo } from "react";

const DIRECTIONS = new Set(["soft", "deep", "still"]);

function toDelayValue(delay) {
  if (typeof delay === "number") return `${delay}ms`;
  if (typeof delay === "string") return delay;
  return "0ms";
}

const Reveal = forwardRef(function Reveal(
  {
    as: Tag = "div",
    delay = 0,
    direction = "soft", // soft | deep | still
    enabled = true,     // ← 追加：reveal無効化
    className = "",
    style,
    children,
    ...rest
  },
  ref
) {
  const safeDirection = DIRECTIONS.has(direction) ? direction : "soft";

  // delayはデフォルト値、style側で "--d" を上書きできるようにする
  const mergedStyle = useMemo(() => {
    const base = { "--d": toDelayValue(delay) };
    return style ? { ...base, ...style } : base;
  }, [delay, style]);

  return (
    <Tag
      ref={ref}
      {...(enabled ? { "data-reveal": "" } : {})}
      data-dir={enabled ? safeDirection : undefined}
      className={className}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Reveal.displayName = "Reveal";

export default Reveal;