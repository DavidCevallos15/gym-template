import { Fragment } from 'react';
import { site } from '@/config/site.config';
import { Marquee } from '@/components/motion/Marquee';

function Items({ dark = false }: { dark?: boolean }) {
  return (
    <>
      {site.marquee.map((w) => (
        <Fragment key={w}>
          <span className={`eyebrow whitespace-nowrap px-8 text-[12px] ${dark ? 'text-lime' : 'text-ink'}`}>{w}</span>
          <span aria-hidden className={dark ? 'text-lime/60' : 'text-ink'}>✦</span>
        </Fragment>
      ))}
    </>
  );
}

/** Dos bandas cruzadas en direcciones opuestas (CSS puro). */
export function MarqueeBand() {
  return (
    <section aria-label="Lemas" className="relative z-10 -mt-px overflow-hidden py-8">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[1.6deg] border-y border-lime/20 bg-ink-2 py-3">
        <Marquee duration={48} reverse><Items dark /></Marquee>
      </div>
      <div className="relative -rotate-[1.2deg] bg-lime py-3.5 shadow-[0_10px_40px_-10px_rgb(180_255_42/.45)]">
        <Marquee duration={36}><Items /></Marquee>
      </div>
    </section>
  );
}
