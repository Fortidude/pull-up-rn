import { Goal } from './Goal';

export class Planner {
    today;
    yesterday;
    two_days_ago;
    three_days_ago;
    four_days_ago;
    five_days_ago;
    six_days_ago;
    week_ago;
    circuit_ago;
    older;

    constructor(object) {
        if (typeof object === 'object') {
            Object.keys(object).forEach(key => {
                let goals = object[key];
                if (goals) {
                    this[key] = goals.map(goal => new Goal(goal));
                }
            })
        }
    }
}
