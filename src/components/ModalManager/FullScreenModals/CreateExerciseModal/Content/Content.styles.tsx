import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },

        buttonLine: {
            container: {
                flexDirection: 'row',
                justifyContent: 'flex-start'
            },
            button: {
                flexDirection: 'row',  
                justifyContent: 'center',
                alignItems: 'center', 
            },
            buttonText: {
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.main  
            },
            buttonIcon: {
                color: theme.colors.main,
                marginTop: 3,
                marginRight: -3,
                marginLeft: -3
            }
        },
    };
}

export default getStyle;
