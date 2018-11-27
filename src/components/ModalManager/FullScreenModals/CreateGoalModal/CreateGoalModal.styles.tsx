import { ThemeInterface } from 'src/assets/themes';


function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            position: 'absolute'
        }
    };
}

export default getStyle;
