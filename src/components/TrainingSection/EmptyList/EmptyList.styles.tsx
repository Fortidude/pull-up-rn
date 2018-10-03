import { ThemeInterface } from 'src/assets/themes';
import { StyleSheet, Dimensions } from 'react-native';

import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/PlannerFooter/PlannerFooter.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: 44,
            // marginBottom: 20,
            height: HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT
        }
    };
}

export default getStyle;
