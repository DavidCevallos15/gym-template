import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { site, whatsappHref } from '@/config/site.config';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { Magnetic } from '@/components/motion/Magnetic';

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open); // se oculta bajando, vuelve subiendo
  });

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.4, ease: ease.disclosure }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-ink/80 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="px-section flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} className="eyebrow text-[10px] text-fg/70 motion-micro transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic className="hidden md:inline-block">
            <ButtonLink href={whatsappHref()} target="_blank" rel="noopener" className="px-5 py-3">
              Clase gratis ↗
            </ButtonLink>
          </Magnetic>
          <button
            className="grid size-10 place-items-center border border-line md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: ease.disclosure }}
            className="overflow-hidden border-t border-line bg-ink md:hidden"
          >
            <div className="px-section flex flex-col gap-1 py-4">
              {site.nav.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="display py-2 text-3xl">
                  {l.label}
                </a>
              ))}
              <ButtonLink href={whatsappHref()} target="_blank" rel="noopener" className="mt-3">
                Clase gratis ↗
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
