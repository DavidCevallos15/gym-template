import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { Photo } from '@/components/ui/Photo';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { women: w } = site;

export function Women() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // clip-path reveal de izquierda a derecha + parallax interno
  const clip = useTransform(scrollYProgress, [0.05, 0.4], reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0.05, 0.4], [reduce ? 1 : 1.25, 1.1]);

  return (
    <section ref={ref} className="grid bg-ink-2 lg:grid-cols-[1.15fr_1fr]">
      <motion.div className="relative min-h-[70svh] overflow-hidden lg:min-h-[100svh]" style={{ clipPath: clip }}>
        <motion.div className="absolute inset-[-10%_0]" style={{ y: imgY, scale: imgScale }}>
          <Photo slot={w.photo} tone={1} className="size-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink-2/60" />
      </motion.div>

      <div className="px-section flex flex-col justify-center py-16 lg:py-24">
        <Reveal><p className="eyebrow text-lime">{w.label}</p></Reveal>
        <MaskedLines lines={w.title} className="mt-5 text-[clamp(3rem,6.5vw,5.75rem)]" />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/70">{w.copy}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <dl className="mt-10 flex gap-10">
            {w.stats.map((s) => (
              <div key={s.label}>
                <dd className="display text-3xl">{s.value}</dd>
                <dt className="eyebrow mt-1 text-[9px] text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.35}>
          <ButtonLink href={whatsappHref('Hola, quiero info de Mujeres Fitness')} target="_blank" rel="noopener" className="mt-10 w-full max-w-md">
            {w.cta} <ArrowUpRight size={14} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
