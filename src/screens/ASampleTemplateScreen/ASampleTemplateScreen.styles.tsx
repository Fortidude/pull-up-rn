import { StyleSheet } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {flex: 1, backgroundColor: theme.colors.cardBackgroundColor}
    };
}

export default getStyle;
