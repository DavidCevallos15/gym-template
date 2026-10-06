import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string };

/** Tween entre valores cuando cambia `value` (precios, resultados de calculadoras). */
export function AnimatedNumber({ value, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reduce) { setDisplay(value); from.current = value; return; }
    const c = animate(from.current, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { from.current = v; setDisplay(v); },
    });
    return () => c.stop();
  }, [value, reduce]);

  return (
    <span className={className} aria-live="polite">
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}
