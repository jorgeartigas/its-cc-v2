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

  it('should start with no tasks', () => {
    expect(component.tasks).toEqual([]);
  });

  it('should add a task with title and priority', () => {
    component.addTask('Nueva tarea', 'high');

    expect(component.tasks).toHaveLength(1);
    expect(component.tasks[0]).toEqual(
      expect.objectContaining({
        title: 'Nueva tarea',
        priority: 'high',
        completed: false,
      })
    );
  });

  it('should not add tasks when title is empty', () => {
    component.addTask('Tarea válida', 'medium');
    component.addTask('', 'medium');

    expect(component.tasks).toHaveLength(1);
    expect(component.tasks[0].title).toBe('Tarea válida');
  });

  it('should toggle a task completion state', () => {
    component.tasks = [
      { id: 1, title: 'Toggle estado', priority: 'low', completed: false },
    ];

    component.toggleTask(1);

    expect(component.tasks[0].completed).toBe(true);
  });

  it('should delete a task by id', () => {
    component.tasks = [
      { id: 1, title: 'Elimina tarea', priority: 'medium', completed: false },
    ];

    component.deleteTask(1);

    expect(component.tasks).toEqual([]);
  });

  it('should filter tasks by state', () => {
    component.tasks = [
      { id: 1, title: 'Completada', priority: 'medium', completed: true },
      { id: 2, title: 'Pendiente', priority: 'medium', completed: false },
    ];

    component.currentFilter = 'completed';
    expect(component.getFilteredAndSortedTasks().map((task) => task.title)).toEqual([
      'Completada',
    ]);

    component.currentFilter = 'incomplete';
    expect(component.getFilteredAndSortedTasks().map((task) => task.title)).toEqual([
      'Pendiente',
    ]);
  });

  it('should order tasks by priority', () => {
    component.tasks = [
      { id: 1, title: 'Baja', priority: 'low', completed: false },
      { id: 2, title: 'Alta', priority: 'high', completed: false },
      { id: 3, title: 'Media', priority: 'medium', completed: false },
    ];

    expect(component.getFilteredAndSortedTasks().map((task) => task.priority)).toEqual([
      'high',
      'medium',
      'low',
    ]);
  });
});
