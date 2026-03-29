import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchCardProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchCard({ value, onChange }: SearchCardProps) {
  return (
    <div className="glass-card rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-semibold text-foreground">Search Tasks</h3>
      <div className="relative">
        <Search
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        />
        <Input
          data-ocid="todo.search_input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Filter tasks..."
          className="pl-8 h-8 text-sm bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}
