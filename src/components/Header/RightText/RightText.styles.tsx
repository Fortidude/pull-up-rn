import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        text: {fontSize: theme.fonts.fontSize}
    };
}

export default getStyle;
