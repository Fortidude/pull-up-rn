import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { UserActions, UserTypes } from '../actions/user';
import { User } from '../../api';

function* loadUser(action: any) {
    try {
        const user = yield User.getUserData(false);
        yield put(UserActions.loadUserSuccess(user));
    } catch (error) {
        yield put(UserActions.loadUserFailed(error));
    }
}

function* userSaga() {
    yield all([
        takeEvery(UserTypes.loadUser, loadUser)
    ]);
}

export default userSaga;