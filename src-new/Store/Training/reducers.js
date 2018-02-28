import * as Types from './types';

const INITIAL_STATE = {
    time: 0,
    goal: null,
    mode: null
};

export default function trainingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /**
         * SET TIME
         */
        case Types.SET_TRAINING_CARDIO_TIME: {
            return Object.assign({}, state, {time: action.payload.time});
        }
        /**
         * RESET TIME
         */
        case Types.RESET_TRAINING_CARDIO_TIME: {
            return Object.assign({}, state, {time: 0});
        }

        /**
         * SET GOAL
         */
        case Types.SET_TRAINING_CARDIO_GOAL: {
            return Object.assign({}, state, {goal: action.payload.goal});
        }
        /**
         * RESET GOAL
         */
        case Types.RESET_TRAINING_CARDIO_GOAL: {
            return Object.assign({}, state, {goal: null});
        }

        /**
         * SET MODE
         */
        case Types.SET_TRAINING_CARDIO_MODE: {
            return Object.assign({}, state, {mode: action.payload.mode});
        }
        /**
         * RESET MODAL
         */
        case Types.RESET_TRAINING_CARDIO_MODE: {
            return Object.assign({}, state, {time: null});
        }

    }

    return state;
};
