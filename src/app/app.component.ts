import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompetitionData } from './models/competition-data';
import { CompetitionTeams } from './models/competition-teams';
import { FootballDataService } from './services/football-data/football-data.service';
import { SimulatorService } from './services/simulator/simulator.service';
import { SnackbarService } from './services/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UEFACL';
  showLoader: boolean = false;
  constructor(
    private footballDataService: FootballDataService,
    private simulatorService: SimulatorService
  ) {

  }

  ngOnInit(): void {
    this.initializeSimulator();
  }

  initializeSimulator(): void {
    this.showLoader = true;
    Promise.all([
      this.footballDataService.getCompetitionTeams(), 
      this.footballDataService.getCompetitionMatches()
    ]).then(results => {
      this.simulatorService.setTeams(results[0] as CompetitionTeams);
      this.simulatorService.setStandingFromMatches(results[1] as CompetitionData);
      this.showLoader = false;
    });
  }
}
