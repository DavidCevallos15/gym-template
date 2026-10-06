import { motion, useReducedMotion } from 'motion/react';
import { site, whatsappHref } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';

const { data: d } = site;
const R = 52;
const C = 2 * Math.PI * R;

export function DataDash() {
  const reduce = useReducedMotion();
  const max = Math.max(...d.bars);

  return (
    <section className="px-section py-section relative overflow-hidden bg-ink">
      <div aria-hidden className="absolute -left-40 top-1/2 size-[40rem] -translate-y-1/2 rounded-full bg-volt/10 blur-[120px]" />
      <div className="relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal><p className="eyebrow text-lime">{d.label}</p></Reveal>
          <MaskedLines lines={d.title} className="mt-5 text-[clamp(3rem,7vw,6rem)]" />
          <Reveal delay={0.15}><p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/70">{d.copy}</p></Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink variant="outline" href="#laboratorio">{d.primaryCta}</ButtonLink>
            <ButtonLink variant="ghost" href={whatsappHref('Hola, quiero mi plan de entrenamiento')} target="_blank" rel="noopener">{d.secondaryCta} ↗</ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={60}>
          <div className="mx-auto max-w-md border border-line bg-surface/60 p-7 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[9px] text-muted">Semana 08</span>
              <span className="eyebrow text-[9px] text-lime">{d.delta}</span>
            </div>

            <div className="relative mx-auto my-6 size-40">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="6" />
                <motion.circle
                  cx="60" cy="60" r={R} fill="none" stroke="var(--color-lime)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: reduce ? C * (1 - d.ring / 100) : C }}
                  whileInView={{ strokeDashoffset: C * (1 - d.ring / 100) }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.8, ease: ease.disclosure, delay: 0.2 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgb(180 255 42 / .5))' }}
                />
              </svg>
              <div className="absolute inset-0 grid place-content-center text-center">
                <span className="display text-4xl"><Counter to={d.ring} suffix="%" /></span>
                <span className="eyebrow mt-1 text-[8px] text-muted">{d.ringLabel}</span>
              </div>
            </div>

            <div className="flex h-28 items-end gap-2" role="img" aria-label="Progreso semanal en barras">
              {d.bars.map((b, i) => (
                <motion.div
                  key={i}
                  className="flex-1 origin-bottom bg-gradient-to-t from-lime/30 to-lime"
                  style={{ height: `${(b / max) * 100}%` }}
                  initial={{ scaleY: reduce ? 1 : 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.9, ease: ease.disclosure, delay: 0.4 + i * 0.07 }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <span className="eyebrow text-[8px] text-muted">Carga semanal</span>
              <span className="eyebrow text-[8px] text-muted">Racha · 14 días</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
