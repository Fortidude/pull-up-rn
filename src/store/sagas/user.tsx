import { all, put, select, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import I18n from 'src/assets/translations';
import { UserActions, UserTypes } from '../actions/user';
import { User, Data } from '../../api';
import { AuthActions } from '../actions/auth';

const getUserFromState = (state: any) => state.user.current;

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

function* removeUser() {
    try {
        yield Data.deleteAccount();
        yield put(UserActions.removeUserSuccess());
        yield put(AuthActions.logout());
    } catch (err) {
        yield put(UserActions.removeUserFailed());
    }
}

function* userSaga() {
    yield all([
        takeEvery(UserTypes.loadUser, loadUser),
        takeEvery(UserTypes.togglePlannerCustomModeSuccess, updateUserInAsyncStorage),
        takeEvery(UserTypes.changeAvatar, updateUserInAsyncStorage),
        takeEvery(UserTypes.removeUser, removeUser),
    ]);
}

export default userSaga;