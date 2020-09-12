import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeditCategoriesComponent } from './gedit-categories.component';

describe('GeditCategoriesComponent', () => {
  let component: GeditCategoriesComponent;
  let fixture: ComponentFixture<GeditCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeditCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
