import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFiltersComponent } from './todo-filters';

describe('TodoFiltersComponent', () => {
  let component: TodoFiltersComponent;
  let fixture: ComponentFixture<TodoFiltersComponent>;
  let filterSelectedSpy: jest.Mock;

  beforeEach(async () => {
    filterSelectedSpy = jest.fn();

    await TestBed.configureTestingModule({
      imports: [TodoFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFiltersComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentFilter', 'completed');
    component.filterSelected.subscribe(filterSelectedSpy);
    fixture.detectChanges();
  });

  it('should highlight the active filter', () => {
    const host = fixture.nativeElement as HTMLElement;
    const completedButton = host.querySelector(
      '[data-filter="completed"]'
    ) as HTMLButtonElement;

    expect(completedButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('should emit the selected filter on click', () => {
    const host = fixture.nativeElement as HTMLElement;
    const incompleteButton = host.querySelector(
      '[data-filter="incomplete"]'
    ) as HTMLButtonElement;

    incompleteButton.click();
    fixture.detectChanges();

    expect(filterSelectedSpy).toHaveBeenCalledWith('incomplete');
  });
});
