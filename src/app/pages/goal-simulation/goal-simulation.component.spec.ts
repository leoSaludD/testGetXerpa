import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSimulationComponent } from './goal-simulation.component';

describe('GoalSimulationComponent', () => {
  let component: GoalSimulationComponent;
  let fixture: ComponentFixture<GoalSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
