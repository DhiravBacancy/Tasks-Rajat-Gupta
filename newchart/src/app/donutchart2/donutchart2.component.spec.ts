import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donutchart2Component } from './donutchart2.component';

describe('Donutchart2Component', () => {
  let component: Donutchart2Component;
  let fixture: ComponentFixture<Donutchart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donutchart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donutchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
