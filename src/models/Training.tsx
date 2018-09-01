import Goal from "./Goal";

interface Training {
    [key: string]: any
}

class Training implements Training {
    key: string;
    name: string;
    goals: Goal[] = [];

    constructor(name: string, goals: []) {
        this.key = name;
        this.name = name;
        this.goals = goals.map(goal => new Goal(goal));
    }
}

export default Training;
