import { Exercise, ExerciseVariant } from "./Exercise";
import { SetInterface } from "./Set";

interface GoalInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    exercise: Exercise;
    lastSetValue: number
    leftThisCircuit: number;
    doneThisCircuit: number;
    name: string;
    removed: boolean;
    hidden: boolean;
    requiredAmount: number;
    requiredReps: number;
    requiredSets: number;
    requiredType: string;
    requiredWeight: number;
    sets: SetInterface[];
}

interface NewGoalApiRequestDataStructureInterface {
    name: string;
    description: string;
    exercise: string;
    exercise_variant: string | null;
    no_specified_goal: boolean;
    sets?: number;
    reps?: number;
    time?: number;
    weight?: number;
    section?: string; // actual name, not UUID
}

interface UpdatedGoalApiRequestStructureInterface {
    sets: number,
    reps: number,
    weight: number,
    time: number
}

interface NewGoalInterface {
    name: string;
    description: string | null;
    exercise: Exercise | null;
    exerciseVariant: ExerciseVariant | null;
    type: "sets" | "reps" | "time" | "weight" | null;
    requiredAmount: number | null;
}

class Goal implements GoalInterface {

    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    exercise: Exercise;
    lastSetValue: number
    lastSetAdded: Date;
    leftThisCircuit: number;
    doneThisCircuit: number;
    trainingName: string;
    name: string;
    removed: boolean;
    hidden: boolean;
    requiredAmount: number;
    requiredReps: number;
    requiredSets: number;
    requiredType: string;
    requiredWeight: number;
    sets: SetInterface[] = [];

    constructor(data: { [key: string]: any }) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.exercise = new Exercise(data.exercise, data.exercise_variant);
        this.description = data.description;
        this.doneThisCircuit = parseInt(data.done_this_circuit);
        this.leftThisCircuit = parseInt(data.left_this_circuit);
        this.lastSetAdded = data.last_set_added;
        this.lastSetValue = parseInt(data.last_set_value);
        this.trainingName = data.traning_name;
        this.name = data.name;
        this.removed = data.removed;
        this.hidden = false;
        this.requiredAmount = parseInt(data.required_amount);
        this.requiredReps = parseInt(data.required_reps);
        this.requiredSets = parseInt(data.required_sets);
        this.requiredWeight = parseInt(data.required_weight);
        this.requiredType = data.required_type;
        this.sets = [];
        if (data.sets) {
            data.sets.forEach((set: SetInterface) => {
                if (Object.keys(set).length > 0) {
                    this.sets.push(set);
                }
            })
        }
    }
}

const mapStateToGoalDataStructure = (data: any): UpdatedGoalApiRequestStructureInterface => {
    const type = data.type ? data.type.toLocaleLowerCase() : null;

    return {
        sets: type === 'sets' && data.requiredAmount ? data.requiredAmount : undefined,
        reps: type === 'reps' && data.requiredAmount ? data.requiredAmount : undefined,
        time: type === 'time' && data.requiredAmount ? data.requiredAmount : undefined,
        weight: type === 'weight' && data.requiredAmount ? data.requiredAmount : undefined
    }
}

const mapNewGoalInterfaceToApiRequestDataStructure = (data: NewGoalInterface): NewGoalApiRequestDataStructureInterface => {
    if (!data.name) {
        throw new Error(`NAME_CAN_NOT_BE_EMPTY_FOR_NEW_GOAL_API_REQUEST`);
    }

    if (!data.exercise) {
        throw new Error(`EXERCISE_CAN_NOT_BE_EMPTY_FOR_NEW_GOAL_API_REQUEST`);
    }

    const type = data.type ? data.type.toLocaleLowerCase() : null;

    return {
        name: data.name,
        description: data.description || "empty",
        exercise: data.exercise.id || data.exercise.name,
        exercise_variant: data.exerciseVariant ? data.exerciseVariant.id || data.exerciseVariant.name : null,
        no_specified_goal: type === null,
        ...mapStateToGoalDataStructure(data)
    }
}

export default Goal;
export {
    NewGoalApiRequestDataStructureInterface,
    UpdatedGoalApiRequestStructureInterface,
    NewGoalInterface,
    GoalInterface,
    mapNewGoalInterfaceToApiRequestDataStructure,
    mapStateToGoalDataStructure
}
