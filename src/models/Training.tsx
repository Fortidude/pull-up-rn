import Goal from "./Goal";
import { SetInterface } from "./Set";

interface TrainingInterface {
    key: string;
    name: string;
    goals: Goal[];
}

class Training implements TrainingInterface {
    key: string;
    name: string;
    goals: Goal[] = [];

    constructor(name: string, goals: Goal[]) {
        this.key = name;
        this.name = name;
        this.goals = goals.map(goal => new Goal(goal));
    }
}

export default Training;
