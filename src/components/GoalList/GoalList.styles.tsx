import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        exerciseListContainer: {
            backgroundColor: 'transparent',
            marginBottom: 20
        },
        goalListContainer: {
        }
    };
}

export default getStyle;
