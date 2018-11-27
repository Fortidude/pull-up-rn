import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.buttonBigBackgroundColor,
            width: '90%',
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.colors.buttonBigBorderColor
        },
        containerShadow: {
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 3 }
        },
        containerLightShadow: {
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 }
        },
        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.buttonBigFontSize,
            color: theme.colors.buttonBigTextColor
        }
    };
}

export default getStyle;
