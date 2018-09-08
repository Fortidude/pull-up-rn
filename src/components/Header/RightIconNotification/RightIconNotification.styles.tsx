import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 10,
            right: 10
        }
    };
}

export default getStyle;
