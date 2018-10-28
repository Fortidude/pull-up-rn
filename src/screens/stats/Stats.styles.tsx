import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.nativeBackgroundColor
        },
        
        loadingContainer: {
            height: HEIGHT / 2,
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
}

export default getStyle;
