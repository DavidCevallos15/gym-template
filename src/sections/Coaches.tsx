import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { PointerEvent } from 'react';
import { site } from '@/config/site.config';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/ui/Photo';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { coaches: c } = site;

export function Coaches() {
  return (
    <section id="coaches" className="px-section py-section bg-ink">
      <SectionHeader index={c.index} label={c.label} />
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <MaskedLines lines={c.title} className="text-[clamp(3rem,7vw,6rem)]" />
        <Reveal><p className="max-w-[16rem] text-[13px] leading-relaxed text-muted md:text-right">{c.copy}</p></Reveal>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((coach, i) => (
          <Reveal key={coach.name} delay={i * 0.1} y={50}>
            <TiltCard coach={coach} tone={i + 2} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type Coach = (typeof c.items)[number];

/** Card con tilt 3D siguiendo el puntero + zoom de la foto. */
function TiltCard({ coach, tone }: { coach: Coach; tone: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / .14), transparent 55%)`);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <div className="[perspective:1000px]">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative aspect-[3/4] overflow-hidden bg-surface"
        data-cursor
      >
        <Photo slot={coach.photo} tone={tone} className="absolute inset-0" imgClassName="motion-interactive transition-transform duration-700 group-hover:scale-110" />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-24 [transform:translateZ(40px)]">
          <p className="eyebrow text-[9px] text-lime">{coach.role}</p>
          <h3 className="display mt-2 text-3xl">{coach.name}</h3>
          <p className="mt-1 text-[11px] text-muted">{coach.meta}</p>
          <span className="eyebrow mt-4 inline-flex items-center gap-1 text-[9px] text-lime">
            Ver perfil <ArrowUpRight size={12} className="transition-transform group-hover:rotate-45" />
          </span>
        </div>
      </motion.article>
    </div>
  );
}
