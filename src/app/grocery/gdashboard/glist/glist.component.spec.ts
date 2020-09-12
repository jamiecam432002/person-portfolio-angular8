import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlistComponent } from './glist.component';

describe('GlistComponent', () => {
  let component: GlistComponent;
  let fixture: ComponentFixture<GlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
