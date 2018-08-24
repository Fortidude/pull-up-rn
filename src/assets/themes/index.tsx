import DefaultTheme from './light.theme';
import DarkTheme from './dark.theme';

export interface ThemeInterface {
    name: string
    colors: {[key: string]: any};
    borders: {[key: string]: any};
    fonts: {[key: string]: any};
    dimensions: {[key: string]: any};
}

export default DefaultTheme;

export const themes = {
    light: DefaultTheme,
    dark: DarkTheme
}
