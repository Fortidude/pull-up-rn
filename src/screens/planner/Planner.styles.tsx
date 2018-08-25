import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {flex: 1, backgroundColor: theme.colors.backgroundColor},
        footer: {height: 65, width: '100%', backgroundColor: theme.colors.greyBackgroundColor}
    };
}

export default getStyle;
