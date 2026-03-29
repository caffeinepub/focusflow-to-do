interface ProgressStripProps {
  completed: number;
  total: number;
}

export function ProgressStrip({ completed, total }: ProgressStripProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full px-4 py-2 glass-card border-b border-border">
      <div className="max-w-6xl mx-auto flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {completed} / {total} tasks done
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(var(--emerald))" }}
          >
            Today's Focus: {pct}% Complete
          </span>
          <span className="text-xs text-muted-foreground">
            {total - completed} remaining
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(var(--border))" }}
        >
          <div
            className="h-full rounded-full progress-glow transition-all duration-700"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, oklch(var(--teal)), oklch(var(--emerald)))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
