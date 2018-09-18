import { SetInterface, sortSetsByDate } from "./Set";
import Training from "./Training";
import Goal, { GoalInterface } from "./Goal";

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

                    console.log(this, this.recountGoal);
                    this.recountGoal(goal, set);

                    added = true;
                }
            });
        });

        return added;
    }

    recountGoal = (goal: GoalInterface, set: SetInterface) => {
        goal.doneThisCircuit = parseInt(goal.doneThisCircuit);
        goal.requiredAmount = parseInt(goal.requiredAmount);
        switch (goal.requiredType) {
            case 'sets': {
                goal.doneThisCircuit += 1;
                break;
            }
            case 'reps': {
                goal.doneThisCircuit += parseInt(set.reps);
                break;
            }
            case 'time': {
                goal.doneThisCircuit += parseInt(set.time);
                break;
            }
            case 'weight': {
                goal.doneThisCircuit += parseInt(set.weight);
                break;
            }
        }

        if (goal.requiredAmount) {
            goal.leftThisCircuit = goal.requiredAmount - goal.doneThisCircuit;
        }
    }
}

const PlannerMethods = PlannerMethodsClass.getInstance();
export {
    PlannerMethods
}
