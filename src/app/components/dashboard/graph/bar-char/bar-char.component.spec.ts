import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCharComponent } from './bar-char.component';

describe('BarCharComponent', () => {
  let component: BarCharComponent;
  let fixture: ComponentFixture<BarCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarCharComponent]
    });
    fixture = TestBed.createComponent(BarCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
