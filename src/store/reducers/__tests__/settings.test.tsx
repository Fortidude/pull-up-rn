import settings, { initialState } from '../settings';
import { SettingsTypes } from '../../actions/settings';
import lightTheme from '../../../assets/themes';
import darkTheme from '../../../assets/themes/dark.theme';

jest.mock('react-native-i18n', () => ({
    fallbacks: false,
    translations: {}
}));

describe('settings reducer', () => {
    // @ts-ignore
    expect(settings(undefined, {})).toEqual(initialState)

    it('should set locale', () => {
        const expectedStateWithPLLocale = { ...initialState, locale: 'pl' };
        expect(settings(initialState, {
            type: SettingsTypes.setLocale,
            payload: { locale: 'pl' }
        })).toMatchObject(expectedStateWithPLLocale);
    })

    it('should set theme', () => {
        const expectedStateWithLightTheme = { ...initialState, theme: lightTheme };
        expect(settings(initialState, {
            type: SettingsTypes.setTheme,
            payload: { theme: 'light' }
        })).toMatchObject(expectedStateWithLightTheme);

        const expectedStateWithDarkTheme = { ...initialState, theme: darkTheme };
        expect(settings(initialState, {
            type: SettingsTypes.setTheme,
            payload: { theme: 'dark' }
        })).toMatchObject(expectedStateWithDarkTheme);
    })

});
