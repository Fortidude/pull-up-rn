import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const isIphoneX = DetermineDevice.isIphoneX();

export const FOOTER_HEIGHT = 65;
export const FOOTER_IPHONE_X_PADDING = 20;

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.footerBackgroundColor,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: isIphoneX ? FOOTER_IPHONE_X_PADDING : 0
        },
        footerHeight: isIphoneX ? 85 : 65
    };
}

export default getStyle;
