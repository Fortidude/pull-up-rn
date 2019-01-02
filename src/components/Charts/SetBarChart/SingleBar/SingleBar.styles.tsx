import { ThemeInterface } from 'src/assets/themes';
import { TOP_BAR_SMALL_HEIGHT, BOTTOM_BAR_SMALL_HEIGHT, TOP_BAR_BIG_HEIGHT, BOTTOM_BAR_BIG_HEIGHT, BAR_SMALL_WIDTH, BAR_BIG_WIDTH } from '../SetBarChart.styles';

function getStyle(theme: ThemeInterface, big?: boolean) {
    return {
        container: {
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            height: 6 + (big ? TOP_BAR_BIG_HEIGHT + BOTTOM_BAR_BIG_HEIGHT : TOP_BAR_SMALL_HEIGHT + BOTTOM_BAR_SMALL_HEIGHT),
            borderWidth: 1,
            borderColor: 1,
            marginRight: 3
        },
        topContainer: {
            height: big ? TOP_BAR_BIG_HEIGHT : TOP_BAR_SMALL_HEIGHT,
            marginBottom: 5,
            backgroundColor: theme.colors.barChartBackground,
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.20,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3
        },
        topBar: {
            position: 'absolute',
            bottom: 0,
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderDarkColor,
            backgroundColor: theme.colors.barChartColor
        },
        topBarActive: {
            width: big ? BAR_BIG_WIDTH + 2 : BAR_SMALL_WIDTH + 2,
            marginLeft: -1,
            backgroundColor: theme.colors.barChartColorActive
        },
        topBarText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontWeight: '500',
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.inverseTextColor
        },

        difficultyLevel: {
            position: 'absolute',
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            bottom: -6,
            height: 3,
            borderRadius: 1,
            left: 0
        },

        bottomContainer: {
            marginTop: 4,
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            height: big ? BOTTOM_BAR_BIG_HEIGHT : BOTTOM_BAR_SMALL_HEIGHT,
            backgroundColor: theme.colors.barChartBackground,
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.20,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3
        },
        bottomContainerInactive: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0
        },
        bottomBar: {
            position: 'absolute',
            top: 0,
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderColor: theme.borders.borderDarkColor,
            borderWidth: theme.borders.borderWidth,
            backgroundColor: theme.colors.barChartSubColor
        },
        bottomBarText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.inverseTextColor
        },

    };
}

export default getStyle;
