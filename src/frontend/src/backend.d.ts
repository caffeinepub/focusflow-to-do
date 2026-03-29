import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TaskInput {
    title: string;
    dueDate?: string;
    category: Category;
    priority: Priority;
}
export interface Task {
    id: bigint;
    title: string;
    createdAt: bigint;
    completed: boolean;
    dueDate?: string;
    category: Category;
    priority: Priority;
}
export interface Stats {
    totalTasks: bigint;
    completedTasks: bigint;
}
export enum Category {
    work = "work",
    academic = "academic",
    personal = "personal"
}
export enum Priority {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    createTask(input: TaskInput): Promise<Task>;
    deleteTask(taskId: bigint): Promise<void>;
    getAllTasks(): Promise<Array<Task>>;
    getDailyQuote(): Promise<string>;
    getTask(taskId: bigint): Promise<Task>;
    getTodayStats(): Promise<Stats>;
    toggleTaskCompletion(taskId: bigint): Promise<Task>;
    updateTask(taskId: bigint, input: TaskInput): Promise<Task>;
}
