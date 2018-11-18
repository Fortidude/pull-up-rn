import { Dimensions } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';
import { HEADER_HEIGHT } from '../Header/Header.styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: WIDTH,
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10
        },
        fullScreenModalsContainer: {
            top: HEADER_HEIGHT,
            position: 'absolute',
            heigt: HEIGHT - HEADER_HEIGHT
        }
    };
}

export default getStyle;
