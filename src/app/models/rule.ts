export class Rule {
    team: string;
    event: string;
    amount: number;

    timesActivated: number = 0;
    savedAmount: number = 0;
    eventDescriptions: string[] = [];

    constructor(team: string, event: string, amount: number) {
        this.team = team;
        this.event = event;
        this.amount = amount;
    }
}