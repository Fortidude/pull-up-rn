import LightTheme from './light.theme';
import DarkTheme from './dark.theme';
import PantoneTheme from './pantone.theme';
import { StatusBarStyle,  } from 'react-native';

export interface ThemeValueInterface {[key: string]: any}

export interface ThemeInterface {
    name: string
    statusBarStyle: StatusBarStyle;
    keyboardAppearance: "default" | "light" | "dark";
    colors: ThemeValueInterface;
    borders: ThemeValueInterface;
    fonts: ThemeValueInterface;
    dimensions: ThemeValueInterface;
}

export default DarkTheme;

export const list = ['light', 'dark', 'pantone'];

export const themes: {[key: string]: {}} = {
    light: LightTheme,
    dark: DarkTheme,
    pantone: PantoneTheme
};
