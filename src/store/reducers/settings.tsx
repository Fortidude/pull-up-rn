import { AnyAction } from 'redux';

import { SettingsTypes } from '../actions/settings';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';

interface SettingsState {
    theme: {};
    locale: string;
}

const initialState: SettingsState = {
    theme: DefaultTheme,
    locale: 'en'
};

function settings(state = initialState, action: AnyAction): SettingsState {
    switch (action.type) {
        case SettingsTypes.setTheme:
            if (themes[action.payload.theme]) {
                return { ...state, theme: themes[action.payload.theme] };
            }
        case SettingsTypes.setLocale:
            if (locales[action.payload.locale]) {
                I18n.locale = action.payload.locale;
                return { ...state, locale: action.payload.locale };
            }
        default:
            return state;
    }
}

export default settings;
