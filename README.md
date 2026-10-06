# Gimnasio Fitness — template de landing para gimnasios

Vite + React 19 + TypeScript + Tailwind v4 + `motion`. Una sola página, 15 secciones animadas, lista para rebrandear por cliente.

## Uso

```bash
npm i
npm run dev          # desarrollo
npm run build        # build normal → dist/ (Vercel / Azure SWA)
npm run build:demo   # un solo index.html autocontenido → dist-demo/ (para mandar la demo)
```

## Adaptar a un gimnasio nuevo (≈15 min)

| Qué | Dónde |
|---|---|
| Nombre, textos, precios, horarios, coaches, FAQ, WhatsApp | `src/config/site.config.ts` |
| Paleta (fondo, acento lima, azul de fotos) | `@theme` en `src/styles/globals.css` |
| Logo | `src/components/ui/Logo.tsx` + `public/favicon.svg` |
| Fotos | coloca en `public/assets/...` y llena `src` del slot en `site.config.ts` |

Sin `src`, cada `<Photo>` muestra un placeholder duotono con el encuadre sugerido (ej. "Retrato atleta mujer · vertical 4:5").

## Mapa de animaciones

| Sección | Archivo | Técnica |
|---|---|---|
| Hero | `sections/Hero.tsx` | Sticky 175svh, `useScroll` + `useSpring`; líneas del titular separándose en 3D (rotateX / translateZ), zoom de foto, card flotante girando en Y |
| Marquee | `sections/MarqueeBand.tsx` | 2 bandas cruzadas, `@keyframes` CSS |
| Títulos | `components/motion/MaskedLines.tsx` | Líneas desde máscara, stagger 80ms (trigger en el contenedor) |
| Programas | `sections/Programs.tsx` | Filtros con `layoutId` + grid `layout` / `AnimatePresence` |
| Mujeres | `sections/Women.tsx` | `clip-path` reveal ligado al scroll + parallax |
| Coaches | `sections/Coaches.tsx` | Tilt 3D al puntero + glare + zoom |
| Datos | `sections/DataDash.tsx` | Anillo SVG `strokeDashoffset` + barras `scaleY` stagger |
| Lab / Herramientas | `sections/Lab.tsx`, `Tools.tsx` | Calculadoras con `AnimatedNumber` |
| Planes | `sections/Pricing.tsx` | Toggle mensual/anual con pill compartida, precio tweened |
| Horario | `sections/Schedule.tsx` | Tabs por día, transición direccional |
| Galería | `sections/Gallery.tsx` | Bento con reveal por `clip-path` + parallax por columna (solo ≥1024px) |
| Testimonios | `sections/Testimonials.tsx` | Slider direccional, autoplay 7s, pausa en hover |
| FAQ | `sections/Faq.tsx` | Acordeón `height: auto` |
| CTA | `sections/CtaFooter.tsx` | Glow que respira + anillos girando (CSS) |
| Global | `CustomCursor.tsx`, `Magnetic.tsx` | Dot + ring con spring, botones magnéticos (solo `pointer: fine`) |

Todo respeta `prefers-reduced-motion`. Easings/duraciones centralizados en `src/lib/motion.ts` y `@theme`.

## Fotos recomendadas

AVIF/WebP, hero 1920px (≤250 KB) con `fetchpriority="high"` (ya lo hace `<Photo priority>`), resto ≤150 KB.

```bash
# Fedora: sudo dnf install libavif-tools
avifenc -q 60 hero.jpg public/assets/hero/hero.avif
```
