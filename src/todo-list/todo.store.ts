import { computed, Injectable, signal } from '@angular/core';

export type TodoPriority = 'high' | 'medium' | 'low';
export type TodoFilter = 'all' | 'completed' | 'incomplete';

export type TodoTask = {
  id: number;
  title: string;
  priority: TodoPriority;
  completed: boolean;
};

const PRIORITY_ORDER: Record<TodoPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

@Injectable()
export class TodoStore {
  private readonly _tasks = signal<TodoTask[]>([]);
  readonly tasks = this._tasks.asReadonly();
  private readonly _currentFilter = signal<TodoFilter>('all');
  readonly currentFilter = this._currentFilter.asReadonly();
  readonly visibleTasks = computed(() => {
    return this._tasks()
      .filter((task) => {
        switch (this._currentFilter()) {
          case 'completed':
            return task.completed;
          case 'incomplete':
            return !task.completed;
          default:
            return true;
        }
      })
      .sort(
        (left, right) =>
          PRIORITY_ORDER[right.priority] - PRIORITY_ORDER[left.priority]
      );
  });
  readonly pendingTasksCount = computed(() => {
    return this._tasks().filter((task) => !task.completed).length;
  });
  private nextId = 1;

  setFilter(filter: TodoFilter) {
    this._currentFilter.set(filter);
  }

  addTask(title: string, priority: TodoPriority): boolean {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return false;
    }

    this._tasks.update((tasks) => [
      ...tasks,
      {
        id: this.nextId++,
        title: trimmedTitle,
        priority,
        completed: false,
      },
    ]);

    return true;
  }

  deleteTask(id: number) {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: number) {
    this._tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
