import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';

const { programs: pr } = site;
type FilterId = (typeof pr.filters)[number]['id'];

export function Programs() {
  const [filter, setFilter] = useState<FilterId>('todos');
  const reduce = useReducedMotion();
  const items = pr.items.filter((it) => filter === 'todos' || it.cat === filter);

  return (
    <section id="programas" className="px-section py-section bg-ink-2">
      <SectionHeader index={pr.index} label={pr.label} />
      <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <MaskedLines lines={pr.title} className="text-[clamp(3rem,7vw,6rem)]" />
        <Reveal>
          <div role="tablist" aria-label="Filtrar programas" className="flex flex-wrap gap-1 border border-line p-1">
            <LayoutGroup id="program-filter">
              {pr.filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn('eyebrow relative px-4 py-2.5 text-[9px] motion-micro transition-colors', filter === f.id ? 'text-ink' : 'text-muted hover:text-fg')}
                >
                  {filter === f.id && (
                    <motion.span layoutId="pill" className="absolute inset-0 bg-lime" transition={{ duration: reduce ? 0 : 0.35, ease: ease.disclosure }} />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>
        </Reveal>
      </div>

      <motion.ul layout={!reduce} className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((it) => (
            <motion.li
              key={it.name}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: ease.disclosure }}
              className="bg-surface"
            >
              <a
                href={whatsappHref(`Hola, quiero info del programa ${it.name}`)}
                target="_blank"
                rel="noopener"
                className="group relative flex items-center gap-5 px-6 py-6 motion-interactive transition-colors hover:bg-surface-2 md:px-8"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 bg-lime motion-interactive transition-transform group-hover:scale-y-100" />
                <span className="eyebrow text-[9px] text-muted">{it.n}</span>
                <span className="flex-1">
                  <span className="display block text-2xl tracking-wide md:text-[1.7rem]">{it.name}</span>
                  <span className="mt-1 block text-[11px] text-muted">{it.meta}</span>
                </span>
                <ArrowUpRight size={18} className="text-lime motion-interactive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45" />
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
