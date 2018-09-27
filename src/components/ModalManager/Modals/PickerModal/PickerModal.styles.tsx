import { StyleSheet } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor,
            borderRadius: 15,
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0
        }
    };
}

export default getStyle;
