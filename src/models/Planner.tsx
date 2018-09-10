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

const addSetToGoal = (set: SetInterface, planner: PlannerInterface) => {
    let added = false;
    planner.trainings.forEach((training: Training, key: number) => {
        if (added) {
            return;
        }

        training.goals.forEach((goal: Goal, key: number) => {
            if ((typeof set.goal === 'string' && set.goal === goal.id) || goal.id === set.goal.id) {
                goal.sets.push(set);
                goal.sets.sort(sortSetsByDate);
                added = true;
            }
        });
    });

    return added;
}

export {
    addSetToGoal
}
