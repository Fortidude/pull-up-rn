import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';


function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            position: 'absolute',
            flexDirection: 'row'
        },

        viewContent: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            width: Dimensions.get('window').width
        }
    };
}

export default getStyle;
