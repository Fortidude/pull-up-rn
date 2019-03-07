import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            backgroundColor: theme.colors.plannerFabButtonBackground,
            height: 40,
            minWidth: 100,
            borderRadius: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },

        containerBorder: {
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
        },

        icon: {
            fontSize: 18,
            color: theme.colors.main
        },

        text: {
            fontSize: theme.fonts.fontSize,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.main
        },

        textDanger: {
            color: theme.colors.danger
        }
    };
}

export default getStyle;
