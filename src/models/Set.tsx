import Goal from "./Goal";

interface SetInterface {
    goal: Goal;
    reps?: number;
    time?: number;
    weight?: number | null | undefined;
    date: Date | string
}

export { SetInterface } 
