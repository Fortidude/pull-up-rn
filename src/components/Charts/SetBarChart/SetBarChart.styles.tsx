import { ThemeInterface } from 'src/assets/themes';

export const SMALL_HEIGHT = 150;
export const BAR_SMALL_WIDTH = 30;
export const TOP_BAR_SMALL_HEIGHT = 60;
export const BOTTOM_BAR_SMALL_HEIGHT = 30;

export const BIG_HEIGHT = 250;
export const BAR_BIG_WIDTH = 50;
export const TOP_BAR_BIG_HEIGHT = 150;
export const BOTTOM_BAR_BIG_HEIGHT = 50;

function getStyle(theme: ThemeInterface, big?: boolean) {
    return {
        container: {
            backgroundColor: 'transparent',
            marginTop: 10,
            justifyContent: 'center',
            height: (big ? BIG_HEIGHT : SMALL_HEIGHT) + 6
        },

        scrollContainer: {
            marginTop: 10,
            paddingHorizontal: 10
        },

        hourText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.subTextColor,
            marginHorizontal: big ? 20 : 0,
        },

        legend: {
            container: {
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingTop: 25
            },

            textHard: {
                flex: 1,
                color: theme.colors.difficultyThree,
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH4Size,
            },

            textMedium: {
                flex: 1,
                color: theme.colors.difficultyTwo,
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH4Size,
            },

            textEasy: {
                flex: 1,
                color: theme.colors.difficultyOne,
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH4Size,
            },

            textTitle: {
                position: 'absolute',
                bottom: 15,
                left: 20,
                color: theme.colors.subTextColor,
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH5Size,
            }
        }
    };
}

export default getStyle;
