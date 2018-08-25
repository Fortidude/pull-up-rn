import { ThemeInterface } from './../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.backgroundColor
        },
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        footer: {
            bottom: 0,
            height: 65
        }
    };
}

export default getStyle;
