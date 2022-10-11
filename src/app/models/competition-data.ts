export class CompetitionData {
    competition: Competition;
    matches: Array<Match> = [];
}

export class Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export class Match {
    id: number;
    utcDate: Date;
    status: string;
    matchday: Date;
    stage: string;
    group: string;
    lastUpdated: Date;
    homeTeam: MatchTeam;
    awayTeam: MatchTeam;
    score: MatchScore;
}

export class MatchTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
}

export class MatchScore {
    winner: string;
    duration: string;
    fullTime: TimeGoals;
}

export class TimeGoals {
    home: number;
    away: number;
}
