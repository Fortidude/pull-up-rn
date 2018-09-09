import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
}

export default getStyle;
