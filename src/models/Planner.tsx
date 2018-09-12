import { SetInterface, sortSetsByDate } from "./Set";
import Training from "./Training";
import Goal from "./Goal";

interface PlannerInterface {
    trainings: Training[];
}

interface DataInterface {
    [key: string]: []
}


class Planner implements PlannerInterface {
    trainings: Training[] = [];

    constructor(data: DataInterface) {
        for (let name in data) {
            this.trainings.push(new Training(name, data[name]));
        }
    }
}

export default Planner;

class PlannerMethodsClass {
    private static instance: PlannerMethodsClass;

    private constructor() { }
    static getInstance() {
        if (!PlannerMethodsClass.instance) {
            PlannerMethodsClass.instance = new PlannerMethodsClass();
        }
        return PlannerMethodsClass.instance;
    }

    addSetToGoal = (set: SetInterface, planner: PlannerInterface) => {
        let added = false;
        const goalId: string = typeof set.goal === 'string' ? set.goal : set.goal.id;
        set.goal = goalId;

        planner.trainings.forEach((training: Training, key: number) => {
            if (added) {
                return;
            }

            training.goals.forEach((goal: Goal, key: number) => {
                if (goal.id === goalId) {
                    goal.sets.push(set);
                    goal.sets.sort(sortSetsByDate);
                    added = true;
                }
            });
        });

        return added;
    }
}

const PlannerMethods = PlannerMethodsClass.getInstance();
export {
    PlannerMethods
}
