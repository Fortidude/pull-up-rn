import { ThemeInterface } from 'src/assets/themes';
import { StyleSheet, Dimensions } from 'react-native';

import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            height: HEIGHT - HEADER_HEIGHT - (FOOTER_HEIGHT*2)
        }
    };
}

export default getStyle;
