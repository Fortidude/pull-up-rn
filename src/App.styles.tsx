import { StyleSheet } from 'react-native';
import { ThemeInterface } from './assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor,
        }
    };
}

export default getStyle;
