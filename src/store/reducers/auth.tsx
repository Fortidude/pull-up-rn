import { AnyAction } from 'redux';

import { AuthTypes } from '../actions/auth';

interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    user: {};
}

const initialState: AuthState = {
    isLogged: false,
    isLoading: false,
    user: {}
};

function auth(state = initialState, action: AnyAction): AuthState {
    switch (action.type) {
        case AuthTypes.checkIfLogged:
            return Object.assign({}, state, { isLoading: true });
        case AuthTypes.loginWithToken:
            return Object.assign({}, state, { isLoading: true });
        case AuthTypes.loginSuccess:
            return Object.assign({}, state, { isLogged: true, isLoading: false });
        case AuthTypes.loginFailed:
            return Object.assign({}, state, { isLogged: false, isLoading: false });
        case AuthTypes.logout:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}

export default auth;
