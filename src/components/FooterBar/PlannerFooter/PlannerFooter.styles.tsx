import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';
import { FOOTER_HEIGHT } from '../FooterBar.styles';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: FOOTER_HEIGHT,
            width: '100%',
            backgroundColor: theme.colors.footerBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        }
    };
}

export default getStyle;
