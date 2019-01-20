import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            width: 76,
            height: 76,
            borderRadius: 38,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
        },

        transparent: {
            backgroundColor: 'transparent'
        },

        red: {
            backgroundColor: theme.colors.darkDanger,
            shadowColor: theme.colors.darkDanger,
            shadowOpacity: theme.statusBarStyle === 'light-content' ? 0.5 : 0.7,
            shadowRadius: 13,
            shadowOffset: { width: 0, height: 0 }
        },

        green: {
            backgroundColor: theme.colors.softGreen,
            shadowColor: theme.colors.softGreen,
            shadowOpacity: theme.statusBarStyle === 'light-content' ? 0.5 : 0.7,
            shadowRadius: 13,
            shadowOffset: { width: 0, height: 0 }
        },

        blue: {
            backgroundColor: theme.colors.softBlue,
            shadowColor: theme.colors.softBlue,
            shadowOpacity: theme.statusBarStyle === 'light-content' ? 0.5 : 0.7,
            shadowRadius: 13,
            shadowOffset: { width: 0, height: 0 }
        },

        innerContent: {
            width: 72,
            height: 72,
            borderRadius: 36,
            borderColor: theme.colors.nativeBackgroundColor,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.nativeBackgroundColor
        }
    };
}

export default getStyle;
