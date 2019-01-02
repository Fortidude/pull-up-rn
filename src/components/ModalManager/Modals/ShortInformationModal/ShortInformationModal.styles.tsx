import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const size = width / 3;
const mediumSize = width * 0.6;
const bigSize = width * 0.8;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            position: 'absolute',
            height: size,
            width: size,
            top: -(size / 2),
            left: -(size / 2),
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },

        medium: {
            height: mediumSize,
            width: mediumSize,
            top: -(mediumSize / 2),
            left: -(mediumSize / 2),
        },

        big: {
            height: bigSize,
            width: bigSize,
            top: -(bigSize / 2),
            left: -(bigSize / 2),
        },
        
        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.subTextColor,
            position: 'absolute',
            top: 5,
            width: size,
            textAlign: 'center'
        },

        titleBig: {
            fontSize: theme.fonts.fontSize,
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.textColor,
            marginHorizontal: 20,
        },

        dismissButtom: {
            container: {
                position: 'absolute',
                bottom: 10,
                right: 0,
                left: 0,
                justifyContent: 'center',
                alignItems: 'center'
            },

            text: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontSize,
                color: theme.colors.main,
            }
        }
    };
}

export default getStyle;
