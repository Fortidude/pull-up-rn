import { NavigationState, NavigationActions, NavigationAction } from 'react-navigation';

import {Navigator} from '../../router/Navigator';

//@ts-ignore
const initialNavState: NavigationState = null;

//@ts-ignore
function navigation(state = initialNavState, action): NavigationState {
    let nextState;
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
