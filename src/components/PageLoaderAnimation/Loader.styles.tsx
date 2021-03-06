import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        fullScreen: {
            flex: 1,
        },
        centeredFullScreen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        maskImageStyle: {
            height: 100,
            width: 100,
        },
        fullScreenWhiteLayer: {
            backgroundColor: 'white',
        },
        containerStyle: {
            flex: 1,
            backgroundColor: theme.colors.backgroundColor
        }
    };
}

export default getStyle;
