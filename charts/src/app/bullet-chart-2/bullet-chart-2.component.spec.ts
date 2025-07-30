import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletChart2Component } from './bullet-chart-2.component';

describe('BulletChart2Component', () => {
  let component: BulletChart2Component;
  let fixture: ComponentFixture<BulletChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletChart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
