import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcategoriesComponent } from './gcategories.component';

describe('GcategoriesComponent', () => {
  let component: GcategoriesComponent;
  let fixture: ComponentFixture<GcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
