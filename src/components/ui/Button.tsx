import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'outline' | 'ghost' | 'dark';

const base =
  'eyebrow inline-flex items-center justify-center gap-2 px-6 py-4 text-[11px] motion-micro transition-[background-color,color,border-color,transform] active:scale-[.97]';
const variants: Record<Variant, string> = {
  solid: 'bg-lime text-ink hover:bg-white',
  outline: 'border border-lime/70 text-lime hover:bg-lime hover:text-ink',
  ghost: 'px-2 text-fg hover:text-lime',
  dark: 'bg-ink text-lime hover:bg-ink-2',
};

type Common = { variant?: Variant; children: ReactNode; className?: string };

export function ButtonLink({ variant = 'solid', className, ...props }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}

export function Button({ variant = 'solid', className, ...props }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn(base, variants[variant], className)} {...props} />;
}
