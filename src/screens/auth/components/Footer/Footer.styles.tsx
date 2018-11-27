import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            flex: 1,
            width: theme.dimensions.authContentWidth,
        },

        leftContainer: {
            justifyContent: 'flex-start',
            flex: 1,
            flexDirection: 'row'
        },

        rightContainer: {
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row'
        },

        buttonContainer: {
            width: 60,
            height: 30,
            alignItems: 'center',
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 3 }
        },

        buttonText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.linkSmallFontSize,
            color: theme.colors.white,
        }
    };
}

export default getStyle;
