import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        footerButtonActive: {
            color: theme.colors.main
        },
        footerButtonInactive: {
            color: theme.colors.plannerFooterButtonColor,
        },
        footerButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        footerButtonText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontWeight: '100',
            color: theme.colors.plannerFooterButtonColor,
            fontSize: 13,
            marginTop: 5
        },
    };
}

export default getStyle;
