import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a valid task and reset the form', () => {
    addTaskThroughForm('Nueva tarea', 'high');

    expect(getTaskLabels()).toEqual(['Nueva tarea (Alta)']);
    expect(getTitleInput().value).toBe('');
    expect(getPrioritySelect().value).toBe('medium');
  });

  it('should not submit when the form is invalid', () => {
    submitForm();

    expect(component.taskForm.controls.title.touched).toBe(true);
    expect(getEmptyStateText()).toBe('No tasks yet');
  });

  it('should not add task when store rejects it (whitespace-only title)', () => {
    addTaskThroughForm('   ', 'high');

    expect(getEmptyStateText()).toBe('No tasks yet');
  });

  function addTaskThroughForm(title: string, priority: 'high' | 'medium' | 'low') {
    const titleInput = getTitleInput();
    const prioritySelect = getPrioritySelect();

    titleInput.value = title;
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));

    prioritySelect.value = priority;
    prioritySelect.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();
    submitForm();
  }

  function submitForm() {
    getHost().querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
  }

  function getTaskLabels(): string[] {
    return Array.from(getHost().querySelectorAll('#todoList li label'))
      .map((el) => el.textContent?.trim() ?? '');
  }

  function getEmptyStateText(): string | undefined {
    return getHost().querySelector('#todoList li')?.textContent?.trim();
  }

  function getTitleInput(): HTMLInputElement {
    return getHost().querySelector('#todoTitle') as HTMLInputElement;
  }

  function getPrioritySelect(): HTMLSelectElement {
    return getHost().querySelector('#todoPriority') as HTMLSelectElement;
  }

  function getHost(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }
});