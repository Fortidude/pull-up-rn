import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: 44,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2
        },
        header: {
            fontSize: theme.fonts.fontSize,
            fontFamily: theme.fonts.mainFontFamily,
            fontWeight: '400',
            color: theme.colors.textColor
        }
    };
}

export default getStyle;
