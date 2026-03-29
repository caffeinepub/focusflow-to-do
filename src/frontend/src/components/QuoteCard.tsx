import { Quote } from "lucide-react";
import { getDailyQuote } from "../data/quotes";

export function QuoteCard() {
  const quote = getDailyQuote();

  return (
    <div className="glass-card rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Quote
          className="w-4 h-4 flex-shrink-0"
          style={{ color: "oklch(var(--emerald))" }}
        />
        <h3 className="text-sm font-semibold text-foreground">
          Millionaire Mindset
        </h3>
      </div>
      <blockquote
        className="text-sm leading-relaxed italic"
        style={{ color: "oklch(var(--foreground) / 0.85)" }}
      >
        "{quote.text}"
      </blockquote>
      <p className="text-xs text-right" style={{ color: "oklch(var(--blue))" }}>
        — {quote.author}
      </p>
    </div>
  );
}
