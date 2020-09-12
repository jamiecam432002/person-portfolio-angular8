import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdashboardComponent } from './gdashboard.component';

describe('GdashboardComponent', () => {
  let component: GdashboardComponent;
  let fixture: ComponentFixture<GdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
