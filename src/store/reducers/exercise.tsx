import { AnyAction } from 'redux';

import { ExerciseTypes } from '../actions/exercise';
import { Exercise } from '../../models/Exercise';
import { AuthTypes } from '../actions/auth';

interface ExerciseState {
    loaded: boolean;
    loading: boolean;
    exercises: Exercise[];
    exercisesToFilter: Exercise | null;
}

export const initialState: ExerciseState = {
    loaded: false,
    loading: false,
    exercises: [],
    exercisesToFilter: null
};

function exercise(state = initialState, action: AnyAction): ExerciseState {
    switch (action.type) {
        case ExerciseTypes.loadExercises: {
            return Object.assign({}, state);
        }
        case ExerciseTypes.loadExercisesSuccess: {
            return Object.assign({}, state, { loading: false, loaded: true, exercises: action.payload.exercises });
        }
        case ExerciseTypes.loadExercisesFailed: {
            // @TODO error handle
            return Object.assign({}, state, { loading: false });
        }
        case ExerciseTypes.startFetching: {
            return Object.assign({}, state, { loading: true })
        }
        case ExerciseTypes.selectExerciseToFilter: {
            return Object.assign({}, state, { exercisesToFilter: action.payload.exercise })
        }
        case AuthTypes.logout: {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
}

export default exercise;
