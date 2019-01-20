import { ThemeInterface, list } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.nativeBackgroundColor
        },

        timer: {
            container: {
                flexDirection: 'row',
                flex: 2
            },

            text: {
                flex: 1,
                // fontFamily: theme.fonts.mainFontFamily,
                fontSize: width / 3,
                color: theme.colors.textColor
            },

            colon: {
                width: 25,
                textAlign: 'center',
                // fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.textColor,
                fontSize: width / 3.5
            },

            pause: {
                position: 'absolute',
                bottom: 10,
                left: 40,
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH3Text,
                color: theme.colors.textColor
            }
        },

        buttonsContainer: {
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },

        list: {
            container: {
                flex: 3
            },

            pauseText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.disableText
            },

            roundContainer: {
                flexDirection: 'row',
                justifyContent: 'space-around'
            },

            roundText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.textColor
            },

            resetContainer: {
                marginTop: 20
            },

            resetText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.danger
            }
        }
    };
}

export default getStyle;
