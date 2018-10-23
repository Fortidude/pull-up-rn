import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from '../FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from '../Header/Header.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
}

export default getStyle;
