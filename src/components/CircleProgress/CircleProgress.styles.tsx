import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        circle: {
            backgroundColor: theme.colors.cardBackgroundColor,
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10
        },
        progressBar: {
            position: 'absolute'
        },
        title: {
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
            fontWeight: '900',
            marginBottom: 3
        },
        bigTitle: {
            fontSize: theme.fonts.fontH1Size,
        },
        subTitle: {
            fontSize: theme.fonts.fontH6Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            marginBottom: 5
        }
    };
}

export default getStyle;
