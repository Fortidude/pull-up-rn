import { ThemeInterface } from '../../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        text: {
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor
        }
    };
}

export default getStyle;
