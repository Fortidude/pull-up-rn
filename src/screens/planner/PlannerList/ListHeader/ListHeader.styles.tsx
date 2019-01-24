import { ThemeInterface } from 'src/assets/themes';

export const LIST_HEADER_HEIGHT = 70;

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            height: LIST_HEADER_HEIGHT,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end'
        },

        itemContainer: {

        },

        innerContainer: {
            backgroundColor: theme.colors.plannerFilterBackground,
            flexDirection: 'row',
            height: 34,
            paddingLeft: 5,
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 17,
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.plannerFilterText,
            fontSize: theme.fonts.fontH4Size,
        },

        closeIconContainer: {
            backgroundColor: theme.colors.plannerFilterCloseIconBackground,
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            height: 24,
            width: 24,
            borderRadius: 12,
            marginRight: 5
        },

        closeIcon: {
            color: theme.colors.plannerFilterCloseIconText,
            fontSize: 20,
            marginLeft: 1,
            marginTop: 2
        }
    };
}

export default getStyle;
