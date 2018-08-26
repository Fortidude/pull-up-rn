import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { AuthActions, AuthTypes } from '../actions/auth';
import { StackActions, NavigationActions } from 'react-navigation';
import { User } from '../../api';
import { UserActions } from '../actions/user';


function* checkIfLogged(action: any) {
    const isLoggedAndValid = yield User.isUserLoggedAndTokenValid();
    if (isLoggedAndValid) {
        yield put(AuthActions.loginSuccess());
    } else {
        yield put(AuthActions.logout());
    }
}

function* loginWithToken(action: any) {
    const token = action.payload.token;

    yield AsyncStorage.setItem('token', token);
    yield put(AuthActions.checkIfLogged());
}

function* loginSuccess(action: any) {
    yield put(UserActions.loadUser());
    yield put(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Planner' })],
        key: null
    }));
}

function* logout(action: any) {
    yield AsyncStorage.removeItem('token');
    yield put(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
        key: null
    }));
}

function* authSaga() {
    yield all([
        takeEvery(AuthTypes.checkIfLogged, checkIfLogged),
        takeEvery(AuthTypes.loginWithToken, loginWithToken),
        takeEvery(AuthTypes.loginSuccess, loginSuccess),
        takeEvery(AuthTypes.logout, logout)
    ]);
}

export default authSaga;