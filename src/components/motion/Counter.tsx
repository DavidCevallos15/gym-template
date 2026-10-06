import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type Props = { to: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; className?: string };

const fmt = (n: number, decimals: number) =>
  n.toLocaleString('es-EC', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Count-up cuando entra en viewport. */
export function Counter({ to, duration = 1.8, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{fmt(val, decimals)}{suffix}
    </span>
  );
}
