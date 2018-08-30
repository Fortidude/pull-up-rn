import { ThemeInterface } from '../../assets/themes';
import DetermineDevice from './../../service/helpers/DetermineDevice';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.backgroundColor
        },
        footerHeight: DetermineDevice.isIphoneX() ? 40 : 65
    };
}

export default getStyle;
