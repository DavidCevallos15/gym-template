import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const control = 'w-full border border-line bg-ink/60 px-3 py-2.5 text-sm text-fg outline-none motion-micro transition-colors focus:border-lime/70';

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block text-[8px] text-muted">{label}</span>
      {children}
    </label>
  );
}

export const NumberInput = ({ className, ...p }: InputHTMLAttributes<HTMLInputElement>) => (
  <input type="number" inputMode="decimal" className={cn(control, className)} {...p} />
);

export const Select = ({ className, ...p }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn(control, 'appearance-none', className)} {...p} />
);

type RangeProps = { label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void };

export function Range({ label, value, min, max, step = 1, unit = '', onChange }: RangeProps) {
  return (
    <label className="block">
      <span className="mb-2 flex justify-between">
        <span className="eyebrow text-[8px] text-muted">{label}</span>
        <span className="eyebrow text-[8px] text-fg">{value}{unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </label>
  );
}

export const Card = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('flex flex-col border border-line bg-surface p-6', className)}>{children}</div>
);
