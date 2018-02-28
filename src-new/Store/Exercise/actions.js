import * as Types from './types';
import DataService from './../../Data/data';

export function loadExercises(refresh = false) {
    return (dispatch, getState) => {
        const state = getState().exercise;
        if ((!refresh && state.loaded) || state.loading) {
            return;
        }

        dispatch(_loadExercises());
        DataService.getExerciseList(false)
            .then((resp) => dispatch(_loadExercisesSuccess(resp)))
            .catch((err) => dispatch(_loadExercisesFailed(err)));
    }
}

export function createExercise(name, variant, isCardio) {
    return (dispatch) => {

        dispatch(_createExercise());
        DataService.postCreateExercise(name, variant, isCardio)
            .then((response) => {
                if (response.status === true) {
                    dispatch(_createExerciseSuccess(name, variant, isCardio));
                    dispatch(loadExercises(true));
                } else {
                    dispatch(_createExerciseFailed(response.message));
                }
            })
            .catch((err) => dispatch(_createExerciseFailed(err)));
    }
}

export function resetError() {
    return {
        type: Types.LOAD_EXERCISES_ERROR_RESET
    }
}

function _loadExercises() {
    return {
        type: Types.LOAD_EXERCISES
    };
}

function _loadExercisesSuccess(exercises) {
    return {
        type: Types.LOAD_EXERCISES_SUCCESS,
        payload: {items: exercises}
    };
}

function _loadExercisesFailed(error) {
    return {
        type: Types.LOAD_EXERCISES_FAILED,
        payload: {error: error}
    };
}

function _createExercise() {
    return {
        type: Types.CREATE_EXERCISE
    };
}

function _createExerciseSuccess(createdName, createdVariantName, isCardio) {
    return {
        type: Types.CREATE_EXERCISE_SUCCESS,
        payload: {createdName: createdName, createdVariantName: createdVariantName, isCardio: isCardio}
    };
}

function _createExerciseFailed(error) {
    return {
        type: Types.CREATE_EXERCISE_FAILED,
        payload: {error: error}
    };
}
