import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { CompetitionData, Match, MatchScore } from 'src/app/models/competition-data';
import { CompetitionTeams } from 'src/app/models/competition-teams';
import { Goal } from 'src/app/models/goal';
import { TeamStanding } from 'src/app/models/team-standing';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  private _lastGoalId: number = 1;
  dataLoaded: boolean = false;
  dataLoadedEvent = new EventEmitter();

  goals: Goal[] = [
    { goalId: 1, type: 'Solo Ahorrar', date: new Date(), amount: 500, rules: [
      {team: 'AC Milan', event: 'Juegue', amount: 100, eventDescriptions: [], savedAmount: 0, timesActivated: 0 },
      {team: 'AC Milan', event: 'Meta Gol', amount: 100, eventDescriptions: [], savedAmount: 0, timesActivated: 0 }
    ], results: 0 }
  ];
  teams: string[];
  standingHash: TableStanding = {};

  constructor() { }

  playSimulation(g: Goal) {
    this.clearGoalSimulation(g);
    
    for(var r of g.rules) {
      let savedAmount: number = 0;
      switch(r.event) {
        case 'Gane':
          savedAmount = r.amount * this.standingHash[r.team].won; 
          g.results += savedAmount;
          r.savedAmount += savedAmount;
          r.timesActivated += this.standingHash[r.team].won;
          let wonDescriptions = this.standingHash[r.team].eventDescriptions.filter(ed => ed.indexOf('ganar') >=0);
          r.eventDescriptions = wonDescriptions.map(ed => `$${r.amount.toFixed(2)} ${ed}`);
          break;
        case 'Juegue':
          savedAmount = r.amount * this.standingHash[r.team].playedGames; 
          g.results += savedAmount;
          r.savedAmount += savedAmount;
          r.timesActivated += this.standingHash[r.team].playedGames;
          let playedDescriptions = this.standingHash[r.team].eventDescriptions.filter(ed => ed.indexOf('jugar') >=0);
          r.eventDescriptions = playedDescriptions.map(ed => `$${r.amount.toFixed(2)} ${ed}`);
          break;
        case 'Meta Gol':
          savedAmount = r.amount * this.standingHash[r.team].goalsFor; 
          g.results += savedAmount;
          r.savedAmount += savedAmount;
          r.timesActivated += this.standingHash[r.team].goalsFor;
          let goalDescriptions = this.standingHash[r.team].eventDescriptions.filter(ed => ed.indexOf('anotar') >=0);
          r.eventDescriptions = goalDescriptions.map(ed => {
            let split = ed.split("|");
            let goals = parseInt(split[1]);
            return `$${(r.amount * goals).toFixed(2)} ${split.join("")}`;
          });
          break;
      }

    }
  }

  clearGoalSimulation(g: Goal) {
    g.results = 0;
    for(var r of g.rules) {
      r.timesActivated = 0;
      r.savedAmount = 0;
      r.eventDescriptions = [];
    }
  }

  getGoal(goalId: number): Goal {
    return this.goals.filter(g => g.goalId == goalId)[0];
  }
  
  addGoal(newGoal: Goal) {
    this._lastGoalId++;
    newGoal.goalId = this._lastGoalId;
    this.goals.push(newGoal);
  }

  setTeams(rawTeams: CompetitionTeams): void {
    this.teams = rawTeams.teams.map((rt) => {
      return rt.name;
    });
    this.teams.sort();
  }

  setStandingFromMatches(competitionMatches: CompetitionData): void {
    this.standingHash = {};

    for(var match of competitionMatches.matches) {
      if(this.standingHash[match.homeTeam.name] == undefined) {
        this.standingHash[match.homeTeam.name] =  new TeamStanding(match.homeTeam.name);
      }
      let homeTeam: TeamStanding = this.standingHash[match.homeTeam.name] as TeamStanding;
      if(this.standingHash[match.awayTeam.name] == undefined) {
        this.standingHash[match.awayTeam.name] = new TeamStanding(match.awayTeam.name);
      }
      let awayTeam: TeamStanding = this.standingHash[match.awayTeam.name] as TeamStanding;
      debugger;
      this.setPlayedGames(homeTeam, awayTeam, new Date(match.utcDate));
      this.setWonLost(match, homeTeam, awayTeam);
      this.setGoals(match, homeTeam, awayTeam);
    }
    console.log(this.standingHash['AC Milan']);
    this.dataLoaded = true;
    this.dataLoadedEvent.emit(true);
  }


  private setPlayedGames(homeTeam: TeamStanding, awayTeam: TeamStanding, matchDay: Date) {
    homeTeam.eventDescriptions.push(` ahorrado por jugar contra ${awayTeam.name} el día ${formatDate(matchDay, 'YYYY-MM-dd', 'en-ES')}`);
    awayTeam.eventDescriptions.push(` ahorrado por jugar contra ${homeTeam.name} el día ${formatDate(matchDay, 'YYYY-MM-dd', 'en-ES')}`);
    homeTeam.playedGames++;
    awayTeam.playedGames++;
  }

  private setWonLost(match: Match, homeTeam: TeamStanding, awayTeam: TeamStanding) {
    
    if(match.score.winner == "HOME_TEAM") {
      homeTeam.eventDescriptions.push(` ahorrado por ganar contra ${awayTeam.name} el día ${formatDate(new Date(match.utcDate), 'YYYY-MM-dd', 'en-ES')}`);
      homeTeam.won++;
      awayTeam.lost++;
    } else if (match.score.winner == "DRAW") {
      homeTeam.draw++;
      awayTeam.draw++;
    } else {
      awayTeam.eventDescriptions.push(` ahorrado por ganar contra ${homeTeam.name} el día ${formatDate(new Date(match.utcDate), 'YYYY-MM-dd', 'en-ES')}`);
      awayTeam.won++;
      homeTeam.lost++;
    }
  }

  private setGoals(match: Match, homeTeam: TeamStanding, awayTeam: TeamStanding) {
    if(match.score.fullTime.home > 0)
      homeTeam.eventDescriptions.push(` ahorrado por anotar |${match.score.fullTime.home}| contra ${awayTeam.name} el día ${formatDate(new Date(match.utcDate), 'YYYY-MM-dd', 'en-ES')}`);
    
    if(match.score.fullTime.away > 0)
      awayTeam.eventDescriptions.push(` ahorrado por anotar |${match.score.fullTime.away}| contra ${homeTeam.name} el día ${formatDate(new Date(match.utcDate), 'YYYY-MM-dd', 'en-ES')}`);

    homeTeam.goalsFor += match.score.fullTime.home;
    homeTeam.goalsAgainst += match.score.fullTime.away;
    
    awayTeam.goalsFor += match.score.fullTime.away;
    awayTeam.goalsAgainst += match.score.fullTime.home;
  }
}

interface TableStanding {
  [key: string]: TeamStanding;
}