import { TodoStore } from './todo.store';

describe('TodoStore', () => {
  let store: TodoStore;

  beforeEach(() => {
    store = new TodoStore();
  });

  it('should start with no tasks', () => {
    expect(store.tasks()).toEqual([]);
    expect(store.pendingTasksCount()).toBe(0);
  });

  it('should add a task with title and priority', () => {
    const wasAdded = store.addTask('Nueva tarea', 'high');

    expect(wasAdded).toBe(true);
    expect(store.tasks()).toHaveLength(1);
    expect(store.tasks()[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Nueva tarea',
        priority: 'high',
        completed: false,
      })
    );
  });

  it('should not add tasks when title is empty', () => {
    store.addTask('Tarea válida', 'medium');

    const wasAdded = store.addTask('   ', 'low');

    expect(wasAdded).toBe(false);
    expect(store.tasks()).toHaveLength(1);
  });

  it('should assign incremental ids to new tasks', () => {
    store.addTask('Primera', 'medium');
    store.addTask('Segunda', 'low');

    expect(store.tasks().map((task) => task.id)).toEqual([1, 2]);
  });

  it('should toggle a task completion state', () => {
    store.addTask('Toggle complete', 'low');

    store.toggleTask(1);

    expect(store.tasks()[0].completed).toBe(true);
  });

  it('should toggle a completed task back to incomplete', () => {
    store.addTask('Toggle incomplete', 'low');
    store.toggleTask(1);

    store.toggleTask(1);

    expect(store.tasks()[0].completed).toBe(false);
  });

  it('should delete a task by id', () => {
    store.addTask('Elimina tarea', 'medium');

    store.deleteTask(1);

    expect(store.tasks()).toEqual([]);
  });

  it('should filter tasks by state', () => {
    store.addTask('Completada', 'medium');
    store.addTask('Pendiente', 'medium');
    store.toggleTask(1);

    store.setFilter('completed');
    expect(store.visibleTasks().map((task) => task.title)).toEqual(['Completada']);

    store.setFilter('incomplete');
    expect(store.visibleTasks().map((task) => task.title)).toEqual(['Pendiente']);
  });

  it('should order tasks by priority', () => {
    store.addTask('Baja', 'low');
    store.addTask('Alta', 'high');
    store.addTask('Media', 'medium');

    expect(store.visibleTasks().map((task) => task.priority)).toEqual([
      'high',
      'medium',
      'low',
    ]);
  });

  it('should count pending tasks', () => {
    store.addTask('Completada', 'medium');
    store.addTask('Pendiente', 'low');
    store.addTask('Otra pendiente', 'high');
    store.toggleTask(1);

    expect(store.pendingTasksCount()).toBe(2);
  });
});
