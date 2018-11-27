import { ThemeInterface } from '../../../assets/themes';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1, 
            backgroundColor: theme.colors.nativeBackgroundColor
        }
    };
}

export default getStyle;
