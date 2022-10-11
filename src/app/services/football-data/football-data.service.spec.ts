import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FootballDataService } from './football-data.service';

describe('FootballDataService', () => {
  let service: FootballDataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
