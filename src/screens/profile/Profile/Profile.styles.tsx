import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
             backgroundColor: 'white'
        }
    };
}

export default getStyle;
