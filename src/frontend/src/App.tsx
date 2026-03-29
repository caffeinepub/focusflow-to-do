import { Toaster } from "@/components/ui/sonner";
import {
  BarChart2,
  FolderOpen,
  LayoutDashboard,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Category, type Priority } from "./backend";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { ProgressStrip } from "./components/ProgressStrip";
import { QuoteCard } from "./components/QuoteCard";
import { SearchCard } from "./components/SearchCard";
import { TaskInputCard } from "./components/TaskInputCard";
import { TaskRow } from "./components/TaskRow";
import {
  useCreateTask,
  useDeleteTask,
  useGetAllTasks,
  useGetTodayStats,
  useToggleTask,
  useUpdateTask,
} from "./hooks/useQueries";

type CategoryTab = "all" | Category;

export default function App() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [search, setSearch] = useState("");
  const [newTaskIds, setNewTaskIds] = useState<Set<string>>(new Set());
  const prevTaskCount = useRef(0);

  const { data: tasks = [], isLoading: tasksLoading } = useGetAllTasks();
  const { data: stats } = useGetTodayStats();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const toggleTask = useToggleTask();

  const completed = stats ? Number(stats.completedTasks) : 0;
  const total = stats ? Number(stats.totalTasks) : 0;

  const handleAddTask = async (
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
  ) => {
    try {
      const newTask = await createTask.mutateAsync({
        title,
        priority,
        category,
        dueDate,
      });
      const idStr = newTask.id.toString();
      setNewTaskIds((prev) => new Set(prev).add(idStr));
      setTimeout(() => {
        setNewTaskIds((prev) => {
          const next = new Set(prev);
          next.delete(idStr);
          return next;
        });
      }, 600);
      toast.success("Task added!");
    } catch {
      toast.error("Failed to add task.");
    }
  };

  const handleToggle = async (id: bigint) => {
    try {
      await toggleTask.mutateAsync(id);
    } catch {
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteTask.mutateAsync(id);
      toast.success("Task deleted.");
    } catch {
      toast.error("Failed to delete task.");
    }
  };

  const handleEdit = async (
    id: bigint,
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
  ) => {
    try {
      await updateTask.mutateAsync({
        id,
        input: { title, priority, category, dueDate },
      });
      toast.success("Task updated.");
    } catch {
      toast.error("Failed to update task.");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab !== "all" && t.category !== activeTab) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return 0;
  });

  if (tasks.length !== prevTaskCount.current) {
    prevTaskCount.current = tasks.length;
  }

  const tabs: { id: CategoryTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: Category.personal, label: "Personal" },
    { id: Category.work, label: "Work" },
    { id: Category.academic, label: "Academic" },
  ];

  const navLinks = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderOpen, label: "Projects" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

  return (
    <div className="app-bg min-h-screen">
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.16 0.04 258)",
            border: "1px solid oklch(0.23 0.048 255)",
            color: "oklch(0.94 0.018 270)",
          },
        }}
      />

      <ProgressStrip completed={completed} total={total} />

      <header
        className="sticky top-0 z-40 w-full border-b"
        style={{
          background: "oklch(0.118 0.028 258 / 0.9)",
          borderColor: "oklch(0.23 0.048 255)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "oklch(var(--blue))" }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-foreground text-base tracking-tight">
                FocusFlow
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                v1
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link, i) => (
              <button
                type="button"
                key={link.label}
                data-ocid={`nav.link.${i + 1}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors"
                style={{
                  color:
                    i === 0
                      ? "oklch(var(--blue))"
                      : "oklch(var(--muted-foreground))",
                  background:
                    i === 0 ? "oklch(var(--blue) / 0.1)" : "transparent",
                }}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "oklch(var(--blue) / 0.2)" }}
            >
              <User
                className="w-4 h-4"
                style={{ color: "oklch(var(--blue))" }}
              />
            </div>
            <span
              className="text-sm hidden sm:block"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              You
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 min-w-0 space-y-5">
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Good {greeting},
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {total === 0
                  ? "No tasks yet — add one below!"
                  : `${total - completed} task${
                      total - completed !== 1 ? "s" : ""
                    } to go`}
              </p>
            </div>

            <TaskInputCard
              onAdd={handleAddTask}
              isLoading={createTask.isPending}
            />

            <div className="glass-card rounded-lg overflow-hidden">
              <div
                className="flex items-center gap-0 border-b px-3"
                style={{ borderColor: "oklch(var(--border))" }}
              >
                {tabs.map((tab) => (
                  <button
                    type="button"
                    key={tab.id}
                    data-ocid="todo.filter.tab"
                    onClick={() => setActiveTab(tab.id)}
                    className="px-3 py-3 text-sm font-medium transition-colors relative"
                    style={{
                      color:
                        activeTab === tab.id
                          ? "oklch(var(--foreground))"
                          : "oklch(var(--muted-foreground))",
                    }}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: "oklch(var(--blue))" }}
                      />
                    )}
                  </button>
                ))}
                <span
                  className="ml-auto text-xs pr-1"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {sortedTasks.length} task{sortedTasks.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="p-3 space-y-2">
                {tasksLoading ? (
                  <div
                    data-ocid="todo.loading_state"
                    className="py-10 text-center text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-t-transparent mx-auto mb-3 animate-spin"
                      style={{ borderColor: "oklch(var(--blue))" }}
                    />
                    Loading tasks...
                  </div>
                ) : sortedTasks.length === 0 ? (
                  <div
                    data-ocid="todo.empty_state"
                    className="py-10 text-center"
                  >
                    <div className="text-3xl mb-3">✅</div>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {search
                        ? "No tasks match your search."
                        : activeTab === "all"
                          ? "No tasks yet. Add one above!"
                          : `No ${activeTab} tasks yet.`}
                    </p>
                  </div>
                ) : (
                  sortedTasks.map((task, idx) => (
                    <TaskRow
                      key={task.id.toString()}
                      task={task}
                      index={idx}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      isNew={newTaskIds.has(task.id.toString())}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
            <PomodoroTimer />
            <QuoteCard />
            <SearchCard value={search} onChange={setSearch} />
          </div>
        </div>
      </main>

      <footer
        className="mt-10 border-t py-5 text-center text-xs"
        style={{
          borderColor: "oklch(var(--border))",
          color: "oklch(var(--muted-foreground))",
        }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "oklch(var(--priority-high))" }}>♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "oklch(var(--blue))" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
