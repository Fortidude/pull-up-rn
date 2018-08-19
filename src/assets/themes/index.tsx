import DefaultTheme from './light.theme';
import DarkTheme from './dark.theme';

export interface ThemeInterface {
    name: string
    colors: {};
    borders: {};
    fonts: {};
    dimensions: {}
}

export default DefaultTheme;

export const themes = {
    light: DefaultTheme,
    dark: DarkTheme
}
