import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ease, dur } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Props = {
  lines: readonly string[];
  /** Índices de líneas que van en color acento. */
  accent?: readonly number[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
};

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };

/**
 * Titular por líneas: cada línea sube desde una máscara (overflow-hidden).
 * El trigger de viewport vive en el contenedor (las líneas empiezan recortadas
 * por la máscara, así que un IntersectionObserver sobre ellas nunca dispararía).
 */
export function MaskedLines({ lines, accent = [1], className, as = 'h2', delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];
  const line: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: '105%' },
    show: (i: number) => ({
      ...(reduce ? { opacity: 1 } : { y: '0%' }),
      transition: { duration: dur.reveal, ease: ease.disclosure, delay: delay + i * 0.08 },
    }),
  };

  return (
    <Tag
      className={cn('display', className)}
      aria-label={lines.join(' ')}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {lines.map((text, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden>
          <motion.span custom={i} variants={line} className={cn('block', accent.includes(i) ? 'text-lime' : 'text-fg')}>
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
