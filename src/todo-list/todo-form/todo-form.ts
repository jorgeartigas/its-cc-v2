import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `

      <form
        class="mb-4 flex w-full flex-col gap-2"
        [formGroup]="taskForm()"
        (submit)="handleSubmit($event)"
      >
        <label for="todoTitle" class="text-sm font-medium">Task title</label>
        <input
          id="todoTitle"
          type="text"
          class="rounded border p-2"
          required
          formControlName="title"
          [attr.aria-invalid]="showTitleError()"
          [attr.aria-describedby]="showTitleError() ? titleErrorId : null"
        />
        @if (showTitleError()) {
          <p id="todoTitleError" class="text-sm text-red-600" role="alert">
            Task title is required.
          </p>
        }

        <label for="todoPriority" class="text-sm font-medium">Priority</label>
        <select
          id="todoPriority"
          class="rounded border p-2"
          formControlName="priority"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          type="submit"
          class="rounded border bg-slate-100 p-2 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
          [disabled]="taskForm().invalid"
        >
          Add task
        </button>
      </form>
  `,
})
export class TodoFormComponent {
  readonly taskForm = input.required<FormGroup>();
  readonly submitted = output<void>();
  readonly titleErrorId = 'todoTitleError';
  readonly showTitleError = toSignal(
    toObservable(this.taskForm).pipe(
      switchMap((taskForm) => {
        const titleControl = taskForm?.get('title');

        if (!titleControl) {
          return of(false);
        }

        return titleControl.events.pipe(
          startWith(null),
          map(() => titleControl.invalid && titleControl.touched)
        );
      })
    ),
    { initialValue: false }
  );

  handleSubmit(event: Event) {
    event.preventDefault();
    this.submitted.emit();
  }
}
