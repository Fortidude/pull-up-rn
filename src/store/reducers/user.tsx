import { AnyAction } from 'redux';

import { UserTypes } from '../actions/user';
import { AuthTypes } from '../actions/auth';
import User from '../../models/User';

interface UserState {
    current: null|User,
    error: any
}

const initialState: UserState = {
    current: null,
    error: null
};

function user(state = initialState, action: AnyAction): UserState {
    switch (action.type) {
        case UserTypes.loadUser:
            return Object.assign({}, state, {current: null, error: null})
        case UserTypes.loadUserSuccess: 
            return Object.assign({}, state, {current: action.payload.user})
        case UserTypes.loadUserFailed: 
            return Object.assign({}, state, {error: action.payload.error})
        case AuthTypes.logout:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}

export default user;