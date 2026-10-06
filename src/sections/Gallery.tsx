import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { site, type PhotoSlot } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { Photo } from '@/components/ui/Photo';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';
import { useMediaQuery } from '@/lib/useMediaQuery';

const { gallery: g } = site;

// Distribución en 3 columnas con alturas variadas (bento/masonry)
const COLS: { items: number[]; aspects: string[]; speed: number; offset: string }[] = [
  { items: [0, 3], aspects: ['aspect-[4/5]', 'aspect-[4/3]'], speed: -60, offset: 'lg:mt-0' },
  { items: [1, 4, 6], aspects: ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]'], speed: -180, offset: 'lg:mt-24' },
  { items: [2, 5], aspects: ['aspect-[16/10]', 'aspect-[4/5]'], speed: -100, offset: 'lg:mt-10' },
];

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="px-section py-section overflow-hidden bg-ink">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal><p className="eyebrow mb-5 text-lime">{g.label}</p></Reveal>
          <MaskedLines lines={g.title} className="text-[clamp(3rem,7vw,6rem)]" />
        </div>
        <Reveal><p className="max-w-xs text-[13px] leading-relaxed text-muted md:text-right">{g.copy}</p></Reveal>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COLS.map((col, ci) => (
          <Column key={ci} progress={scrollYProgress} speed={col.speed} className={col.offset}>
            {col.items.map((idx, k) => (
              <Tile key={idx} slot={g.photos[idx]} tone={idx} aspect={col.aspects[k]} delay={ci * 0.08 + k * 0.1} />
            ))}
          </Column>
        ))}
      </div>
    </section>
  );
}

function Column({ progress, speed, className, children }: { progress: MotionValue<number>; speed: number; className?: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 1024px)'); // parallax por columna solo con 3 columnas
  const y = useTransform(progress, [0, 1], [0, reduce || !desktop ? 0 : speed]);
  return <motion.div style={{ y }} className={`flex flex-col gap-3 ${className ?? ''}`}>{children}</motion.div>;
}

function Tile({ slot, tone, aspect, delay }: { slot: PhotoSlot; tone: number; aspect: string; delay: number }) {
  const reduce = useReducedMotion();
  // El trigger va en el <figure> (sin clip): IntersectionObserver respeta clip-path,
  // así que un elemento recortado al 100% nunca entraría en viewport.
  return (
    <motion.figure
      className={`group relative overflow-hidden ${aspect}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="size-full"
        variants={{
          hidden: reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
          show: reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
        }}
        transition={{ duration: 1.1, ease: ease.disclosure, delay }}
      >
        <Photo slot={slot} tone={tone} className="size-full" imgClassName="transition-transform duration-700 ease-[var(--ease-reveal)] group-hover:scale-105" />
      </motion.div>
    </motion.figure>
  );
}
