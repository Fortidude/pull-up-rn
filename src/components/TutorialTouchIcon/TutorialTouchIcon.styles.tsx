import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            position: 'absolute'
        },

        ring: {
            position: 'absolute',
            top: -5,
            left: 4,
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 20
        }
    };
}

export default getStyle;
