import { Dumbbell } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { PhotoSlot } from '@/config/site.config';
import { cn } from '@/lib/cn';

type Props = {
  slot: PhotoSlot;
  /** Variación del placeholder (cambia ángulo y posición de la luz). */
  tone?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  showHint?: boolean;
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const TONES = [
  { a: 135, bx: '78%', by: '18%', gx: '20%', gy: '85%' },
  { a: 200, bx: '20%', by: '25%', gx: '80%', gy: '80%' },
  { a: 160, bx: '60%', by: '0%', gx: '10%', gy: '60%' },
  { a: 110, bx: '95%', by: '60%', gx: '30%', gy: '95%' },
  { a: 230, bx: '35%', by: '10%', gx: '90%', gy: '40%' },
];

/**
 * Slot de foto. Con `slot.src` renderiza <img> (lazy salvo priority).
 * Sin `src` muestra un placeholder duotono azul/lima con grano y el encuadre sugerido.
 */
export function Photo({ slot, tone = 0, className, imgClassName, priority = false, showHint = true }: Props) {
  if (slot.src) {
    return (
      <div className={cn('relative overflow-hidden bg-surface', className)}>
        <img
          src={slot.src}
          alt={slot.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={cn('size-full object-cover', imgClassName)}
        />
      </div>
    );
  }

  const t = TONES[tone % TONES.length];
  const style = {
    backgroundImage: [
      `radial-gradient(60% 55% at ${t.bx} ${t.by}, rgb(61 77 255 / .75), transparent 70%)`,
      `radial-gradient(45% 40% at ${t.gx} ${t.gy}, rgb(180 255 42 / .22), transparent 70%)`,
      `repeating-linear-gradient(${t.a}deg, rgb(255 255 255 / .035) 0 2px, transparent 2px 22px)`,
      `linear-gradient(${t.a}deg, #0d222a, #12293a 55%, #1a2560)`,
    ].join(','),
  } as CSSProperties;

  return (
    <div role="img" aria-label={slot.alt} className={cn('relative overflow-hidden bg-surface', className)}>
      <div className={cn('absolute inset-0', imgClassName)} style={style}>
        <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <Dumbbell aria-hidden strokeWidth={1} className="absolute left-1/2 top-1/2 size-[18%] min-w-10 -translate-1/2 -rotate-12 text-white/10" />
      </div>
      {showHint && (
        <span className="eyebrow absolute left-3 top-3 z-10 rounded-sm bg-black/35 px-2 py-1 text-[9px] text-white/55 backdrop-blur-sm">
          Foto · {slot.hint}
        </span>
      )}
    </div>
  );
}
