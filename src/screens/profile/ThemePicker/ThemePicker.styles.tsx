import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1, 
            backgroundColor: theme.colors.nativeBackgroundColor
        }
    };
}

export default getStyle;
