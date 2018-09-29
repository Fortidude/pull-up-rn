import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.buttonBigBackgroundColor,
            width: 295,
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        containerShadow: {
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 3}
        },
        text: {
            color: theme.colors.buttonBigTextColor,
            fontSize: theme.fonts.buttonBigFontSize
        }
    };
}

export default getStyle;
