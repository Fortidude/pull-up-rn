import { ThemeInterface } from '../../../assets/themes';
import { Dimensions } from 'react-native';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height - HEADER_HEIGHT - 70;

function getStyle(theme: ThemeInterface) {
    return {
        container: {

            zIndex: 1,
            position: 'absolute',
            top: 70,

            width: WIDTH,
            height: HEIGHT,
            backgroundColor: theme.colors.backgroundColor,
            overflow: 'hidden'
        },

        innerContainer: {
            position: 'absolute',
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: theme.colors.backgroundColor,
        }
    };
}

export default getStyle;
