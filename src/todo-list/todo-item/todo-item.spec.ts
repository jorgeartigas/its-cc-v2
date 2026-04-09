import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let toggledSpy: jest.Mock;
  let removedSpy: jest.Mock;

  beforeEach(async () => {
    toggledSpy = jest.fn();
    removedSpy = jest.fn();

    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: 7,
      title: 'Revisar PR',
      priority: 'high',
      completed: false,
    });
    component.toggled.subscribe(toggledSpy);
    component.removed.subscribe(removedSpy);
    fixture.detectChanges();
  });

  it('should render the task title and priority label', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toContain('Revisar PR');
    expect(host.textContent).toContain('Alta');
  });

  it('should emit toggle when the checkbox changes', () => {
    const host = fixture.nativeElement as HTMLElement;
    const checkbox = host.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(toggledSpy).toHaveBeenCalledWith(7);
  });

  it('should emit remove when the delete button is clicked', () => {
    const host = fixture.nativeElement as HTMLElement;
    const deleteButton = host.querySelector('button') as HTMLButtonElement;

    deleteButton.click();
    fixture.detectChanges();

    expect(removedSpy).toHaveBeenCalledWith(7);
  });
});
