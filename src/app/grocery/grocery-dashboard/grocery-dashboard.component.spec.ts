import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryDashboardComponent } from './grocery-dashboard.component';

describe('GroceryDashboardComponent', () => {
  let component: GroceryDashboardComponent;
  let fixture: ComponentFixture<GroceryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
