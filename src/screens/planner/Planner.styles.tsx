import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.cardBackgroundColor
        },
        topCirclesContainer: {
            height: 110,
            backgroundColor: theme.colors.backgroundColor,
            flexDirection: 'row',
        },
        topCircleContainer: {
            flexBasis: '50%',
            justifyContent: 'center',
        },
        topCircleLeft: {
            left: 65
        },
        topCircleRight: {
            alignItems: 'flex-end',
            right: 65
        },
        listContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor,
            paddingBottom: 90,
            paddingRight: 18,
            paddingLeft: 22
        },

        profileModalContainer: {
            backgroundColor: theme.colors.backgroundColor,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
}

export default getStyle;
