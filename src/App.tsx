import { SiteHeader } from '@/components/layout/SiteHeader';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { Hero } from '@/sections/Hero';
import { MarqueeBand } from '@/sections/MarqueeBand';
import { Standard } from '@/sections/Standard';
import { Programs } from '@/sections/Programs';
import { Women } from '@/sections/Women';
import { Coaches } from '@/sections/Coaches';
import { DataDash } from '@/sections/DataDash';
import { Lab } from '@/sections/Lab';
import { Pricing } from '@/sections/Pricing';
import { Schedule } from '@/sections/Schedule';
import { Tools } from '@/sections/Tools';
import { Gallery } from '@/sections/Gallery';
import { Testimonials } from '@/sections/Testimonials';
import { Faq } from '@/sections/Faq';
import { CtaFooter } from '@/sections/CtaFooter';

export default function App() {
  return (
    <>
      <a href="#estandar" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
        Saltar al contenido
      </a>
      <CustomCursor />
      <SiteHeader />
      <main>
        <Hero />
        <MarqueeBand />
        <Standard />
        <Programs />
        <Women />
        <Coaches />
        <DataDash />
        <Lab />
        <Pricing />
        <Schedule />
        <Tools />
        <Gallery />
        <Testimonials />
        <Faq />
      </main>
      <CtaFooter />
    </>
  );
}
