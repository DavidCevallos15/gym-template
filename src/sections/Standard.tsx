import { site } from '@/config/site.config';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { standard: s } = site;

export function Standard() {
  return (
    <section id="estandar" className="px-section py-section bg-ink">
      <SectionHeader index={s.index} label={s.label} />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <MaskedLines lines={s.title} className="text-[clamp(3rem,7vw,6rem)]" />
        <div>
          <Reveal>
            <p className="max-w-xl text-[15px] leading-relaxed text-fg/70">{s.copy}</p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {s.pillars.map((p, i) => (
              <Reveal key={p.n} delay={0.1 + i * 0.08}>
                <span className="eyebrow text-lime">{p.n}</span>
                <h3 className="display mt-3 text-xl tracking-wide">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
