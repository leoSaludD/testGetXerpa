import { Rule } from "./rule";

export class Goal {
    goalId: number;
    type: string;
    date: Date;
    amount: number;
    rules: Rule[];
    results: number;

    constructor(type: string, date: Date, amount: number) {
        this.type = type;
        this.date = date;
        this.amount = amount;
        this.results = 0;
        this.rules = [];
    }
}