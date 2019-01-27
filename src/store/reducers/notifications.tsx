import { AnyAction } from 'redux';

import { SettingsTypes, PlannerFooterCircleComponent } from '../actions/settings';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';
import { AppTypes } from '../actions/app';

interface SettingsState {
    theme: {};
    locale: string;

    plannerFooterCircleComponent: PlannerFooterCircleComponent;

    appVersion: string | null;
    buildVersion: string | null;
}

export const initialState: SettingsState = {
    theme: DefaultTheme,
    locale: 'pl',
    plannerFooterCircleComponent: 'avatar',
    appVersion: null,
    buildVersion: null
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
        case SettingsTypes.changePlannerFooterCircleComponent:
            return { ...state, plannerFooterCircleComponent: action.payload.componentName }
        case SettingsTypes.storeAppVersion:
            return { ...state, appVersion: action.payload.appVersion, buildVersion: action.payload.buildVersion }
        default:
            return state;
    }
}

export default settings;
