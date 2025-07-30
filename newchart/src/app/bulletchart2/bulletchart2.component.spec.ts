import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bulletchart2Component } from './bulletchart2.component';

describe('Bulletchart2Component', () => {
  let component: Bulletchart2Component;
  let fixture: ComponentFixture<Bulletchart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bulletchart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bulletchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
