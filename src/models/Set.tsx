import Goal from "./Goal";
import Circuit, { CircuitInterface } from "./Circuit";
import moment from 'moment';

interface SetInterface {
    goal: Goal|string;
    reps?: number;
    time?: number;
    weight?: number | null | undefined;
    date: Date | string;

    value?: number;
    circuit?: CircuitInterface;
}

export default class Set implements SetInterface {
    id: string;
    date: Date | string;
    createdAt: Date | string;

    goal: Goal;
    circuit: CircuitInterface;

    value: number;
    weight: number;
    
    constructor(data: any) {
        this.id = data.id;
        this.value = data.value;
        this.weight = data.weight ? data.weight : 0;
        this.goal = new Goal(data.goal);
        this.circuit = new Circuit(data.circuit);

        this.date = data.date;
        this.createdAt = data.created_at;
    } 
}

const sortSetsByDate = (setA: SetInterface, setB: SetInterface) => {
    return moment(setA.date).diff(moment(setB.date));
}

export {
    sortSetsByDate,
    SetInterface
}
