import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { UserActions, UserTypes } from '../actions/user';
import { User } from '../../api';
import { AsyncStorage } from 'react-native';

const getUserFromState = (state) => state.user.current;

export function* loadUser(action: any) {
    try {
        const user = yield User.getUserData(false);
        yield put(UserActions.loadUserSuccess(user));
    } catch (error) {
        yield put(UserActions.loadUserFailed(error));
    }
}

function* updateUserInAsyncStorage() {
    const user = yield select(getUserFromState);
    yield AsyncStorage.setItem('user', JSON.stringify(user));
}

function* userSaga() {
    yield all([
        takeEvery(UserTypes.loadUser, loadUser),
        takeEvery(UserTypes.togglePlannerCustomModeSuccess, updateUserInAsyncStorage)
    ]);
}

export default userSaga;