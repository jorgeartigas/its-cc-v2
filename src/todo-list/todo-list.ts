import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PRIORITY_LABELS, TodoPriority, TodoStore } from './todo.store';

@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TodoStore],
  templateUrl: './todo-list.html',
})
export class TodoListComponent  {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly todoStore = inject(TodoStore);
  readonly taskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    priority: ['medium' as TodoPriority],
  });
  readonly priorityLabels = PRIORITY_LABELS;

  submitTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, priority } = this.taskForm.getRawValue();
    const wasAdded = this.todoStore.addTask(title, priority);

    if (!wasAdded) {
      return;
    }

    this.taskForm.reset();
  }
}
