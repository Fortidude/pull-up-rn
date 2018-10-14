import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: 295
        },

        monthItem: {
            container: {
                width: WIDTH,
                borderColor: 'red', borderWidth: 1
            },
            text: {
                color: theme.colors.textColor
            }
        }
    };
}

export default getStyle;
