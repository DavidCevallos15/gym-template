import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { site } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card, Field, NumberInput } from '@/components/ui/Field';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';

const { tools } = site;

const bmiLabel = (b: number) => (b < 18.5 ? 'Bajo peso' : b < 25 ? 'Rango normal' : b < 30 ? 'Sobrepeso' : 'Obesidad');

export function Tools() {
  return (
    <section className="px-section bg-ink-2 pb-[var(--spacing-section-y)]">
      <SectionHeader index={tools.index} label={tools.label} />
      <div className="grid gap-3 md:grid-cols-3">
        <Reveal><Bmi /></Reveal>
        <Reveal delay={0.08}><Water /></Reveal>
        <Reveal delay={0.16}><Quote /></Reveal>
      </div>
    </section>
  );
}

function Bmi() {
  const [kg, setKg] = useState(75);
  const [cm, setCm] = useState(175);
  const [res, setRes] = useState<number | null>(null);
  return (
    <Card className="h-full">
      <p className="eyebrow text-[8px] text-lime">01 · IMC</p>
      <h3 className="display mt-2 text-2xl">Índice de masa corporal</h3>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Peso (kg)"><NumberInput value={kg} onChange={(e) => setKg(Number(e.target.value))} /></Field>
        <Field label="Altura (cm)"><NumberInput value={cm} onChange={(e) => setCm(Number(e.target.value))} /></Field>
      </div>
      <Button className="mt-4 w-full" onClick={() => cm > 0 && setRes(kg / (cm / 100) ** 2)}>Calcular</Button>
      <div className="mt-auto pt-6">
        <AnimatedNumber value={res ?? 0} decimals={1} className="display text-4xl text-lime" />
        <p className="eyebrow mt-1 text-[8px] text-muted">{res ? bmiLabel(res) : 'Ingresa tus datos'}</p>
      </div>
    </Card>
  );
}

function Water() {
  const [kg, setKg] = useState(75);
  const [hours, setHours] = useState(1);
  const [res, setRes] = useState<number | null>(null);
  return (
    <Card className="h-full">
      <p className="eyebrow text-[8px] text-lime">02 · Hidratación</p>
      <h3 className="display mt-2 text-2xl">Meta de agua</h3>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Peso (kg)"><NumberInput value={kg} onChange={(e) => setKg(Number(e.target.value))} /></Field>
        <Field label="Horas de entreno"><NumberInput step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} /></Field>
      </div>
      <Button variant="outline" className="mt-4 w-full" onClick={() => setRes(kg * 0.035 + hours * 0.5)}>Calcular</Button>
      <div className="mt-auto pt-6">
        <AnimatedNumber value={res ?? 0} decimals={1} suffix="L" className="display text-4xl text-lime" />
        <p className="eyebrow mt-1 text-[8px] text-muted">Por día</p>
      </div>
    </Card>
  );
}

function Quote() {
  const [i, setI] = useState(0);
  return (
    <Card className="h-full justify-between">
      <p className="eyebrow text-[8px] text-lime">03 · Reset diario</p>
      <div className="relative my-6 min-h-28">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: ease.disclosure }}
            className="display text-3xl leading-[1.05]"
          >
            “{tools.quotes[i]}”
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <Button variant="ghost" className="self-end text-lime" onClick={() => setI((v) => (v + 1) % tools.quotes.length)}>
        Nueva frase ↗
      </Button>
    </Card>
  );
}
