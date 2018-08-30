import { ThemeInterface } from '../../../assets/themes';
import DetermineDevice from './../../../service/helpers/DetermineDevice';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: 65,
            bottom: DetermineDevice.isIphoneX() ? 40 : 0,
            width: '100%',
            backgroundColor: theme.colors.greyBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        }
    };
}

export default getStyle;
