import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backgroundImage: './../../../assets/images/background-light.jpg',
        background: {
            flex: 1,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
}

export default getStyle;
