import { Dimensions } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const MARGIN = 20;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height / 2;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            width: WIDTH,
            maxHeight: HEIGHT,
            marginLeft: MARGIN,
            marginRight: MARGIN,
            borderTopColor: theme.borders.borderColor,
            borderTopWidth: theme.borders.borderWidth
        },

        scrollToNowButton: {
            container: { alignItems: 'flex-end', paddingRight: 20 },
            text: {
                color: theme.colors.main,
            }
        }
    };
}

export default getStyle;
