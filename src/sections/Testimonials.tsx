import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { site } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Magnetic } from '@/components/motion/Magnetic';

const { testimonials: t } = site;
const AUTO_MS = 7000;

export function Testimonials() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = t.items.length;
  const go = useCallback((d: number) => set(([cur]) => [(cur + d + n) % n, d]), [n]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(id);
  }, [i, paused, reduce, go]);

  const item = t.items[i];
  const offset = reduce ? 0 : 60;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Testimonios"
      className="px-section py-section bg-lime text-ink [&_.eyebrow]:text-ink/70"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="[&_span.bg-line]:bg-ink/15"><SectionHeader index={t.index} label={t.label} /></div>
      <div className="mx-auto flex max-w-5xl items-center gap-4 md:gap-10">
        <Arrow onClick={() => go(-1)} label="Anterior"><ArrowLeft size={16} /></Arrow>
        <div className="relative min-h-[17rem] flex-1 overflow-hidden md:min-h-[15rem]">
          <span aria-hidden className="display block text-5xl leading-none">“</span>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: dir * offset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -offset }}
              transition={{ duration: 0.45, ease: ease.disclosure }}
              aria-live="polite"
            >
              <blockquote className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.12]">{item.quote}</blockquote>
              <figcaption className="mt-6">
                <span className="eyebrow block text-[10px] !text-ink">{item.name}</span>
                <span className="mt-1 block text-[11px] text-ink/60">{item.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <Arrow onClick={() => go(1)} label="Siguiente"><ArrowRight size={16} /></Arrow>
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl justify-center gap-2">
        {t.items.map((_, k) => (
          <button key={k} aria-label={`Testimonio ${k + 1}`} aria-current={k === i}
            onClick={() => set([k, k > i ? 1 : -1])}
            className={`h-1 transition-all duration-300 ${k === i ? 'w-10 bg-ink' : 'w-4 bg-ink/25'}`} />
        ))}
      </div>
    </section>
  );
}

function Arrow({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <Magnetic className="hidden shrink-0 sm:inline-block">
      <button onClick={onClick} aria-label={label}
        className="grid size-12 place-items-center rounded-full border border-ink/25 motion-micro transition-colors hover:bg-ink hover:text-lime">
        {children}
      </button>
    </Magnetic>
  );
}
