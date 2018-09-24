import { all, put, select, takeEvery } from 'redux-saga/effects';

import { ExerciseTypes, ExerciseActions } from '../actions/exercise';
import { Data } from '../../api';

function* loadExercise(action: any) {
    //@ts-ignore
    const isLoading = yield select(state => state.exercise.loading);
    if (isLoading) {
        return;
    }

    yield put(ExerciseActions.startFetching());
    try {
        const exercises = yield Data.getExerciseList();
        yield put(ExerciseActions.loadExercisesSuccess(exercises));
    } catch (err) {
        yield put(ExerciseActions.loadExercisesFailed(err.message));
    }
}

function* exerciseSaga() {
    yield all([
        takeEvery(ExerciseTypes.loadExercises, loadExercise),
    ]);
}

export default exerciseSaga;