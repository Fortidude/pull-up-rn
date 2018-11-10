import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            borderRadius: theme.borders.modalRadius,
            height: 320,
            width: 270
        },

        content: {
            flex: 1,
            marginLeft: 16,
            marginRight: 16
        },

        textLine: {
            container: {
                flexDirection: 'row'
            },
            textLeft: {
                flex: 2,
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor
            },
            textRight: {
                flex: 1,
                textAlign: 'right',
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor
            }
        },
        form: {
            container: {
                marginTop: 15,
            },
            label: {
                fontSize: theme.fonts.fontH4Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formLabelColor,
                marginBottom: 1
            },
            dateContainer: {
                backgroundColor: theme.colors.formInputBackground,
                borderWidth: theme.borders.borderWidth,
                borderColor: theme.borders.borderColor,
                marginBottom: 15,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
                height: 29,
                justifyContent: 'center'
            },
            dateText: {
                color: theme.colors.formInputTextColor,
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily
            }
        }
    };
}

export default getStyle;
