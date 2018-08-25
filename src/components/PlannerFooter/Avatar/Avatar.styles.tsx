import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        footerAvatar: {
            backgroundColor: 'white',
            height: 70,
            width: 70,
            borderRadius: 35,
            bottom: 25,
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10
        }
    };
}

export default getStyle;
