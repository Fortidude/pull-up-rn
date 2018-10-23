import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';
import { FOOTER_HEIGHT } from '../FooterBar.styles';

export const MONTH_ITEM_WIDTH = 100;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.cardBackgroundColor,

            flexDirection: 'row',
            height: FOOTER_HEIGHT,
            bottom: DetermineDevice.isIphoneX() ? 40 : 0,
            width: '100%',
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        },

        monthItem: {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                width: MONTH_ITEM_WIDTH,
                // borderWidth: 1,
                // borderColor: 'red'
            },
            yearText: {
                textAlign: 'center',
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH5Size,
                color: theme.colors.subTextColor,
                marginBottom: 2
            },
            monthYear: {
                textAlign: 'center',
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH3Size,
                color: theme.colors.textColor,
                marginTop: 2
            },
            monthYearActive: {
                color: theme.colors.main
            }
        }
    };
}

export default getStyle;
