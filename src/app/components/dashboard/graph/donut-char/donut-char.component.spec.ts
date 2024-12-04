import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutCharComponent } from './donut-char.component';

describe('DonutCharComponent', () => {
  let component: DonutCharComponent;
  let fixture: ComponentFixture<DonutCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonutCharComponent]
    });
    fixture = TestBed.createComponent(DonutCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
