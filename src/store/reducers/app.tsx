import { AnyAction } from 'redux';

import { AppTypes } from '../actions/app';
import DefaultTheme, { themes } from '../../assets/themes';

interface AppState {
    theme: {};
}

const initialState: AppState = {
    theme: DefaultTheme
};

function app(state = initialState, action: AnyAction): AppState {
    switch (action.type) {
        case AppTypes.setTheme:
            if (themes[action.payload.theme]) {
                return {...state, theme: themes[action.payload.theme]};
            }
        default:
            return state;
    }
}

export default app;
