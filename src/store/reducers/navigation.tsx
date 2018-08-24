import { NavigationState, NavigationActions, NavigationAction } from 'react-navigation';

import {Navigator} from '../../router/Navigator';

const initialNavState: NavigationState = null;

function navigation(state = initialNavState, action): NavigationState {
    let nextState;
    console.log(action);
    switch (action.type) {
        case NavigationActions.NAVIGATE:
            nextState = Navigator.router.getStateForAction(action, state);
            break;
        default:
            nextState = Navigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}

export default navigation;
