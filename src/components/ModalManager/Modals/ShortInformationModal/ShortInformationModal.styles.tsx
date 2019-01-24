import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT, FOOTER_IPHONE_X_PADDING } from 'src/components/FooterBar/FooterBar.styles';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const { width, height } = Dimensions.get('window');
const bigSize = width * 0.8;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalDarkBackgroundColor || theme.colors.modalBackgroundColor,
            borderColor: theme.borders.borderColor,
            borderWidth: theme.borders.borderWidth,
            borderRadius: 10,
            position: 'absolute',
            width: bigSize,
            left: (width - bigSize) / 2,
            bottom: FOOTER_HEIGHT + (DetermineDevice.isIphoneX() ? FOOTER_IPHONE_X_PADDING : 0) + 30,
            paddingHorizontal: 20,
            paddingVertical: 5,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center'
        },

        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.subTextColor,
            position: 'absolute',
            top: 5,
            width: '100%',
            textAlign: 'center'
        },

        titleBig: {
            fontSize: theme.fonts.fontH2Size,
            fontWeight: '500'
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.modalDarkFontColor || theme.colors.textColor,
            fontWeight: '100',
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
