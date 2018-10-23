import { ThemeInterface } from 'src/assets/themes';
import { TOP_BAR_SMALL_HEIGHT, BOTTOM_BAR_SMALL_HEIGHT } from '../SetBarChart.styles';

function getStyle(theme: ThemeInterface) {
    return {
        barBig: {
            container: {
                width: 30,
                marginRight: 3
            },
            topContainer: {
                marginBottom: 3
            },

            bottomContainer: {
                marginTop: 3
            }
        },

        barSmall: {
            container: {
                width: 30,
                height: 144,
                borderWidth: 1,
                borderColor: 1,
                marginRight: 3
            },
            topContainer: {
                marginBottom: 3,
                height: TOP_BAR_SMALL_HEIGHT,
                width: 30,
                backgroundColor: 'white',
                shadowColor: theme.colors.shadowColor,
                shadowOpacity: 0.20,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 3
            },
            topBar: {
                position: 'absolute',
                bottom: 0,
                width: 30,
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderWidth: theme.borders.borderWidth,
                borderColor: theme.borders.borderDarkColor,
                backgroundColor: theme.colors.barChartBackground
            },
            topBarActive: {
                width: 32,
                marginLeft: -1,
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
                height: BOTTOM_BAR_SMALL_HEIGHT,
                width: 30,
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
                width: 30,
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
        }
    };
}

export default getStyle;
