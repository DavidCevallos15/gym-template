import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';
import { Magnetic } from '@/components/motion/Magnetic';

const { pricing: p } = site;
type Cycle = 'mensual' | 'anual';

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>('mensual');
  const reduce = useReducedMotion();
  const price = (m: number) => (cycle === 'anual' ? Math.round(m * (1 - p.annualDiscount)) : m);

  return (
    <section id="planes" className="px-section py-section bg-ink">
      <SectionHeader index={p.index} label={p.label} />
      <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <MaskedLines lines={p.title} className="text-[clamp(3rem,7vw,6rem)]" />
        <Reveal>
          <div role="radiogroup" aria-label="Ciclo de pago" className="flex items-center gap-1 border border-line p-1">
            <LayoutGroup id="cycle">
              {(['mensual', 'anual'] as const).map((c) => (
                <button key={c} role="radio" aria-checked={cycle === c} onClick={() => setCycle(c)}
                  className={cn('eyebrow relative px-4 py-2.5 text-[9px] transition-colors', cycle === c ? 'text-ink' : 'text-muted hover:text-fg')}>
                  {cycle === c && <motion.span layoutId="cycle-pill" className="absolute inset-0 bg-lime" transition={{ duration: reduce ? 0 : 0.35, ease: ease.disclosure }} />}
                  <span className="relative">{c}{c === 'anual' && ` −${p.annualDiscount * 100}%`}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {p.plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.1} y={40} className="h-full">
            <article className={cn(
              'group relative flex h-full flex-col border p-8 motion-interactive transition-[transform,border-color] hover:-translate-y-1.5',
              plan.featured ? 'border-lime/60 bg-surface shadow-[0_0_0_1px_rgb(180_255_42/.15),0_30px_80px_-30px_rgb(180_255_42/.35)]' : 'border-line bg-surface/50 hover:border-white/20',
            )}>
              {plan.featured && <span className="eyebrow absolute right-4 top-4 bg-lime px-2 py-1 text-[8px] text-ink">Más popular</span>}
              <p className="eyebrow text-[8px] text-muted">{plan.tag}</p>
              <h3 className="display mt-3 text-4xl">{plan.name}</h3>
              <p className="mt-2 text-[12px] text-muted">{plan.copy}</p>
              <p className="mt-8 flex items-baseline gap-1">
                <AnimatedNumber value={price(plan.monthly)} prefix={p.currency} className="display text-6xl" />
                <span className="text-[11px] text-muted">/mes</span>
              </p>
              <p className="h-4 text-[10px] text-lime">{cycle === 'anual' ? `Facturado anual: ${p.currency}${price(plan.monthly) * 12}` : ''}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[13px] text-fg/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-lime" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Magnetic strength={0.2}>
                  <ButtonLink
                    variant={plan.featured ? 'solid' : 'outline'}
                    href={whatsappHref(`Hola, me interesa el plan ${plan.name} (${cycle})`)}
                    target="_blank" rel="noopener"
                  >
                    Elegir {plan.name} ↗
                  </ButtonLink>
                </Magnetic>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
