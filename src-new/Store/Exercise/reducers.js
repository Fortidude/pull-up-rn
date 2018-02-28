import * as Types from './types';
import { Exercise as ExerciseModel, ExerciseVariant as ExerciseVariantModel } from './../../Models/Exercise';

const INITIAL_STATE = {
    items: [],
    loaded: false,
    loading: false,
    created: null,
    error: null
};

export default function exerciseReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        /**
         * LOAD
         */
        case Types.LOAD_EXERCISES: {
            return Object.assign({}, state, {loading: true, error: null});
        }

        /**
         * SUCCESS
         */
        case Types.LOAD_EXERCISES_SUCCESS: {
            let items = [];
            action.payload.items.forEach((item) => {
                items.push(new ExerciseModel(item));
            });

            return Object.assign({}, state, {loading: false, loaded: true,  items: items});
        }

        /**
         * FAILED
         */
        case Types.LOAD_EXERCISES_FAILED: {
            return Object.assign({}, state, {loading: false, error: action.payload.error});
        }

        /**
         * RESET ERROR
         */
        case Types.LOAD_EXERCISES_ERROR_RESET: {
            return Object.assign({}, state, {error: null, created: null});
        }

        /**
         * CREATE EXERCISE
         */
        case Types.CREATE_EXERCISE: {
            return Object.assign({}, state, {loading: true, error: null});
        }

        case Types.CREATE_EXERCISE_SUCCESS: {
            //action.payload = {createdName: '', createdVariantName: ''}
            return Object.assign({}, INITIAL_STATE, {created: action.payload});
        }

        case Types.CREATE_EXERCISE_FAILED: {
            return Object.assign({}, state, {loading: false, error: action.payload.error});
        }
    }

    return state;
};
