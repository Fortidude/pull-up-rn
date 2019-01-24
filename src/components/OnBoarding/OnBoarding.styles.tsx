import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: '#000000',
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
                borderColor: '#a9a9a9',
                borderWidth: theme.borders.borderWidth
            },

            dotActive: {
                backgroundColor: '#a9a9a9'
            },

            skipButton: {
                position: 'absolute',
                right: 20
            },

            skipButtonText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH3Size,
                color: '#FFF'
            }
        }
    };
}

export default getStyle;
