import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjsChartComponent } from './bjs-chart.component';

describe('BjsChartComponent', () => {
  let component: BjsChartComponent;
  let fixture: ComponentFixture<BjsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
