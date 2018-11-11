import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.statisticProgressBackgroundColor,
            flexDirection: 'row',
            width: WIDTH,
            height: 44,
        },
        leftContainer: {
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
            justifyContent: 'center',
            flexDirection: 'column',
            marginLeft: 16,
            height: 44,
            flex: 1
        },
        rightContainer: {
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 16,
            height: 44,
            flex: 1
        },
        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.textSize,
            color: theme.colors.textColor
        },
        percentContainer: {
            width: 56, height: 22, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10

        },
        percentText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.white,
            fontWeight: '500'
        },
    };
}

export default getStyle;
