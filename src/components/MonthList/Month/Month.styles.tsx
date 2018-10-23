import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            width: WIDTH
        }
    };
}

export default getStyle;
