import { site } from '@/config/site.config';

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className ?? ''}`} aria-label={`${site.brand.name} — inicio`}>
      <svg viewBox="0 0 32 22" className="h-5 w-auto" aria-hidden>
        <path d="M4 0h28l-4 6H0zm2 8h22l-4 6H2zm2 8h16l-4 6H4z" fill="var(--color-lime)" />
      </svg>
      <span className="display text-xl tracking-wide">{site.brand.short}</span>
    </a>
  );
}
