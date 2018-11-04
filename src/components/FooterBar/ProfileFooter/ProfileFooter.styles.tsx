import { ThemeInterface } from 'src/assets/themes';
import { FOOTER_HEIGHT } from '../FooterBar.styles';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: FOOTER_HEIGHT,
            width: '100%',
            backgroundColor: theme.colors.footerBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        },
        leftSide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 23
        },
        leftMainText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor
        },
        leftSubText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor,
            marginTop: 5,
            marginBottom: 5
        },
        rightSide: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 23
        },
        rightSideText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.danger
        },
        rightSideIcon: {
            fontSize: theme.fonts.fontSize + 3,
            color: theme.colors.danger,
            marginLeft: 5
        }
    };
}

export default getStyle;
