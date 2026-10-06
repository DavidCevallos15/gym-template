import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { site } from '@/config/site.config';
import { ease, dur } from '@/lib/motion';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { faq } = site;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-section py-section bg-ink">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Reveal><p className="eyebrow mb-5 text-lime">{faq.label}</p></Reveal>
          <MaskedLines lines={faq.title} className="text-[clamp(3rem,7vw,6rem)]" />
        </div>
        <div className="border-t border-line">
          {faq.items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.06}>
              <Item q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-line">
      <h3>
        <button aria-expanded={open} aria-controls={id} onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left">
          <span className={`text-[15px] font-semibold motion-micro transition-colors ${open ? 'text-lime' : 'group-hover:text-lime'}`}>{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: dur.interactive, ease: ease.interactive }}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-lime">
            <Plus size={14} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} role="region"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : dur.disclosure, ease: ease.disclosure }}
            className="overflow-hidden">
            <p className="max-w-xl pb-6 text-[14px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
