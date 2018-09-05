import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        listContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor,
            paddingRight: 18,
            paddingLeft: 22
        }
    };
}

export default getStyle;
