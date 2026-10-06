import {
  AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue,
} from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { ease, dur } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { Photo } from '@/components/ui/Photo';
import { ButtonLink } from '@/components/ui/Button';
import { Magnetic } from '@/components/motion/Magnetic';
import { Counter } from '@/components/motion/Counter';

const { hero } = site;

/**
 * Hero pinneado (sticky) con scroll 3D:
 * - la foto hace zoom + parallax
 * - cada línea del titular se separa en profundidad (rotateX / translateZ)
 * - la card flotante gira hacia el usuario
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // suavizado para que el scrub con rueda no se vea a saltos
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  const photoScale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.28]);
  const photoY = useTransform(p, [0, 1], ['0%', reduce ? '0%' : '12%']);
  const shade = useTransform(p, [0, 0.8], [0, 0.85]);
  const restOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const restY = useTransform(p, [0, 0.35], [0, reduce ? 0 : 60]);
  const cardRotY = useTransform(p, [0, 0.6], [0, reduce ? 0 : -38]);
  const cardZ = useTransform(p, [0, 0.6], [0, reduce ? 0 : 260]);
  const cardOpacity = useTransform(p, [0.3, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[175svh] bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden [perspective:1200px]">
        {/* Foto de fondo */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: photoScale, y: photoY }}>
          <motion.div
            className="size-full"
            initial={reduce ? false : { scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: ease.reveal }}
          >
            <Photo slot={hero.photo} tone={0} priority className="size-full" showHint={false} />
          </motion.div>
        </motion.div>
        {/* Gradientes para legibilidad */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_8%,rgb(11_26_32/.75)_45%,transparent_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: shade }} />

        {/* Anillo decorativo */}
        <div aria-hidden className="absolute -right-[18vw] top-1/2 aspect-square w-[70vw] max-w-[900px] -translate-y-1/2 animate-orbit rounded-full border border-white/10">
          <span className="absolute left-1/2 top-0 size-2 -translate-1/2 rounded-full bg-lime shadow-[0_0_20px_4px_rgb(180_255_42/.6)]" />
        </div>

        <div className="px-section relative flex h-full flex-col justify-center pt-20 [transform-style:preserve-3d]">
          <motion.div style={{ opacity: restOpacity }}>
            <motion.p
              className="eyebrow mb-6 text-lime"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.reveal, delay: 0.2 }}
            >
              {hero.eyebrow}
            </motion.p>
          </motion.div>

          <h1 className="display text-[clamp(4rem,min(12vw,16svh),11rem)] [transform-style:preserve-3d]" aria-label={hero.lines.join(' ')}>
            {hero.lines.map((line, i) => (
              <HeroLine key={line} index={i} total={hero.lines.length} progress={p} accent={i === hero.accentLine}>
                {line}
              </HeroLine>
            ))}
          </h1>

          <motion.div style={{ opacity: restOpacity, y: restY }}>
            <motion.p
              className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/75"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.reveal, ease: ease.reveal, delay: 0.55 }}
            >
              {hero.copy}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.reveal, ease: ease.reveal, delay: 0.7 }}
            >
              <Magnetic>
                <ButtonLink href={whatsappHref()} target="_blank" rel="noopener">
                  {hero.primaryCta} <ArrowUpRight size={14} />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="#estandar" variant="ghost">
                {hero.secondaryCta} <ArrowDown size={14} />
              </ButtonLink>
            </motion.div>

            <motion.dl
              className="mt-12 flex gap-10 md:gap-14"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="display text-4xl md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dd aria-hidden className="eyebrow mt-1 text-[9px] text-muted">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>

        {/* Card flotante */}
        <motion.div
          className="absolute bottom-[14%] right-[6vw] hidden w-60 lg:block"
          style={{ rotateY: cardRotY, z: cardZ, opacity: cardOpacity, transformPerspective: 900 }}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: ease.reveal, delay: 1 }}
          >
            <RotatingCard />
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <div aria-hidden className="absolute bottom-10 right-4 hidden flex-col items-center gap-3 md:flex">
          <span className="eyebrow text-[9px] text-muted [writing-mode:vertical-rl]">Scroll para explorar</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-lime"
              animate={reduce ? undefined : { y: ['-100%', '200%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

type LineProps = { index: number; total: number; progress: MotionValue<number>; accent: boolean; children: string };

/** Una línea del titular: entra desde máscara y luego se separa en 3D con el scroll. */
function HeroLine({ index, total, progress, accent, children }: LineProps) {
  const reduce = useReducedMotion();
  const mid = (total - 1) / 2;
  const dir = index - mid; // -1, 0, 1 para 3 líneas
  const k = reduce ? 0 : 1;
  const y = useTransform(progress, [0, 0.55], [0, dir * 140 * k]);
  const x = useTransform(progress, [0, 0.55], [0, (index % 2 ? 90 : -40) * k]);
  const z = useTransform(progress, [0, 0.55], [0, (dir === 0 ? 320 : -120) * k]);
  const rotateX = useTransform(progress, [0, 0.55], [0, -dir * 55 * k]);
  const opacity = useTransform(progress, [0.2, 0.55], [1, 0]);

  return (
    <motion.span aria-hidden className="block origin-left will-change-transform" style={{ y, x, z, rotateX, opacity }}>
      <span className="block overflow-hidden pb-[0.04em]">
        <motion.span
          className={cn('block', accent ? 'text-lime' : 'text-fg')}
          initial={reduce ? false : { y: '105%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, ease: ease.disclosure, delay: 0.25 + index * 0.1 }}
        >
          {children}
        </motion.span>
      </span>
    </motion.span>
  );
}

const CARD_MS = 4200;

function RotatingCard() {
  const [i, setI] = useState(0);
  const total = hero.cards.length;
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % total), CARD_MS);
    return () => clearInterval(id);
  }, [total]);
  const card = hero.cards[i];

  return (
    <div className="overflow-hidden border border-white/10 bg-ink/60 p-5 backdrop-blur-md" data-cursor>
      <p className="eyebrow text-[9px] text-muted">
        {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <div className="relative mt-3 h-[5.5rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={i}
            initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: ease.disclosure }}
            className="absolute inset-0"
          >
            <p className="display text-3xl leading-[.95]">{card.title}</p>
            <p className="mt-2 text-[10px] tracking-wide text-muted">{card.tags}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 h-0.5 bg-white/10">
        <motion.div
          key={i}
          className="h-full origin-left bg-lime"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: CARD_MS / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
