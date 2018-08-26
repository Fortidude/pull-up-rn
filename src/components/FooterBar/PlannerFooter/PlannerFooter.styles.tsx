import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: 65,
            bottom: 0,
            width: '100%',
            backgroundColor: theme.colors.greyBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        }
    };
}

export default getStyle;
