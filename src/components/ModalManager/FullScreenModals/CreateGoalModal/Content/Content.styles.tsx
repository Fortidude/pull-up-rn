import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },

        buttonLine: {
            container: {
                flexDirection: 'row',
                justifyContent: 'flex-end'
            },
            switchButton: {
                flexDirection: 'row',  
                justifyContent: 'center',
                alignItems: 'center', 
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: theme.colors.borderColor,
                borderWidth: theme.borders.borderWidth,
                backgroundColor: theme.colors.formInputBackground
            },
            buttonText: {
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formInputTextColor  
            },
            buttonIcon: {
                color: theme.colors.blue,
            }
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
            switch: {
                container: { flexDirection: 'row' },
                left: { flex: 3 },
                right: { flex: 1, alignItems: 'flex-end' }
            }
        }
    };
}

export default getStyle;
