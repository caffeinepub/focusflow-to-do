import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Category, Priority, type Task } from "../backend";

interface TaskRowProps {
  task: Task;
  index: number;
  onToggle: (id: bigint) => void;
  onDelete: (id: bigint) => void;
  onEdit: (
    id: bigint,
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
  ) => void;
  isNew?: boolean;
}

const priorityColors: Record<Priority, string> = {
  [Priority.high]: "oklch(var(--priority-high))",
  [Priority.medium]: "oklch(var(--priority-medium))",
  [Priority.low]: "oklch(var(--priority-low))",
};

const priorityLabels: Record<Priority, string> = {
  [Priority.high]: "High",
  [Priority.medium]: "Med",
  [Priority.low]: "Low",
};

const categoryLabels: Record<Category, string> = {
  [Category.personal]: "Personal",
  [Category.work]: "Work",
  [Category.academic]: "Academic",
};

export function TaskRow({
  task,
  index,
  onToggle,
  onDelete,
  onEdit,
  isNew,
}: TaskRowProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDueDate, setEditDueDate] = useState(task.dueDate ?? "");

  const today = new Date().toISOString().split("T")[0];
  const isDueToday = task.dueDate === today;

  const saveEdit = () => {
    onEdit(
      task.id,
      editTitle,
      editPriority,
      editCategory,
      editDueDate || undefined,
    );
    setEditing(false);
  };

  const ocidIndex = index + 1;

  return (
    <div
      data-ocid={`todo.item.${ocidIndex}`}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md border transition-all group ${
        isNew ? "task-fade-in" : ""
      }`}
      style={{
        background: "oklch(var(--card) / 0.6)",
        borderColor:
          isDueToday && !task.completed
            ? "oklch(var(--priority-high) / 0.4)"
            : "oklch(var(--border) / 0.5)",
      }}
    >
      <button
        type="button"
        data-ocid={`todo.checkbox.${ocidIndex}`}
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
        style={{
          background: task.completed ? "oklch(var(--blue))" : "transparent",
          borderColor: task.completed
            ? "oklch(var(--blue))"
            : "oklch(var(--border))",
        }}
      >
        {task.completed && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            className="h-6 text-sm py-0 bg-input border-border"
            autoFocus
          />
        ) : (
          <span
            className={`text-sm truncate block ${
              task.completed ? "task-strike" : ""
            } ${isDueToday && !task.completed ? "font-medium" : ""}`}
            style={{
              color:
                isDueToday && !task.completed
                  ? "oklch(var(--priority-high))"
                  : task.completed
                    ? "oklch(var(--muted-foreground))"
                    : "oklch(var(--foreground))",
            }}
          >
            {task.title}
          </span>
        )}
      </div>

      {!editing && (
        <span
          className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium"
          style={{
            background: `${priorityColors[task.priority]}22`,
            color: priorityColors[task.priority],
            border: `1px solid ${priorityColors[task.priority]}44`,
          }}
        >
          {priorityLabels[task.priority]}
        </span>
      )}

      {!editing && (
        <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
          {categoryLabels[task.category]}
        </span>
      )}

      {!editing && task.dueDate && (
        <span
          className="text-xs flex-shrink-0 hidden md:block"
          style={{
            color: isDueToday
              ? "oklch(var(--priority-high))"
              : "oklch(var(--muted-foreground))",
          }}
        >
          {task.dueDate}
        </span>
      )}

      {editing && (
        <div className="flex gap-1 flex-shrink-0">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="text-xs h-6 rounded px-1 border border-border bg-input text-foreground"
          >
            <option value={Priority.low}>Low</option>
            <option value={Priority.medium}>Med</option>
            <option value={Priority.high}>High</option>
          </select>
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as Category)}
            className="text-xs h-6 rounded px-1 border border-border bg-input text-foreground"
          >
            <option value={Category.personal}>Personal</option>
            <option value={Category.work}>Work</option>
            <option value={Category.academic}>Academic</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="text-xs h-6 rounded px-1 border border-border bg-input text-foreground"
          />
        </div>
      )}

      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <button
            type="button"
            onClick={saveEdit}
            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-accent"
            style={{ color: "oklch(var(--emerald))" }}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            data-ocid={`todo.edit_button.${ocidIndex}`}
            onClick={() => setEditing(true)}
            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-accent"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          data-ocid={`todo.delete_button.${ocidIndex}`}
          onClick={() => onDelete(task.id)}
          className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-destructive/20"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
