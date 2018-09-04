import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        sampleElement: {
            backgroundColor: theme.colors.backgroundColor,
        }
    };
}

export default getStyle;
