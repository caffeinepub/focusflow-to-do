import { Button } from "@/components/ui/button";
import { Coffee, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function PomodoroTimer() {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = mode === "focus" ? FOCUS_DURATION : BREAK_DURATION;
  const progress = (secondsLeft / total) * CIRCUMFERENCE;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(mode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  };

  const switchMode = () => {
    const next = mode === "focus" ? "break" : "focus";
    setMode(next);
    setRunning(false);
    setSecondsLeft(next === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  };

  const ringColor =
    mode === "focus" ? "oklch(0.59 0.2 260)" : "oklch(0.72 0.19 152)";

  return (
    <div className="glass-card rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Pomodoro Timer
        </h3>
        <button
          type="button"
          data-ocid="pomodoro.toggle"
          onClick={switchMode}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
          style={{
            background:
              mode === "break"
                ? "oklch(var(--emerald) / 0.15)"
                : "oklch(var(--muted) / 0.4)",
            color:
              mode === "break"
                ? "oklch(var(--emerald))"
                : "oklch(var(--muted-foreground))",
          }}
        >
          <Coffee className="w-3 h-3" />
          {mode === "focus" ? "Focus" : "Break"}
        </button>
      </div>

      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            className="-rotate-90 w-full h-full"
            aria-label={`Pomodoro timer: ${mins}:${secs} remaining in ${mode} mode`}
            role="img"
          >
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              strokeWidth="6"
              className="timer-ring-track"
            />
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              strokeWidth="6"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - progress}
              strokeLinecap="round"
              style={{
                stroke: ringColor,
                filter: `drop-shadow(0 0 6px ${ringColor})`,
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground font-mono">
              {mins}:{secs}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              {mode === "focus" ? "Focus" : "Break"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          data-ocid="pomodoro.primary_button"
          size="sm"
          onClick={() => setRunning((r) => !r)}
          className="gap-1.5 text-xs"
          style={{
            background: running ? "oklch(var(--muted))" : "oklch(var(--blue))",
            color: "white",
          }}
        >
          {running ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          data-ocid="pomodoro.secondary_button"
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="gap-1.5 text-xs border-border text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
