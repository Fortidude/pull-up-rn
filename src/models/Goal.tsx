import { Exercise } from "./Exercise";
import { SetInterface } from "./Set";

export interface GoalInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    exercise: Exercise;
    lastSetValue: number
    leftThisCircuit: number;
    doneThisCircuit: number;
    name: string;
    requiredAmount: number;
    requiredReps: number;
    requiredSets: number;
    requiredType: string;
    requiredWeight: number;
    sets: SetInterface[];
}

class Goal implements GoalInterface {

    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    exercise: Exercise;
    lastSetValue: number
    leftThisCircuit: number;
    doneThisCircuit: number;
    name: string;
    requiredAmount: number;
    requiredReps: number;
    requiredSets: number;
    requiredType: string;
    requiredWeight: number;
    sets: SetInterface[] = [];

    constructor(data: { [key: string]: any }) {
        this.id = data.id;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
        this.exercise = new Exercise(data.exercise, data.exercise_variant);
        this.description = data.description;
        this.doneThisCircuit = parseInt(data.done_this_circuit);
        this.leftThisCircuit = parseInt(data.left_this_circuit);
        this.lastSetValue = parseInt(data.last_set_value);
        this.name = data.name;
        this.requiredAmount = parseInt(data.required_amount);
        this.requiredReps = parseInt(data.required_reps);
        this.requiredSets = parseInt(data.required_sets);
        this.requiredWeight = parseInt(data.required_weight);
        this.requiredType = data.required_type;
        this.sets = [];
        data.sets.forEach(set => {
            if (Object.keys(set).length > 0) {
                this.sets.push(set);
            }
        })
    }
}

export default Goal;
