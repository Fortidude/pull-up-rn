import { AnyAction } from 'redux';

import { AppTypes } from '../actions/app';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';

interface AppState {
    loaded: boolean;
}

const initialState: AppState = {
    loaded: false
};

function app(state = initialState, action: AnyAction): AppState {
    switch (action.type) {
        case AppTypes.appLoaded:
            return { ...state, loaded: true };
        default:
            return state;
    }
}

export default app;
