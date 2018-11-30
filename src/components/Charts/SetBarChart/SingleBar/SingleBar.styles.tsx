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
            marginBottom: 3,
            backgroundColor: 'white',
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.20,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3
        },
        topBar: {
            position: 'absolute',
            bottom: 0,
            width: big ? BAR_BIG_WIDTH - 2 : BAR_SMALL_WIDTH - 2,
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderDarkColor,
            backgroundColor: theme.colors.barChartBackground
        },
        topBarActive: {
            width: big ? BAR_BIG_WIDTH + 2 : BAR_SMALL_WIDTH + 2,
            marginLeft: -2,
            backgroundColor: theme.colors.barChartBackgroundActive
        },
        topBarText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontWeight: '500',
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.inverseTextColor
        },

        bottomContainer: {
            marginTop: 3,
            width: big ? BAR_BIG_WIDTH : BAR_SMALL_WIDTH,
            height: big ? BOTTOM_BAR_BIG_HEIGHT : BOTTOM_BAR_SMALL_HEIGHT,
            backgroundColor: 'white',
            shadowColor: theme.colors.shadowColor,
            shadowOpacity: 0.20,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3
        },
        bottomContainerInactive: {
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderDarkColor,
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
            backgroundColor: theme.colors.barChartSubBackground
        },
        bottomBarText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.inverseTextColor
        },

    };
}

export default getStyle;
