import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        exerciseContainer: {
            backgroundColor: 'transparent',
            height: 70
        }
    };
}

export default getStyle;
