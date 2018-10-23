import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },

        infoLine: {
            container: {
                flexDirection: 'row',
                marginVertical: 7,
            },
            label: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.textColor,
                flex: 3
            },
            value: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.textColor,
                flex: 1,
            }
        },

        goalsContainer: {
            marginTop: 30
        }
    };
}

export default getStyle;
