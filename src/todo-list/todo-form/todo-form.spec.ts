import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoFormComponent } from './todo-form';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let submittedSpy: jest.Mock;

  beforeEach(async () => {
    submittedSpy = jest.fn();

    await TestBed.configureTestingModule({
      imports: [TodoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'taskForm',
      new FormGroup({
        title: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        priority: new FormControl('medium', { nonNullable: true }),
      })
    );
    component.submitted.subscribe(submittedSpy);
    fixture.detectChanges();
  });

  it('should render title and priority fields', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('#todoTitle')).toBeTruthy();
    expect(host.querySelector('#todoPriority')).toBeTruthy();
  });

  it('should emit submit when the form is submitted', () => {
    const form = (fixture.nativeElement as HTMLElement).querySelector('form');

    form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(submittedSpy).toHaveBeenCalledTimes(1);
  });
});
