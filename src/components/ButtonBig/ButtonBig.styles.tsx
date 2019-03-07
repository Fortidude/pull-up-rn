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
            borderColor: theme.colors.buttonBigBorderColor,
            flexDirection: "row",
        },
        containerWithIcon: {
            justifyContent: 'flex-start',
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
        icon: {
            color: theme.colors.buttonBigTextColor,
            fontSize: 30,
            marginLeft: '10%',
            marginRight: '10%'
        },
        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.buttonBigFontSize,
            color: theme.colors.buttonBigTextColor
        }
    };
}

export default getStyle;
