import * as Types from './types';
import UserService from './../../Data/user';
import DataService from './../../Data/data';

/**
 *
 * @param login
 * @param password
 * @returns {function(*=, *)}
 */
export function login(login, password) {
    return (dispatch) => {
        if (!login || !password) {
            dispatch(_authFailed('INCORRECT_DATA'));
        }

        dispatch(_authStart());

        UserService.login(login, password)
            .then(token => UserService.getCurrentUser()
                .then((user) => dispatch(_authSuccess(user)))
            )
            .catch(error => dispatch(_authFailed(error)));
    }
}

/**
 *
 * @param email
 * @param username
 * @param password
 * @returns {function(*)}
 */
export function register(email, username, password) {
    return (dispatch) => {
        if (!email || !username || !password) {
            dispatch(_registerFailed('INCORRECT_DATA'));
        }

        dispatch(_registerStart());

        UserService.register(email, username, password)
            .then(() => dispatch(_registerSuccess()))
            .catch(error => dispatch(_registerFailed(error)));
    }
}

/**
 *
 * @returns {function(*)}
 */
export function logout() {
    return (dispatch) => {
        UserService.logout().then(() => {
            DataService.clearCache();
            dispatch(_logoutSuccess());
        })
    }
}

/**
 *
 * @returns {function(*)}
 */
export function reloadUser() {
    return (dispatch) => {
        UserService.reloadCurrentUser()
            .then((user) => dispatch(_authSuccess(user)));
    }
}

/**
 *
 * @returns {function(*, *)}
 */
export function checkIfLogged() {
    return (dispatch, getState) => {
        let store = getState();
        if (store.auth.loading) {
            return;
        }

        dispatch(_authStart());

        UserService.isLogged()
            .then((user) => {
                if (user) {
                    dispatch(_authSuccess(user));
                    return;
                }

                dispatch(_authFailed(null));
            })
            .catch(() => dispatch(_authFailed(null)));
    }
}

export function resetError() {
    return {
        type: Types.LOGIN_ERROR_RESET
    }
}

/**
 * AUTH
 */
function _authStart() {
    return {
        type: Types.LOGIN
    }
}
function _authSuccess(user) {
    return {
        type: Types.LOGIN_SUCCESS,
        payload: {user: user}
    }
}
function _authFailed(errorMsg) {
    return {
        type: Types.LOGIN_FAILED,
        payload: {error: errorMsg}
    }
}

/**
 * REGISTER
 */
function _registerStart() {
    return {
        type: Types.REGISTER
    }
}
function _registerSuccess() {
    return {
        type: Types.REGISTER_SUCCESS
    }
}
function _registerFailed(errorMsg) {
    return {
        type: Types.REGISTER_FAILED,
        payload: {error: errorMsg}
    }
}

function _logoutSuccess() {
    return {
        type: Types.LOGOUT
    }
}
