import type { CSSProperties, ReactNode } from 'react';

type Props = { children: ReactNode; duration?: number; reverse?: boolean; className?: string };

/** Marquee infinito 100% CSS (corre en el compositor). Pausa al hover. */
export function Marquee({ children, duration = 40, reverse = false, className }: Props) {
  const style = {
    '--marquee-duration': `${duration}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as CSSProperties;
  return (
    <div className={`group overflow-hidden ${className ?? ''}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={style}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
