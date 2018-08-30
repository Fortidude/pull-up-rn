import { AnyAction } from 'redux';

import { AppTypes } from '../actions/app';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';

interface AppState {
    theme: {};
    locale: string;
}

const initialState: AppState = {
    theme: DefaultTheme,
    locale: 'en'
};

function app(state = initialState, action: AnyAction): AppState {
    switch (action.type) {
        case AppTypes.setTheme:
            if (themes[action.payload.theme]) {
                return { ...state, theme: themes[action.payload.theme] };
            }
        case AppTypes.setLocale:
            if (locales[action.payload.locale]) {
                I18n.locale = action.payload.locale;
                return { ...state, locale: action.payload.locale };
            }
        default:
            return state;
    }
}

export default app;
