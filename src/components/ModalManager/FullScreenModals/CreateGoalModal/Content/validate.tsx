import { NewGoalInterface } from 'src/Models/Goal';
import { validateExercise } from 'src/models/Exercise';

const validateName = (name: string | null) => typeof name === 'string' && name.length > 2;
const validateDescription = (description: string | null) => true // not required;
const validateType = (type: string | null) => {
    if (type === null) {
        return true;
    }

    type = type ? type.toLocaleLowerCase() : null;
    return (type === 'sets' || type === 'reps' || type === 'time');
};
const validateRequiredAmount = (type: string | null, requiredAmount: number | null) => {
    return type === null || (requiredAmount !== null && requiredAmount > 0);
}

export default (state: NewGoalInterface, customCreated = false) => {
    return validateName(state.name)
        && validateDescription(state.description)
        && validateExercise(state.exercise, customCreated)
        && validateType(state.type)
        && validateRequiredAmount(state.type, state.requiredAmount);
}

export {
    validateName,
    validateDescription,
    validateExercise,
    validateType
}
