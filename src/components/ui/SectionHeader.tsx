import { motion, useReducedMotion } from 'motion/react';
import { ease } from '@/lib/motion';

/** Fila superior de sección: "01 ———— EL ESTÁNDAR" con línea que se dibuja. */
export function SectionHeader({ index, label }: { index?: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative mb-12 flex items-center justify-between pt-5 md:mb-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-line"
        variants={{ hidden: { scaleX: reduce ? 1 : 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 1.4, ease: ease.disclosure }}
      />
      <span className="eyebrow text-lime">{index ?? '—'}</span>
      <span className="eyebrow text-muted">{label}</span>
    </motion.div>
  );
}
