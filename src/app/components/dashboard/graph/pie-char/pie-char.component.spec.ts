import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCharComponent } from './pie-char.component';

describe('PieCharComponent', () => {
  let component: PieCharComponent;
  let fixture: ComponentFixture<PieCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieCharComponent]
    });
    fixture = TestBed.createComponent(PieCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
