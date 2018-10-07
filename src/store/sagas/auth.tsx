import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { AuthActions, AuthTypes } from '../actions/auth';
import { StackActions, NavigationActions } from 'react-navigation';
import UserModel from 'src/models/User';
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

function* register(action: any) {
    const { email, username, password } = action.payload;
    const result = yield User.register(email, username, password);
    if (result && result === true) {
        yield put(AuthActions.registerSuccess());
    } else {
        yield put(AuthActions.registerFailed(result));
    }
}

function* logout(action: any) {
    let loggedUser: UserModel;
    yield AsyncStorage.getItem('user', (error, user) => {
        if (user) {
            loggedUser = JSON.parse(user);
        }
    });

    //@ts-ignore
    if (loggedUser) {
        yield AsyncStorage.getItem('users', (error, users) => {
            let collection: { [key: string]: UserModel } = {};
            if (users) {
                collection = JSON.parse(users);
            }

            collection[loggedUser.id] = loggedUser;
            AsyncStorage.setItem('users', JSON.stringify(collection));
        })
    }

    yield AsyncStorage.removeItem('token');
    yield AsyncStorage.removeItem('user');
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
        takeEvery(AuthTypes.register, register),
        takeEvery(AuthTypes.logout, logout)
    ]);
}

export default authSaga;
export {
    loginWithToken
}