import { StyleSheet, Dimensions } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

const width = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.inputBackground,
            width: 295,
            height: 65,
            marginBottom: 10,
            borderRadius: 5,
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20
        },
        input: {
            color: theme.colors.inputTextColor,
            fontSize: theme.fonts.inputFontSize
        },
        placeholderColor: theme.colors.inputPlaceholderTextColor
    };
}

export default getStyle;
