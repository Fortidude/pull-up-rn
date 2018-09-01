import Training from "./Training";

interface PlannerInterface {
    [key: string]: any
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
