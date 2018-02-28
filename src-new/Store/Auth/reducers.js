import * as Types from './types';

const INITIAL_STATE = {
    user: {},
    logged: false,
    logout: false,
    registered: false,
    loading: false,
    error: null
};

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /**
         * LOGIN
         */
        case Types.LOGIN: {
            return Object.assign({}, state, {logged: false, loading: true, user: {}, error: null});
        }
        case Types.LOGIN_SUCCESS: {
            return Object.assign({}, state, {logged: true, loading: false, user: action.payload.user, logout: false});
        }
        case Types.LOGIN_FAILED: {
            return Object.assign({}, state, {logged: false, loading: false, user: {}, error: action.payload.error});
        }


        /**
         * REGISTER
         */
        case Types.REGISTER: {
            return Object.assign({}, state, {logged: false, loading: true, registered: false, user: {}, error: null});
        }
        case Types.REGISTER_SUCCESS: {
            return Object.assign({}, state, {loading: false, registered: true});
        }
        case Types.REGISTER_FAILED: {
            return Object.assign({}, state, {loading: false, registered: false, error: action.payload.error});
        }

        /**
         * LOGOUT
         */
        case Types.LOGOUT: {
            return Object.assign({}, INITIAL_STATE, {logout: true});
        }

        /**
         * RESET ERROR
         */
        case Types.LOGIN_ERROR_RESET: {
            return Object.assign({}, state, {error: null, registered: false});
        }
    }

    return state;
};
