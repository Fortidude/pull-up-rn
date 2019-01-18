import { ThemeInterface } from 'src/assets/themes';

const width = 375;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            position: 'absolute',
            height: width,
            width: width * 0.75,
            borderRadius: 15,
            flexDirection: 'column',
            alignItems: 'center'
        },

        textContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },

        text: {
            fontFamily: theme.fonts.montserratFontFamily,
            fontSize: theme.fonts.fontH1Size * 2,
            color: theme.colors.textColor,
            marginRight: 2
        },
    };
}

export default getStyle;
