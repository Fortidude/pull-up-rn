import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 60;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            flexDirection: 'row',
            width: WIDTH,
            height: HEIGHT,
        },
        progressBackground: {
            backgroundColor: theme.colors.statisticProgressBackgroundColor,
            position: 'absolute',
            width: WIDTH,
            left: 0,
            bottom: 0,
            top: 0
        },
        leftContainer: {
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
            justifyContent: 'center',
            flexDirection: 'column',
            marginLeft: 16,
            height: HEIGHT,
            flex: 1
        },
        rightContainer: {
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 16,
            height: HEIGHT,
            flex: 1
        },
        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.textColor
        },
        subTitle: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor
        },
        sectionName: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor
        },
        percentText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor
        },
        completed: {
            color: theme.colors.success
        }
    };
}

export default getStyle;
