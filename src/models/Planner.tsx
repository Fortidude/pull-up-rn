import { SetInterface } from "./Set";
import Training from "./Training";

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

    /**
     * NOT WORKING FROM REDUX, OFC
     */
    addSetToGoal = (set: SetInterface) => {
        let added = false;
        this.trainings.forEach((training: Training, key: number) => {
            if (added) {
                return;
            }

            added = training.addSetToGoal(set);
        });

        return added;
    }
}

export default Planner;
