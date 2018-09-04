import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.cardBackgroundColor
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
