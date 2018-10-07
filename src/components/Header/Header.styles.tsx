import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

export const HEADER_HEIGHT = DetermineDevice.isIphoneX() ? 80 : 64;
function getStyle(theme: ThemeInterface) {
    return {
        header: {
            flexDirection: 'row',
            height: HEADER_HEIGHT,
            backgroundColor: theme.colors.headerBackgroundColor,
            position: "relative",
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderDarkColor
        },

        left: {
            container: {
                flex: 1,
                paddingLeft: 7,
                justifyContent: 'flex-end',
            }
        },
        center: {
            container: {
                flex: 1,
                marginBottom: 13,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            text: { 
                fontSize: theme.fonts.fontSize,
                color: theme.colors.textColor
             }
        },
        right: {
            container: {
                flex: 1,
                marginRight: 10,
                marginBottom: 13,
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }
        }
    };
}

export default getStyle;
