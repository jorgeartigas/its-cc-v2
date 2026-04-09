import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { PRIORITY_LABELS, TodoTask } from '../todo.store';

@Component({
  selector: 'li[app-todo-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex items-center justify-between gap-4',
  },
  template: `
    <div class="flex items-center gap-4">
      <input
        type="checkbox"
        class="hover:cursor-pointer"
        [id]="checkboxId()"
        [checked]="task().completed"
        [attr.aria-label]="'Marcar ' + task().title"
        (change)="toggled.emit(task().id)"
      />
      <label
        [for]="checkboxId()"
        class="hover:cursor-pointer"
        [class.line-through]="task().completed"
      >
        {{ task().title }} ({{ priorityLabel() }})
      </label>
    </div>

    <button
      type="button"
      class="rounded border px-2 py-1 hover:bg-slate-100"
      [attr.aria-label]="'Eliminar ' + task().title"
      (click)="removed.emit(task().id)"
    >
      Eliminar
    </button>
  `,
})
export class TodoItemComponent {
  readonly task = input.required<TodoTask>();
  readonly toggled = output<number>();
  readonly removed = output<number>();
  readonly checkboxId = computed(() => `task-${this.task().id}`);
  readonly priorityLabel = computed(() => PRIORITY_LABELS[this.task().priority]);
}
