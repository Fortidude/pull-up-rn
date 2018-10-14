import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

export const FOOTER_HEIGHT = 65;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor
        },
        footerHeight: DetermineDevice.isIphoneX() ? 40 : 65
    };
}

export default getStyle;
