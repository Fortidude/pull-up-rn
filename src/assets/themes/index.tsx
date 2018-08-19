import DefaultTheme from './light.theme';
import DarkTheme from './dark.theme';

export interface ThemeInterface {
    name: string
    colors: {};
    borders: {};
    fonts: {};
}

export default DefaultTheme;

export const themes = {
    light: DefaultTheme,
    dark: DarkTheme
}
