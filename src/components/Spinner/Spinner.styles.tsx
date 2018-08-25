import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        spinner: {
            color: theme.colors.spinnerColor,
        }
    };
}

export default getStyle;
