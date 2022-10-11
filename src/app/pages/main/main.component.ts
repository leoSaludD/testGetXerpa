import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { GoalListComponent } from '../goal-list/goal-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(GoalListComponent) goalList: GoalListComponent;

  constructor(private simulationService: SimulatorService) { }

  ngOnInit(): void {
  }
}
