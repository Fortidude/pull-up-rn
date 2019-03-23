import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT, FOOTER_IPHONE_X_PADDING } from 'src/components/FooterBar/FooterBar.styles';
import DetermineDevice from 'src/service/helpers/DetermineDevice';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const { width, height } = Dimensions.get('window');
const bigSize = width * 0.8;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalDarkBackgroundColor || theme.colors.modalBackgroundColor,
            borderColor: theme.borders.informationModalBorderColor || theme.borders.borderColor,
            borderWidth: theme.borders.borderWidth,
            borderRadius: 10,
         //   position: 'absolute',
            width: bigSize,
            minHeight: 50,
            left: (width - bigSize) / 2,
            top: HEADER_HEIGHT,
            paddingHorizontal: 20,
            paddingVertical: 5,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 3 }
        },

        bigContainer: {
            height: bigSize,
            bottom: (height - bigSize) / 2
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
            color: theme.colors.informationModalFontColor || theme.colors.textColor,
            fontWeight: theme.fonts.informationModalFontWeight || '100',
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
