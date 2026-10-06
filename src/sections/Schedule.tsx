import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { schedule: s } = site;

export function Schedule() {
  const today = (new Date().getDay() + 6) % 7; // lunes = 0
  const [day, setDay] = useState(Math.min(today, s.days.length - 1));
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const pick = (d: number) => { setDir(d > day ? 1 : -1); setDay(d); };

  return (
    <section id="horarios" className="px-section py-section bg-ink-2">
      <SectionHeader index={s.index} label={s.label} />
      <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <MaskedLines lines={s.title} className="text-[clamp(3rem,7vw,6rem)]" />
        <Reveal>
          <div role="tablist" aria-label="Día" className="flex gap-1">
            <LayoutGroup id="days">
              {s.days.map((d, i) => (
                <button key={d} role="tab" aria-selected={day === i} onClick={() => pick(i)}
                  className={cn('eyebrow relative min-w-11 px-3 py-2.5 text-[9px] transition-colors', day === i ? 'text-ink' : 'text-muted hover:text-fg')}>
                  {day === i && <motion.span layoutId="day-pill" className="absolute inset-0 bg-lime" transition={{ duration: reduce ? 0 : 0.3, ease: ease.disclosure }} />}
                  <span className="relative">{d}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.ul
            key={day}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.32, ease: ease.disclosure }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {s.classes[day].map((c, i) => (
              <motion.li
                key={c.t + c.n}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: ease.reveal, delay: i * 0.05 }}
                className="group border border-line bg-surface p-6 motion-interactive transition-colors hover:border-lime/40"
              >
                <p className="eyebrow text-[9px] text-lime">{c.t}</p>
                <h3 className="display mt-2 text-2xl">{c.n}</h3>
                <p className="mt-1 text-[11px] text-muted">{c.c}</p>
                <ButtonLink variant="outline" className="mt-6 px-4 py-2.5 text-[9px]"
                  href={whatsappHref(`Hola, quiero reservar ${c.n} el ${s.days[day]} a las ${c.t}`)} target="_blank" rel="noopener">
                  Reservar ↗
                </ButtonLink>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
