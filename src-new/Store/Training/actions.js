import * as Types from './types';

/**
 *
 * @returns {{type}}
 */
export function setCardioTime(time) {
    return {
        type: Types.SET_TRAINING_CARDIO_TIME,
        payload: {time: time}
    };
}
/**
 *
 * @returns {{type}}
 */
export function resetCardioTime() {
    return {
        type: Types.RESET_TRAINING_CARDIO_TIME,
    };
}

/**
 *
 * @returns {{type}}
 */
export function setCardioGoal(goal) {
    return {
        type: Types.SET_TRAINING_CARDIO_GOAL,
        payload: {goal: goal}
    };
}
/**
 *
 * @returns {{type}}
 */
export function resetCardioGoal() {
    return {
        type: Types.RESET_TRAINING_CARDIO_GOAL,
    };
}

/**
 *
 * @returns {{type}}
 */
export function setCardioMode(mode) {
    return {
        type: Types.SET_TRAINING_CARDIO_MODE,
        payload: {mode: mode}
    };
}
/**
 *
 * @returns {{type}}
 */
export function resetCardioMode() {
    return {
        type: Types.RESET_TRAINING_CARDIO_MODE,
    };
}