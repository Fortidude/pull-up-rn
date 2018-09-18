import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        exerciseListContainer: {
            backgroundColor: theme.colors.cardBackgroundColor,
            marginBottom: 0
        }
    };
}

export default getStyle;
