import { StyleSheet, Dimensions } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

const width = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.buttonBigBackgroundColor,
            width: 295,
            height: 50,
            borderRadius: 5,
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 3},
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: theme.colors.buttonBigTextColor,
            fontSize: theme.fonts.buttonBigFontSize
        }
    };
}

export default getStyle;
