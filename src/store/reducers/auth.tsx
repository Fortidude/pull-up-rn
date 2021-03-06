import { AnyAction } from 'redux';

import { AuthTypes } from '../actions/auth';

interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    isRegistered: boolean;
    passwordReminderLinkSend: boolean;
    passwordChanged: false,

    registerError: string | null;
    passwordReminderError: string | null;
    passwordChangedError: string | null;
}

const initialState: AuthState = {
    isLogged: false,
    isLoading: false,
    isRegistered: false,
    passwordReminderLinkSend: false,
    passwordChanged: false,

    registerError: null,
    passwordReminderError: null,
    passwordChangedError: null
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

        case AuthTypes.register:
            return Object.assign({}, state, { isLoading: true, isRegistered: false, registerError: null });
        case AuthTypes.registerSuccess:
            return Object.assign({}, state, { isLoading: false, isRegistered: true });
        case AuthTypes.registerFailed:
            return Object.assign({}, state, { isLoading: false, isRegistered: false, registerError: action.payload.error });

        case AuthTypes.passwordRemind:
            return Object.assign({}, state, { isLoading: true, passwordReminderLinkSend: false });
        case AuthTypes.passwordRemindSuccess:
            return Object.assign({}, state, { isLoading: false, passwordReminderLinkSend: true });
        case AuthTypes.passwordRemindFailed:
            return Object.assign({}, state, { isLoading: false, passwordReminderLinkSend: false, passwordReminderError: action.payload.error });

        case AuthTypes.changePassword:
            return Object.assign({}, state, { isLoading: true, passwordChanged: false });
        case AuthTypes.changePasswordSuccess:
            return Object.assign({}, state, { isLoading: false, passwordChanged: true });
        case AuthTypes.changePasswordFailed:
            return Object.assign({}, state, { isLoading: false, passwordChanged: false, passwordChangedError: action.payload.error });


        case AuthTypes.logout:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}

export default auth;
