import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TodoFilter } from '../todo.store';

@Component({
  selector: 'app-todo-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-4 flex gap-2">
      <button
        type="button"
        data-filter="all"
        class="rounded border px-3 py-1"
        [class.bg-slate-200]="currentFilter() === 'all'"
        [attr.aria-pressed]="currentFilter() === 'all'"
        (click)="selectFilter('all')"
      >
        All
      </button>
      <button
        type="button"
        data-filter="completed"
        class="rounded border px-3 py-1"
        [class.bg-slate-200]="currentFilter() === 'completed'"
        [attr.aria-pressed]="currentFilter() === 'completed'"
        (click)="selectFilter('completed')"
      >
        Completed
      </button>
      <button
        type="button"
        data-filter="incomplete"
        class="rounded border px-3 py-1"
        [class.bg-slate-200]="currentFilter() === 'incomplete'"
        [attr.aria-pressed]="currentFilter() === 'incomplete'"
        (click)="selectFilter('incomplete')"
      >
        Incomplete
      </button>
    </div>
  `,
})
export class TodoFiltersComponent {
  readonly currentFilter = input.required<TodoFilter>();
  readonly filterSelected = output<TodoFilter>();

  selectFilter(filter: TodoFilter) {
    this.filterSelected.emit(filter);
  }
}
