import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompetitionData } from '../../models/competition-data';
import { CompetitionTeams } from 'src/app/models/competition-teams';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  private _serviceUrl: string = '';
  private _apiToken: string = 'b45e6c4e53d1428096df92a213c52801';
  private _headers: HttpHeaders = new HttpHeaders().set('X-Auth-Token', this._apiToken);

  constructor(private http: HttpClient) { }

  getCompetitionMatches(): Promise<CompetitionData | undefined> {
    return this.http.get<CompetitionData>(`${this._serviceUrl}v4/competitions/CL/matches?season=2022`, { headers: this._headers }).toPromise();
  }

  getCompetitionTeams(): Promise<CompetitionTeams | undefined> {
    return this.http.get<CompetitionTeams>(`${this._serviceUrl}v4/competitions/CL/teams?season=2022`, { headers: this._headers }).toPromise();
  }
}
