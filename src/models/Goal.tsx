import { Exercise } from "./Exercise";
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
    sets: SetInterface[];

    constructor(data: { [key: string]: any }) {
        this.id = data.id;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
        this.exercise = new Exercise(data.exercise, data.exercise_variant);
        this.description = data.description;
        this.doneThisCircuit = data.done_this_circuit;
        this.leftThisCircuit = data.left_this_circuit;
        this.lastSetValue = data.last_set_value;
        this.name = data.name;
        this.requiredAmount = data.required_amount;
        this.requiredReps = data.required_reps;
        this.requiredSets = data.required_sets;
        this.requiredType = data.required_type;
        this.requiredWeight = data.required_weight;
        this.sets = [];
        data.sets.forEach(set => {
            if (Object.keys(set).length > 0) {
                this.sets.push(set);
            }
        })
    }
}

export default Goal;
