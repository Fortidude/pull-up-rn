import { ThemeInterface } from '../../../assets/themes';

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
            color: theme.colors.plannerFooterButtonColor,
            fontSize: theme.fonts.fontH4Size,
            marginTop: 5
        },
    };
}

export default getStyle;
