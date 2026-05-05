import { forwardRef } from "react";

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
    className = "",
    style,
    children,
    ...rest
  },
  ref
) {
  const safeDirection = DIRECTIONS.has(direction) ? direction : "soft";

  return (
    <Tag
      ref={ref}
      data-reveal
      data-dir={safeDirection}
      className={className}
      style={{
        ...style,
        "--d": toDelayValue(delay),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Reveal.displayName = "Reveal";

export default Reveal;