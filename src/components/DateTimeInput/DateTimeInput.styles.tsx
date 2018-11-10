import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            width: '100%',
        },
        dateContainer: {
            backgroundColor: theme.colors.formInputBackground,
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
            marginBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'center',
            height: 29,
            borderRadius: 5
        },
        dateText: {
            color: theme.colors.formInputTextColor,
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily
        },
        placeholderColor: theme.colors.authInputPlaceholderTextColor
    };
}

export default getStyle;
