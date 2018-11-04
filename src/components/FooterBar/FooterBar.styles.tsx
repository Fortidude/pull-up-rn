import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

export const FOOTER_HEIGHT = 65;
const isIphoneX = DetermineDevice.isIphoneX();
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.footerBackgroundColor,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: isIphoneX ? 20 : 0
        },
        footerHeight: isIphoneX ? 85 : 65
    };
}

export default getStyle;
