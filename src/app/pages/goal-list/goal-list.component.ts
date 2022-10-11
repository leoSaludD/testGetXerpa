import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal';
import { MatTableDataSource } from '@angular/material/table';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'type', 'date', 'amount', 'simulate'];
  dataSource = new MatTableDataSource<Goal>();
  constructor(
    private simulatorService: SimulatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  refreshDataSource() {
    console.log(this.simulatorService.goals);
    this.dataSource = new MatTableDataSource(this.simulatorService.goals);
  }

  playSimulation(goal: Goal) {
    this.router.navigate(['/simulate-goal', { goal: goal, goalId: goal.goalId }]);
  }

  editGoal(goal: Goal) { 
    this.router.navigate(['/goal-form', { goal: goal, goalId: goal.goalId }]);
  }
}
