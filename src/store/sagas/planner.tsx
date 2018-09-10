import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { PlannerActions, PlannerTypes } from '../actions/planner';
import { Data } from '../../api';
import Goal from '../../models/Goal';
import { SetInterface } from '../../models/Set';


function* loadByTrainings() {
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

function* createSet(action: any) {
    const { goal, value, extraWeight } = action.payload;
    try {
        const type = goal.requiredType === 'none' ? 'reps' : goal.requiredType;
        const data: SetInterface = {
            goal: goal.id,
            date: new Date(),
            weight: extraWeight,
            [type]: value,
        }

        const result = yield Data.postCreateSet(data);
        if (!result.status) {
            console.log(`createSet sagas, line 37`, result);
            throw 'ERROR';
        }

        yield put(PlannerActions.createSetSuccess(data));
    } catch (err) {
        yield put(PlannerActions.createSetFailed(err));
    }
}

function* plannerSaga() {
    yield all([
        takeEvery(PlannerTypes.loadByTrainings, loadByTrainings),
        takeEvery(PlannerTypes.createSet, createSet),
    ]);
}

export default plannerSaga;