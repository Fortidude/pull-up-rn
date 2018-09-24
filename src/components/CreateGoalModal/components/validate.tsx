import { NewGoalInterface } from "../../../models/Goal";
import { Exercise, validateExercise } from "../../../models/Exercise";

const validateName = (name: string | null) => typeof name === 'string' && name.length > 2;
const validateDescription = (description: string | null) => true // not required;
const validateType = (type: string | null) => type === 'sets' || type === 'reps' || type === 'time';

export default (state: NewGoalInterface) => {
    return validateName(state.name)
        && validateDescription(state.description)
        && validateExercise(state.exercise)
        && validateType(state.type)
}

export {
    validateName,
    validateDescription,
    validateExercise,
    validateType
}
