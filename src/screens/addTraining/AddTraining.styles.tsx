import { StyleSheet } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.cardBackgroundColor
        },

        form: {
            container: {
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 20
            },
            label: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor,
                marginBottom: 5
            }
        },

        infoText: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
        },

        existingSections: {
            container: {
                flex: 3,
                paddingHorizontal: 20,
                paddingTop: 20
            },
            title: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor,
                marginVertical: 20,
            },
        },

        existingSectionName: {
            container: {
                padding: 5,
             //   borderBottomColor: theme.borders.borderColor,
             //   borderBottomWidth: theme.borders.borderWidth
            },
            text: {
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.subTextColor,
            }
        }
    };
}

export default getStyle;
