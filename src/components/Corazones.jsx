import { useMemo } from "react";
import "./Corazones.css";

function Corazones() {
  const randomBetween = (min, max) => Math.random() * (max - min) + min;
  const corazones = useMemo(() =>
    Array.from({ length: 50 }).map(() => ({
      left: `${randomBetween(1, 98).toFixed(1)}%`,
      duration: `${randomBetween(9, 18).toFixed(1)}s`,
      delay: `${randomBetween(-12, 0).toFixed(1)}s`,
      size: `${randomBetween(16, 30).toFixed(1)}px`,
      opacity: (randomBetween(0.55, 0.85)).toFixed(2),
    })),
    []
  );

  return (
    <div className="corazones">
      {corazones.map((props, i) => (
        <span
          key={i}
          style={{
            left: props.left,
            animationDuration: props.duration,
            animationDelay: props.delay,
            fontSize: props.size,
            opacity: props.opacity,
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
}

export default Corazones