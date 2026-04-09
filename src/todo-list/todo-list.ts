import {  Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

type TodoPriority = 'high' | 'medium' | 'low';
type TodoFilter = 'all' | 'completed' | 'incomplete';

type TodoTask = {
  id: string;
  title: string;
  priority: TodoPriority;
  completed: boolean;
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

  constructor() {
    effect(() => {
      this.count.set(document.querySelectorAll('#todoList>li').length)
    })
  }

  toggleClass(ev: MouseEvent, className: string) {
    const el = ev.currentTarget as HTMLElement;
    el.classList.toggle(className);
  }

  addTask(title: string, priority: TodoPriority) {}

  deleteTask(id: string) {}

  toggleTask(id: string) {}

  getFilteredAndSortedTasks(): TodoTask[] {
    return [];
  }

}
