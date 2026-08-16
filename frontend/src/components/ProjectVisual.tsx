interface ProjectVisualProps {
  label: string;
  index: string;
}

/**
 * Stylized, theme-consistent placeholder for project imagery.
 * No broken image elements are ever rendered — a text placeholder is shown
 * until a real screenshot is added via Firestore or the seed data.
 */
export function ProjectVisual({ label, index }: ProjectVisualProps): JSX.Element {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-white/15 bg-surface"
    >
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute left-0 top-0 h-1 w-16 bg-accent" aria-hidden="true" />
      <span className="relative px-6 text-center font-mono text-[11px] uppercase leading-relaxed tracking-widest text-white/50">
        <span className="text-accent">{index}</span> — {label}
      </span>
    </div>
  );
}
