import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor,
        },

        backgroundImage: {
            right: 0,
            width: width,
            height: height,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
        },

        paginator: {
            container: {
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 30,
                left: 0,
                right: 0
            },

            dot: {
                width: 6,
                height: 6,
                margin: 10,
                borderRadius: 3,
                borderColor: theme.colors.disableText,
                borderWidth: theme.borders.borderWidth
            },

            dotActive: {
                backgroundColor: theme.colors.disableText
            },

            skipButton: {
                position: 'absolute',
                right: 20
            },

            skupButtonText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH3Size,
                color: theme.colors.textColor
            }
        }
    };
}

export default getStyle;
