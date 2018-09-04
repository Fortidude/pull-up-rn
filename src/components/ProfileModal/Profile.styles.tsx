import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.cardBackgroundColor,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
}

export default getStyle;
