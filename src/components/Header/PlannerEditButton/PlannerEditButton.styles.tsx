import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
        },
        text: {
            fontSize: theme.fonts.fontSize,
            color: theme.colors.main
        }
    };
}

export default getStyle;
