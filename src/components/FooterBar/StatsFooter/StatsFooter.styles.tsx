import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

export const FOOTER_HEIGHT = 65
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: FOOTER_HEIGHT,
            bottom: DetermineDevice.isIphoneX() ? 40 : 0,
            width: '100%',
            backgroundColor: theme.colors.greyBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        }
    };
}

export default getStyle;