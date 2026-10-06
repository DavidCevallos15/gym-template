import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { ease, dur } from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Entrada on-view base: fade + translateY. Se ejecuta una sola vez. */
export function Reveal({ delay = 0, y = 28, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0.3 : dur.reveal, ease: ease.reveal, delay }}
      {...props}
    />
  );
}
