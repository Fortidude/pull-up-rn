import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
           // paddingTop: 10,
            position: 'absolute'
        },

        innerContainer: {
            flex: 1,
            backgroundColor: theme.colors.modalBackgroundColor
        }
    };
}

export default getStyle;
