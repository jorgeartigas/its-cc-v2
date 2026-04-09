import {  Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

type TodoPriority = 'high' | 'medium' | 'low';
type TodoFilter = 'all' | 'completed' | 'incomplete';

type TodoTask = {
  id: number;
  title: string;
  priority: TodoPriority;
  completed: boolean;
};

const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
};


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
})
export class TodoListComponent  {
  count = signal<number>(0)
  tasks: TodoTask[] = [];
  currentFilter: TodoFilter = 'all';
  private nextId = 1;

  constructor() {
    effect(() => {
      this.count.set(document.querySelectorAll('#todoList>li').length)
    })
  }

  toggleClass(ev: MouseEvent, className: string) {
    const el = ev.currentTarget as HTMLElement;
    el.classList.toggle(className);
  }

  addTask(title: string, priority: TodoPriority) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    this.tasks = [
      ...this.tasks,
      {
        id: this.nextId++,
        title: trimmedTitle,
        priority,
        completed: false,
      },
    ];
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTask(id: number) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  getFilteredAndSortedTasks(): TodoTask[] {
    return this.tasks
      .filter((task) => {
        switch (this.currentFilter) {
          case 'completed':
            return task.completed;
          case 'incomplete':
            return !task.completed;
          default:
            return true;
        }
      })
      .sort((left, right) => PRIORITY_ORDER[right.priority] - PRIORITY_ORDER[left.priority]);
  }

}
