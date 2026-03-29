import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Category, Priority } from "../backend";

interface TaskInputCardProps {
  onAdd: (
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
  ) => void;
  isLoading?: boolean;
}

export function TaskInputCard({ onAdd, isLoading }: TaskInputCardProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.medium);
  const [category, setCategory] = useState<Category>(Category.personal);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), priority, category, dueDate || undefined);
    setTitle("");
    setDueDate("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const priorityConfig = [
    { value: Priority.low, label: "Low", color: "oklch(var(--priority-low))" },
    {
      value: Priority.medium,
      label: "Med",
      color: "oklch(var(--priority-medium))",
    },
    {
      value: Priority.high,
      label: "High",
      color: "oklch(var(--priority-high))",
    },
  ] as const;

  const categoryConfig = [
    { value: Category.personal, label: "Personal" },
    { value: Category.work, label: "Work" },
    { value: Category.academic, label: "Academic" },
  ] as const;

  return (
    <div className="glass-card rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">New Task</span>
        <div className="flex items-center gap-2">
          {priorityConfig.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-all"
              style={{
                background:
                  priority === p.value
                    ? `${p.color}33`
                    : "oklch(var(--muted) / 0.3)",
                color:
                  priority === p.value
                    ? p.color
                    : "oklch(var(--muted-foreground))",
                border: `1px solid ${
                  priority === p.value ? p.color : "transparent"
                }`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: p.color }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          data-ocid="todo.input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground text-sm h-9"
        />
        <Button
          data-ocid="todo.add_button"
          onClick={handleSubmit}
          disabled={!title.trim() || isLoading}
          size="sm"
          className="h-9 w-9 p-0 blue-glow"
          style={{
            background: "oklch(var(--blue))",
            color: "white",
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex gap-1">
          {categoryConfig.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className="text-xs px-2.5 py-1 rounded-md transition-all"
              style={{
                background:
                  category === c.value
                    ? "oklch(var(--blue) / 0.15)"
                    : "oklch(var(--muted) / 0.3)",
                color:
                  category === c.value
                    ? "oklch(var(--blue))"
                    : "oklch(var(--muted-foreground))",
                border: `1px solid ${
                  category === c.value
                    ? "oklch(var(--blue) / 0.4)"
                    : "transparent"
                }`,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input
          data-ocid="todo.input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="ml-auto text-xs h-7 px-2 rounded-md border border-border text-muted-foreground"
          style={{ background: "oklch(var(--input))" }}
        />
      </div>
    </div>
  );
}
