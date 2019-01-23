import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
            fontSize: theme.fonts.fontH3Size,
        }
    };
}

export default getStyle;
