import Goal from "./Goal";
import Circuit, { CircuitInterface } from "./Circuit";
import moment from 'moment';

interface SetInterface {
    goal: Goal|string;
    reps?: number;
    time?: number;
    weight?: number | null | undefined;
    date: Date | string;

    difficulty_level?: number;

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
    difficultyLevel: number;
    
    constructor(data: any) {
        this.id = data.id;
        this.value = data.value;
        this.weight = data.weight ? data.weight : 0;
        this.difficultyLevel = data.difficultyLevel ? data.difficultyLevel : data.difficulty_level ? data.difficulty_level : 0;
        this.goal = new Goal(data.goal);
        this.circuit = new Circuit(data.circuit);

        this.date = data.date;
        this.createdAt = data.created_at;
    } 
}

const sortSetsByDate = (setA: SetInterface, setB: SetInterface) => {
    const a = moment(setA.date);
    const b = moment(setB.date);

    const diff = b.diff(a);
    return diff !== 0 ? diff : 1;
}

export {
    sortSetsByDate,
    SetInterface
}
