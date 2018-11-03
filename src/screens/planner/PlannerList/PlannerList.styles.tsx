import { ThemeInterface } from '../../../assets/themes';
import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        listContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor,
            paddingRight: 18,
            paddingLeft: 22
        },

        refreshingProgressBar: {
            height: theme.borders.borderWidth,
        },

        refreshingIndicator: {
            position: 'absolute',
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },

        listIsEmptyContainer: {
            height: HEIGHT / 2,
            justifyContent: 'center'
        }
    };
}

export default getStyle;
