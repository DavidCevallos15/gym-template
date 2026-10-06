import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { site } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/ui/Photo';
import { Button } from '@/components/ui/Button';
import { Card, Field, NumberInput, Range, Select } from '@/components/ui/Field';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';

const { lab } = site;

export function Lab() {
  return (
    <section id="laboratorio" className="px-section py-section bg-ink-2">
      <SectionHeader index={lab.index} label={lab.label} />
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <MaskedLines lines={lab.title} accent={[1]} className="text-[clamp(3rem,7vw,6rem)]" />
        <Reveal><p className="max-w-xs text-[13px] text-muted md:text-right">{lab.copy}</p></Reveal>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Reveal delay={0}><AthleteType /></Reveal>
        <Reveal delay={0.08} className="hidden xl:block"><Photo slot={lab.photo} tone={3} className="h-full min-h-80" /></Reveal>
        <Reveal delay={0.16}><Protein /></Reveal>
        <Reveal delay={0.24}><Readiness /></Reveal>
      </div>
    </section>
  );
}

function AthleteType() {
  const [goal, setGoal] = useState<string>(lab.goals[0].id);
  const [shown, setShown] = useState(false);
  const track = lab.goals.find((g) => g.id === goal)?.track;
  return (
    <Card className="h-full">
      <p className="eyebrow text-[8px] text-lime">Perfil de entrenamiento</p>
      <h3 className="display mt-2 text-2xl">Arma tu tipo de atleta</h3>
      <p className="mt-2 text-[11px] text-muted">Elige tu objetivo y te sugerimos un track.</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {lab.goals.map((g) => (
          <button
            key={g.id}
            onClick={() => { setGoal(g.id); setShown(false); }}
            aria-pressed={goal === g.id}
            className={cn('border px-3 py-2.5 text-left text-[11px] motion-micro transition-colors',
              goal === g.id ? 'border-lime bg-lime/10 text-lime' : 'border-line text-fg/70 hover:border-white/25')}
          >
            {g.label}
          </button>
        ))}
      </div>
      <Button className="mt-5 self-start px-5 py-3" onClick={() => setShown(true)}>Revelar mi track ↗</Button>
      <div className="mt-auto min-h-16 pt-5">
        <AnimatePresence mode="wait">
          {shown && (
            <motion.p
              key={goal}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: ease.disclosure }}
              className="border-l-2 border-lime pl-3 text-[11px] leading-relaxed text-fg/80"
            >
              {track}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

const ACTIVITY = { bajo: 1.2, regular: 1.6, intenso: 2.0 } as const;

function Protein() {
  const [kg, setKg] = useState(75);
  const [lvl, setLvl] = useState<keyof typeof ACTIVITY>('regular');
  const grams = Math.round((kg > 0 ? kg : 0) * ACTIVITY[lvl]);
  return (
    <Card className="h-full">
      <p className="eyebrow text-[8px] text-lime">Motor de macros</p>
      <h3 className="display mt-2 text-2xl">Proteína diaria</h3>
      <div className="mt-5 space-y-4">
        <Field label="Peso corporal (kg)">
          <NumberInput min={30} max={250} value={kg} onChange={(e) => setKg(Number(e.target.value))} />
        </Field>
        <Field label="Nivel de entrenamiento">
          <Select value={lvl} onChange={(e) => setLvl(e.target.value as keyof typeof ACTIVITY)}>
            <option value="bajo">Bajo (1–2 días)</option>
            <option value="regular">Regular (3–4 días)</option>
            <option value="intenso">Intenso (5+ días)</option>
          </Select>
        </Field>
      </div>
      <div className="mt-auto pt-8">
        <AnimatedNumber value={grams} suffix="g" className="display text-5xl text-lime" />
        <p className="eyebrow mt-1 text-[8px] text-muted">Por día · {ACTIVITY[lvl]} g/kg</p>
      </div>
    </Card>
  );
}

function Readiness() {
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(7);
  const [soreness, setSoreness] = useState(3);
  const score = Math.round(Math.min(sleep / 8, 1) * 40 + (energy / 10) * 35 + ((10 - soreness) / 10) * 25);
  const verdict = score >= 75 ? 'Listo para ir pesado' : score >= 55 ? 'Sesión moderada' : 'Prioriza recuperación';
  return (
    <Card className="h-full">
      <p className="eyebrow text-[8px] text-lime">Puntaje de recuperación</p>
      <h3 className="display mt-2 text-2xl">¿Qué tan listo estás?</h3>
      <div className="mt-5 space-y-5">
        <Range label="Sueño" value={sleep} min={3} max={10} step={0.5} unit="h" onChange={setSleep} />
        <Range label="Energía" value={energy} min={1} max={10} unit="/10" onChange={setEnergy} />
        <Range label="Dolor muscular" value={soreness} min={0} max={10} unit="/10" onChange={setSoreness} />
      </div>
      <div className="mt-auto flex items-end justify-between pt-8">
        <AnimatedNumber value={score} className="display text-5xl text-lime" />
        <p className="eyebrow max-w-[9rem] text-right text-[8px] text-muted">{verdict}</p>
      </div>
    </Card>
  );
}
