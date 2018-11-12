import {all, fork} from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import plannerSaga from './planner';
import syncSaga from './sync';
import exerciseSaga from './exercise';
import settingsSaga from './settings';

function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
        fork(plannerSaga),
        fork(syncSaga),
        fork(exerciseSaga),
        fork(settingsSaga)
    ]);
}

export default rootSaga;
