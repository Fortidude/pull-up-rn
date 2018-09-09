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

    constructor(name: string, goals: []) {
        this.key = name;
        this.name = name;
        this.goals = goals.map(goal => new Goal(goal));
    }

    /**
     * NOT WORKING WHEN DATA FROM REDUX, OFC
     */
    addSetToGoal = (set: SetInterface): boolean => {
        let added = false;
        this.goals.forEach((goal: Goal, key: number) => {
            if (goal.id === set.goal.id) {
                goal.sets.push(set);
                goal.sortSetsByDate();
                added = true;
            }
        })

        return added;
    }


}

export default Training;
