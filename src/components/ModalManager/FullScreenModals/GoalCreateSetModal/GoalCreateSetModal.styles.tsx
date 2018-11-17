import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            paddingTop: 10,
            position: 'absolute',
            borderColor: 'red',
            borderWidth: 1
        },

        innerContainer: {
            flex: 1,
            backgroundColor: theme.colors.modalBackgroundColor,
            borderColor: 'red',
            borderWidth: 1
        }
    };
}

export default getStyle;
