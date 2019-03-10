import { ThemeInterface } from '../../../assets/themes';
import { FOOTER_IPHONE_X_PADDING } from 'src/components/FooterBar/FooterBar.styles';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const isIphoneX = DetermineDevice.isIphoneX();

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            borderTopColor: theme.borders.borderLightColor,
            borderTopWidth: theme.borders.borderWidth,
            height: isIphoneX ? 85 : 65,
            paddingBottom: isIphoneX ? FOOTER_IPHONE_X_PADDING : 0,
            width: '100%',
            flexDirection: 'row'
        },
        offlineInformationText: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.danger
        },
        leftButton: {
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            text: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
            }
        },
        betweenButtons: {
            width: theme.borders.borderWidth,
            backgroundColor: theme.borders.borderLightColor
        },
        rightButton: {
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            text: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
                fontWeight: '400',
                color: theme.colors.main
            }
        }
    };
}

export default getStyle;
