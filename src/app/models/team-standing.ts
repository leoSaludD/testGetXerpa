export class TeamStanding {
    name: string;
    position: number;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    eventDescriptions: string[];

    constructor(name: string) {
        this.name = name;
        this.position = 0;
        this.playedGames = 0;
        this.won = 0;
        this.draw = 0;
        this.lost = 0;
        this.points = 0;
        this.goalsFor = 0;
        this.goalsAgainst = 0;
        this.eventDescriptions = [];
    }
}