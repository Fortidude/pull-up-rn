import { ThemeInterface } from 'src/assets/themes';

export const TOP_BAR_SMALL_HEIGHT = 60;
export const BOTTOM_BAR_SMALL_HEIGHT = 30;

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            marginTop: 10,
            justifyContent: 'center'
        },

        scrollContainer: {
            marginTop: 10,
            paddingLeft: 10
        },

        hourText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor
        },
    };
}

export default getStyle;
