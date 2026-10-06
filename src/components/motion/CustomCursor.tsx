import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * Cursor dot + ring. Dot sigue 1:1, ring con spring.
 * Solo en pointer:fine y sin reduced-motion. Crece sobre a/button/[data-cursor].
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const sync = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle('has-custom-cursor', mq.matches);
    };
    sync();
    mq.addEventListener('change', sync);
    if (!mq.matches) return () => mq.removeEventListener('change', sync);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const h = !!(e.target as Element | null)?.closest('a,button,input,select,label,[data-cursor]');
      if (h !== hoverRef.current) { hoverRef.current = h; setHover(h); }
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hover ? 1.9 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 size-8 rounded-full border border-lime/70 mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ scale: hover ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.16 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-lime"
      />
    </>
  );
}
