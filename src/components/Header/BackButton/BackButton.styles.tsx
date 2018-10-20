import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          //  paddingBottom: 13
        },
        backText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor,
            marginBottom: 11
        },
        icon: {
            marginLeft: -15,
            marginRight: -15,
            color: theme.colors.textColor
        }
    };
}

export default getStyle;
