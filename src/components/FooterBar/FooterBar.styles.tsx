import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor
        },
        footerHeight: DetermineDevice.isIphoneX() ? 40 : 65
    };
}

export default getStyle;
