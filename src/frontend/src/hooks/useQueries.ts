import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskInput } from "../backend";
import { useActor } from "./useActor";

export function useGetAllTasks() {
  const { actor, isFetching } = useActor();
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDailyQuote() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["dailyQuote"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getDailyQuote();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTodayStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["todayStats"],
    queryFn: async () => {
      if (!actor) return { totalTasks: BigInt(0), completedTasks: BigInt(0) };
      return actor.getTodayStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TaskInput) => {
      if (!actor) throw new Error("No actor");
      return actor.createTask(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["todayStats"] });
    },
  });
}

export function useUpdateTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: TaskInput }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateTask(id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["todayStats"] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTask(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["todayStats"] });
    },
  });
}

export function useToggleTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.toggleTaskCompletion(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["todayStats"] });
    },
  });
}
