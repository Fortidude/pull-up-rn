import { ThemeInterface } from '../../../assets/themes';
import { Dimensions, Platform } from 'react-native';

const isIphoneX = () => {
    const { height, width } = Dimensions.get('window');
    return (Platform.OS === 'ios' && (height === 812 || width === 812));
}

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: 65,
            bottom: isIphoneX() ? 40 : 0,
            width: '100%',
            backgroundColor: theme.colors.greyBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        }
    };
}

export default getStyle;
