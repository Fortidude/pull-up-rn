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
        }
    };
}

export default getStyle;
