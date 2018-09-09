import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor,
            borderRadius: 15,
            height: 255,
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
                flex: 1,
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
            }
        }
    };
}

export default getStyle;
