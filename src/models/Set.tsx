import Goal from "./Goal";

interface SetInterface {
    goal: Goal|string;
    reps?: number;
    time?: number;
    weight?: number | null | undefined;
    date: Date | string
}

export { SetInterface } 

const sortSetsByDate = (setA: SetInterface, setB: SetInterface) => {
    return new Date(setB.date).getTime() - new Date(setA.date).getTime();
}

export {
    sortSetsByDate
}
