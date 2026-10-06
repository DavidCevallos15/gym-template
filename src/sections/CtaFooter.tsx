import { ArrowUpRight } from 'lucide-react';
import { site, whatsappHref } from '@/config/site.config';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { MaskedLines } from '@/components/motion/MaskedLines';
import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';

const { cta, footer, contact, brand } = site;

export function CtaFooter() {
  return (
    <>
      <section className="px-section relative overflow-hidden bg-ink-2 py-[clamp(6rem,14vw,12rem)]">
        {/* glow que respira + anillos girando (CSS puro) */}
        <div aria-hidden className="pointer-events-none absolute left-[72%] top-1/2 size-[42rem] animate-breathe rounded-full bg-[radial-gradient(circle,rgb(180_255_42/.28),transparent_62%)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute left-[72%] top-1/2 size-[36rem] -translate-1/2">
          <div className="size-full animate-orbit rounded-full border border-lime/15">
            <span className="absolute left-1/2 top-0 size-1.5 -translate-1/2 rounded-full bg-lime" />
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute left-[72%] top-1/2 size-[24rem] -translate-1/2">
          <div className="size-full animate-orbit rounded-full border border-white/5 [animation-direction:reverse] [animation-duration:28s]">
            <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/60" />
          </div>
        </div>

        <div className="relative">
          <Reveal><p className="eyebrow mb-5 text-lime">{cta.label}</p></Reveal>
          <MaskedLines lines={cta.title} className="text-[clamp(3.5rem,10vw,9rem)]" />
          <Reveal delay={0.15}><p className="mt-6 text-[15px] text-fg/70">{cta.copy}</p></Reveal>
          <Reveal delay={0.25} className="mt-8">
            <Magnetic>
              <ButtonLink href={whatsappHref()} target="_blank" rel="noopener">
                {cta.button} <ArrowUpRight size={14} />
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <footer className="px-section border-t border-line bg-ink py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-[15rem] text-[12px] leading-relaxed text-muted">{footer.blurb}<br />{brand.city}</p>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-[9px] text-lime">{col.title}</p>
              <ul className="mt-4 space-y-2 text-[12px] text-muted">
                {'links' in col
                  ? col.links.map((l) => <li key={l.href}><a href={l.href} className="motion-micro transition-colors hover:text-fg">{l.label}</a></li>)
                  : col.lines.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow text-[9px] text-lime">Contacto</p>
            <ul className="mt-4 space-y-2 text-[12px] text-muted">
              <li><a href={whatsappHref()} target="_blank" rel="noopener" className="hover:text-fg">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-fg">{contact.email}</a></li>
              <li className="flex gap-4 pt-2">
                <a href={contact.instagram} target="_blank" rel="noopener" className="hover:text-lime">Instagram</a>
                <a href={contact.tiktok} target="_blank" rel="noopener" className="hover:text-lime">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-line pt-6 text-[11px] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</span>
          <span>Hecho por DC.dev</span>
        </div>
      </footer>
    </>
  );
}
