/**
 * TypeScript sample for checking theme colors.
 * Covers: imports, types, interfaces, enums, classes, generics,
 * decorators, async/await, template literals, and regular expressions.
 */
import { readFile } from "node:fs/promises";
import * as path from "node:path";

// Line comment
export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export interface Task {
  readonly id: number;
  title: string;
  priority: Priority;
  tags?: string[];
  dueDate: Date | null;
}

type TaskFilter<T extends Task = Task> = (task: T) => boolean;

const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i;
const MAX_TASKS = 1_000;
const RATIO = 0.75;
const MASK = 0xff;

function log(target: object, key: string, descriptor: PropertyDescriptor): void {
  const original = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(`[${key}] called with`, args);
    return original.apply(this, args);
  };
}

export class TaskRepository<T extends Task> {
  private readonly tasks = new Map<number, T>();
  static instanceCount = 0;

  constructor(private readonly filePath: string) {
    TaskRepository.instanceCount++;
  }

  @log
  add(task: T): this {
    if (this.tasks.size >= MAX_TASKS) {
      throw new RangeError(`Cannot add more than ${MAX_TASKS} tasks`);
    }
    this.tasks.set(task.id, task);
    return this;
  }

  find(filter: TaskFilter<T>): T[] {
    return [...this.tasks.values()].filter(filter);
  }

  async load(): Promise<number> {
    try {
      const json = await readFile(path.resolve(this.filePath), "utf8");
      const items = JSON.parse(json) as T[];
      items.forEach((item) => this.add(item));
      return items.length;
    } catch (error: unknown) {
      console.error("Failed to load tasks:", error);
      return 0;
    } finally {
      console.debug("load finished");
    }
  }
}

const isUrgent: TaskFilter = ({ priority, dueDate }) =>
  priority === Priority.High && dueDate !== null && dueDate.getTime() < Date.now();

const repo = new TaskRepository<Task>("./tasks.json");
repo.add({ id: 1, title: "Write README", priority: Priority.High, dueDate: new Date() });
console.log(repo.find(isUrgent).length > 0 ? "urgent" : "ok", EMAIL_PATTERN.test("a@b.co"), RATIO * MASK);
