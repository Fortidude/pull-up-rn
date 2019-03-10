import { StyleSheet, Dimensions } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

const width = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            width: '100%',
            borderRadius: 5,
            justifyContent: 'center'
        },
        formContainer: {
            backgroundColor: theme.colors.formInputBackground,
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
            marginBottom: 15,
            paddingLeft: 10,
            paddingRight: 10
        },
        formContainerSmall: {
            paddingLeft: 2,
            paddingRight: 2
        },
        formInput: {
            color: theme.colors.formInputTextColor,
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            width: '80%'
        },
        authInput: {
            color: theme.colors.authInputTextColor,
            fontSize: theme.fonts.inputFontSize
        },
        placeholderColor: theme.colors.authInputPlaceholderTextColor
    };
}

export default getStyle;
