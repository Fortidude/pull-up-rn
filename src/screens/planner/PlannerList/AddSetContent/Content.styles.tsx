import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        content: {
            flex: 1,
            paddingLeft: 20,
            paddingVertical: 20,
        },

        textLine: {
            container: {
                flexDirection: 'row'
            },
            textLeft: {
                flex: 2,
                fontSize: theme.fonts.fontH2Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor
            },
            textRight: {
                flex: 1,
                textAlign: 'right',
                fontSize: theme.fonts.fontH2Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor
            }
        },
        form: {
            container: {
                marginTop: 15,
                flexDirection: 'row',
            },
            label: {
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formLabelColor,
                marginBottom: 1
            },

            leftSide: {
                flex: 3,
                marginTop: 10
            },
            rightSide: {
                flex: 1,
                alignItems: 'center'
            }
        }
    };
}

export default getStyle;
