import {all, fork} from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import plannerSaga from './planner';

function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
        fork(plannerSaga)
    ]);
}

export default rootSaga;
