import { AnyAction } from 'redux';
import moment from 'moment';

import { UserTypes } from '../actions/user';
import { AuthTypes } from '../actions/auth';
import User from '../../models/User';

interface UserState {
    current: User | null;
    error: any;
    onBoarding: boolean;
    expires_at: string;
}

const initialState: UserState = {
    current: null,
    error: null,
    onBoarding: true,
    expires_at: moment().hour(23).minute(59).format()
};

function user(state = initialState, action: AnyAction): UserState {
    switch (action.type) {
        case UserTypes.loadUser:
            return Object.assign({}, state, { current: null, error: null })
        case UserTypes.loadUserSuccess:
            return Object.assign({}, state, { current: action.payload.user, expires_at: action.payload.user.current_circuit_expired_date })
        case UserTypes.loadUserFailed:
            return Object.assign({}, state, { error: action.payload.error })

        case UserTypes.togglePlannerCustomModeSuccess: {
            const current = state.current;
            if (current) {
                current.planner_custom_mode = !current.planner_custom_mode;
            }
            return Object.assign({}, state, { current })
        }

        case UserTypes.changeAvatar: {
            const current = state.current;
            const { base64avatar } = action.payload;
            if (current) {
                current.avatar = base64avatar;
            }
            return Object.assign({}, state, { current });
        }

        case UserTypes.endOnBoarding:
            return { ...state, onBoarding: false }
        case UserTypes.manuallyGoToOnboarding:
            return { ...state, onBoarding: true }

        case AuthTypes.logout:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}

export default user;
