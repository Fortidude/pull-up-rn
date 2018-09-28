import { ThemeInterface } from 'src/assets/themes';
import { StyleSheet } from 'react-native';

function getStyle(theme: ThemeInterface) {
    return {
        overlay: [StyleSheet.absoluteFill, {
            backgroundColor: theme.colors.modalBackgroundColorLight,
             zIndex: 5, 
             borderRadius: theme.borders.modalRadius
            }],

        container: {
            backgroundColor: theme.colors.backgroundColor,
            borderRadius: theme.borders.modalRadius,
            height: 450,
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
            switch: {
                container: { flexDirection: 'row' },
                left: { flex: 3 },
                right: { flex: 1, alignItems: 'flex-end' }
            }
        }
    };
}

export default getStyle;
