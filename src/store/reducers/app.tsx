import { AnyAction } from 'redux';

import { AppTypes } from '../actions/app';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';

interface AppState {
    loaded: boolean;
    networkChecked: boolean;
    isOnline: boolean;
    plannerEditMode: boolean;
}

const initialState: AppState = {
    loaded: false,
    networkChecked: false,
    isOnline: true,
    plannerEditMode: false
};

function app(state = initialState, action: AnyAction): AppState {
    switch (action.type) {
        case AppTypes.appLoaded:
            return { ...state, loaded: true };
        case AppTypes.isOnline:
            return { ...state, isOnline: true, networkChecked: true };
        case AppTypes.isOffline:
            return { ...state, isOnline: false, networkChecked: true };
        case AppTypes.togglePlannerEdit:
            return { ...state, plannerEditMode: action.payload.edit }
        default:
            return state;
    }
}

export default app;
