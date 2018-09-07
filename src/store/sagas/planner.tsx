import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { PlannerActions, PlannerTypes } from '../actions/planner';
import { Data } from '../../api';


function* loadByTrainings(action: any) {
    const isOnline = yield select(state => state.app.isOnline);
    if (isOnline) {
        yield put(PlannerActions.loadByTrainingsFailed('OFFLINE'));
    }

    try {
        const planner = yield Data.getPlannerByTrainings();
        yield put(PlannerActions.loadByTrainingsSuccess(planner));
    } catch (err) {
        yield put(PlannerActions.loadByTrainingsFailed(err));
    }
}

function* plannerSaga() {
    yield all([
        takeEvery(PlannerTypes.loadByTrainings, loadByTrainings),
    ]);
}

export default plannerSaga;