import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal';
import { Rule } from 'src/app/models/rule';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';

@Component({
  selector: 'app-goal-simulation',
  templateUrl: './goal-simulation.component.html',
  styleUrls: ['./goal-simulation.component.scss']
})
export class GoalSimulationComponent implements OnInit {

  displayedColumns: string[] = ['type', 'event', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Rule>();

  events: string[] = ['Gane', 'Juegue', 'Meta Gol'];
  goal: Goal;
  
  constructor(
    private simulationService: SimulatorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.simulationService.dataLoaded) {
      this.playSimulation();
    } else { 
      this.simulationService.dataLoadedEvent.subscribe(() => {
        this.playSimulation();
      });
    }
    
  }

  playSimulation() { 
    const goalId = parseInt(this.route.snapshot.params['goalId']);
    this.goal = this.simulationService.getGoal(goalId);
    this.simulationService.playSimulation(this.goal);
  }

}
