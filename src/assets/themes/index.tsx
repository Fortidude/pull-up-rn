import DefaultTheme from './light.theme';
import DarkTheme from './dark.theme';

export interface ThemeValueInterface {[key: string]: any}

export interface ThemeInterface {
    name: string
    colors: ThemeValueInterface;
    borders: ThemeValueInterface;
    fonts: ThemeValueInterface;
    dimensions: ThemeValueInterface;
}

export default DefaultTheme;

export const list = ['light', 'dark'];

export const themes = {
    light: DefaultTheme,
    dark: DarkTheme
};
