import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmlistComponent } from './gmlist.component';

describe('GmlistComponent', () => {
  let component: GmlistComponent;
  let fixture: ComponentFixture<GmlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
