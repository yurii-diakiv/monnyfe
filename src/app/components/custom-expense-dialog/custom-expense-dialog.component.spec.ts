import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExpenseDialogComponent } from './custom-expense-dialog.component';

describe('CustomExpenseDialogComponent', () => {
  let component: CustomExpenseDialogComponent;
  let fixture: ComponentFixture<CustomExpenseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomExpenseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
